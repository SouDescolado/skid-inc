import { store } from '../store';
import { Script } from './script';

export class Game {
  private store = store;
  private script: Script;

  constructor() {
    this.script = new Script();
  }

  /** Called by the main loop */
  public update(times: number): void {
    this.script.update(times);
  }
}
