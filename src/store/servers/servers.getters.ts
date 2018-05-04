import { ActionContext } from 'vuex';

import { State } from '../state';
import { ServersState } from './servers.state';

import * as Models from '../../models';

type ServersContext = ActionContext<ServersState, State>;

export const getters = {};
