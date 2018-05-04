import * as Models from '../../models';

export interface ServersState {
  /** List of servers */
  servers: Models.Server[];
}

export const state: ServersState = {
  servers: [],
};
