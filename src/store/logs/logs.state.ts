export interface LogsState {
  /** List of commands output */
  logs: string[];
}

export const state: LogsState = {
  logs: [],
};
