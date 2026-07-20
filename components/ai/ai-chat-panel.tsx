"use client";

import { FormEvent, useRef, useState } from "react";
import { SendHorizontal } from "lucide-react";

type AssistantConversation = {
  answer: string;
  question: string;
};

type AIChatPanelProps = {
  companyName: string;
  ticker: string;
};

function getSuggestedQuestions(companyName: string) {
  return [
    `What is ${companyName}'s role in the AI value chain?`,
    "What facts support its AI ecosystem position?",
    "What does the current company research cover?",
  ];
}

async function getErrorMessage(response: Response) {
  const payload = await response.json().catch(() => null) as { error?: { message?: string } } | null;

  return payload?.error?.message ?? "The research assistant could not answer right now. Please try again.";
}

export function AIChatPanel({ companyName, ticker }: AIChatPanelProps) {
  const [conversation, setConversation] = useState<AssistantConversation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [streamedAnswer, setStreamedAnswer] = useState("");
  const [streamedQuestion, setStreamedQuestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggestedQuestions = getSuggestedQuestions(companyName);

  function chooseSuggestedQuestion(value: string) {
    setError(null);
    setQuestion(value);
    inputRef.current?.focus();
  }

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedQuestion = question.trim();

    if (!submittedQuestion || isLoading) {
      return;
    }

    setError(null);
    setIsLoading(true);
    setStreamedAnswer("");
    setStreamedQuestion(submittedQuestion);

    try {
      const response = await fetch("/api/ai/chat", {
        body: JSON.stringify({ question: submittedQuestion, ticker }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(await getErrorMessage(response));
      }

      if (!response.body) {
        throw new Error("The assistant did not return a response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const nextText = decoder.decode(value, { stream: true });
        answer += nextText;
        setStreamedAnswer((current) => current + nextText);
      }

      const completedAnswer = answer.trim();

      if (!completedAnswer) {
        throw new Error("The assistant did not return a response.");
      }

      setConversation((current) => [{ answer: completedAnswer, question: submittedQuestion }, ...current].slice(0, 3));
      setQuestion("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The research assistant could not answer right now. Please try again.");
      setQuestion(submittedQuestion);
    } finally {
      setIsLoading(false);
      setStreamedAnswer("");
      setStreamedQuestion(null);
    }
  }

  return (
    <section className="border-b border-line bg-surface-tint px-5 py-8 sm:px-6" aria-labelledby="research-assistant-heading">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-accent-strong" id="research-assistant-heading">GPT research assistant</p>
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-teal">Company-scoped</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {suggestedQuestions.map((suggestedQuestion) => (
          <button
            className="border border-line bg-surface px-3 py-2 text-left text-sm leading-5 text-ink-muted transition-colors hover:border-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            key={suggestedQuestion}
            onClick={() => chooseSuggestedQuestion(suggestedQuestion)}
            type="button"
          >
            {suggestedQuestion}
          </button>
        ))}
      </div>

      <form className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_2.75rem] sm:items-end" onSubmit={askQuestion}>
        <div>
          <label className="sr-only" htmlFor={`assistant-question-${ticker}`}>Ask a company research question</label>
          <textarea
            aria-describedby={error ? `assistant-error-${ticker}` : undefined}
            className="block min-h-24 w-full resize-y border border-line bg-surface px-3 py-3 text-sm leading-6 text-ink outline-none placeholder:text-ink-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
            disabled={isLoading}
            id={`assistant-question-${ticker}`}
            maxLength={600}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={`Ask about ${companyName}`}
            ref={inputRef}
            rows={3}
            value={question}
          />
        </div>
        <button
          aria-label="Ask research assistant"
          className="inline-flex h-11 w-11 items-center justify-center border border-accent bg-accent text-white transition-colors hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading || question.trim().length < 3}
          title="Ask research assistant"
          type="submit"
        >
          <SendHorizontal aria-hidden="true" size={18} />
        </button>
      </form>

      {error ? <p className="mt-3 text-sm leading-6 text-amber" id={`assistant-error-${ticker}`} role="alert">{error}</p> : null}

      {streamedQuestion ? (
        <div className="mt-6 border-t border-line pt-5" aria-live="polite">
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Question</p>
          <p className="mt-2 text-sm leading-6 text-ink">{streamedQuestion}</p>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink-muted">{streamedAnswer || "Researching the approved company context..."}</p>
        </div>
      ) : null}

      {conversation.length > 0 ? (
        <div className="mt-6 divide-y divide-line border-y border-line">
          {conversation.map((item) => (
            <article className="py-5" key={`${item.question}-${item.answer}`}>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Question</p>
              <p className="mt-2 text-sm leading-6 text-ink">{item.question}</p>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      ) : null}

      <p className="mt-4 text-sm leading-6 text-ink-muted">Research information, not personalized investment advice.</p>
    </section>
  );
}
