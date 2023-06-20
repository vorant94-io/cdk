export class SpinUpFailed extends Error {
  constructor(message: string) {
    super(`[Spin up failed]: ${message}`);
  }
}
