import { store } from '../store';
import * as Models from '../models';

export class Script {
  private store = store;

  get scripts(): Models.Script[] {
    return this.store.state.scripts.scripts;
  }

  public update(times: number): void {
    /** Get only active scripts */
    const scripts = this.scripts.filter((script) => script.triggered && script.level && !script.autoscript);

    scripts.forEach((script) => {
      script.progression += times / 30;

      if (script.progression >= script.time) {
        this.store.dispatch('SCRIPT_EXECUTED', script.name);
      }
    });
  }
}
