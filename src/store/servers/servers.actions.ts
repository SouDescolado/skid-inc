import { ActionContext } from 'vuex';

import * as Models from '../../models';
import * as Utils from '../../utils';

import { State as RootState } from '../state';
import { ServersState } from './servers.state';

type ServerContext = ActionContext<ServersState, RootState>;

export const actions = {};
