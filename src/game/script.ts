import { store } from '../store';
import * as Models from '../models';

export class Script {
  private store = store;

  get scripts(): Models.Script[] {
    return this.store.state.scripts.scripts;
  }

  public update(times: number): void {
    const scripts = this.scripts.filter((script) => script.triggered && script.level && !script.autoscript);

    scripts.forEach((script) => {
      script.progression += times / 30;

      if (script.progression >= script.time) {
        script.executed += 1;
        script.progression = 0;
        script.triggered = false;
      }
    });
  }
}
