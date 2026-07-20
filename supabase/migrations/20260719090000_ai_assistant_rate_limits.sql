create table public.ai_assistant_rate_limits (
  rate_limit_key text primary key check (char_length(rate_limit_key) between 1 and 128),
  request_count integer not null check (request_count >= 0),
  window_started_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index ai_assistant_rate_limits_updated_at_idx
  on public.ai_assistant_rate_limits (updated_at);

create trigger ai_assistant_rate_limits_set_updated_at
before update on public.ai_assistant_rate_limits
for each row execute function public.set_updated_at();

alter table public.ai_assistant_rate_limits enable row level security;

revoke all on public.ai_assistant_rate_limits from anon, authenticated;
grant all on public.ai_assistant_rate_limits to service_role;

create or replace function public.consume_ai_assistant_rate_limit(
  p_rate_limit_key text,
  p_maximum_requests integer,
  p_window_seconds integer
)
returns table (
  allowed boolean,
  retry_after_seconds integer
)
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  existing_request_count integer;
  existing_window_started_at timestamptz;
  request_time timestamptz := now();
  window_ends_at timestamptz;
begin
  if p_rate_limit_key is null or char_length(p_rate_limit_key) not between 1 and 128 then
    raise exception 'Rate limit key must contain between 1 and 128 characters.';
  end if;

  if p_maximum_requests not between 1 and 100 then
    raise exception 'Maximum requests must be between 1 and 100.';
  end if;

  if p_window_seconds not between 1 and 86400 then
    raise exception 'Rate limit window must be between 1 second and 24 hours.';
  end if;

  delete from public.ai_assistant_rate_limits
  where updated_at < request_time - interval '1 day';

  perform pg_advisory_xact_lock(hashtextextended(p_rate_limit_key, 0));

  select request_count, window_started_at
  into existing_request_count, existing_window_started_at
  from public.ai_assistant_rate_limits
  where rate_limit_key = p_rate_limit_key
  for update;

  if not found then
    insert into public.ai_assistant_rate_limits (rate_limit_key, request_count, window_started_at)
    values (p_rate_limit_key, 1, request_time);

    return query select true, 0;
    return;
  end if;

  window_ends_at := existing_window_started_at + make_interval(secs => p_window_seconds);

  if window_ends_at <= request_time then
    update public.ai_assistant_rate_limits
    set request_count = 1,
        window_started_at = request_time
    where rate_limit_key = p_rate_limit_key;

    return query select true, 0;
    return;
  end if;

  if existing_request_count >= p_maximum_requests then
    return query select false, greatest(1, ceil(extract(epoch from window_ends_at - request_time))::integer);
    return;
  end if;

  update public.ai_assistant_rate_limits
  set request_count = existing_request_count + 1
  where rate_limit_key = p_rate_limit_key;

  return query select true, 0;
end;
$$;

revoke all on function public.consume_ai_assistant_rate_limit(text, integer, integer) from public;
grant execute on function public.consume_ai_assistant_rate_limit(text, integer, integer) to service_role;
