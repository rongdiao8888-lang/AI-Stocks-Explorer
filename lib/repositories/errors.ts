export class RepositoryError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = "RepositoryError";
  }
}

export function throwOnRepositoryError(error: { code?: string; message: string } | null, message: string) {
  if (error) {
    throw new RepositoryError(message, error.code);
  }
}
