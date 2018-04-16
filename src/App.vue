<template>
  <div id="app">
    <div class="terminal">
      <div class="terminal-grid">
        <logs></logs>
        <tabs></tabs>
      </div>

      <div class="terminal-input">
        <type></type>
      </div>

      <div class="terminal-logo"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Logs from './components/Logs.vue';
import Tabs from './components/Tabs.vue';
import Type from './components/Type.vue';

@Component({
  components: { Logs, Tabs, Type },
})
export default class App extends Vue {
  /** 1000/fps */
  private interval: number;
  /** Last loop execution time, in ms */
  private before: number;
  /** Current loop time, in ms */
  private now: number;
  /** Frames-per-seconds, used in the interval */
  private fps: number;
  /** Core `loop` function reference */
  private loop: number;

  constructor() {
    super();

    this.before = new Date().getTime();
    this.now = new Date().getTime();

    this.fps = 30;
    this.interval = 1000 / this.fps;
  }

  /** On game mounted, start the core-game loop */
  public mounted(): void {
    this.interval = window.setInterval(() => this.loop(), this.interval);
  }

  /** Core game loop */
  public loop(): void {
    this.now = new Date().getTime();

    const elapsed = this.now - this.before;
    const times = Math.floor(elapsed / this.interval);

    (elapsed > this.interval) ? this.update(times) : this.update(1);

    this.before = new Date().getTime();
  }

  /** Update called by the loop */
  public update(times: number): void {
    return;
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,500,700');
@import '~modern-normalize/modern-normalize.css';

@import './styles/_variables.scss';

.terminal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-family: 'IBM Plex Mono', 'Menlo', 'Consolas', 'Ubuntu Mono', monospace;
  color: #f1f1f1;
  background-color: #3b3e44;

  .terminal-logo {
    z-index: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(./assets/logo.png) center center no-repeat;
    opacity: .075;
  }

  .terminal-grid {
    z-index: 1;
    display: flex;
    height: calc(100% - #{$input-height});
    width: 100%;
  }

  .terminal-input {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 55px;
    width: 100%;
  }
}
</style>
