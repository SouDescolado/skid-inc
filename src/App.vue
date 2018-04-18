<template>
  <div id="app">
    <div class="terminal">
      <div class="terminal-grid">
        <logs></logs>
        <panel></panel>
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
import Panel from './components/Panel.vue';
import Type from './components/Type.vue';

@Component({
  components: { Logs, Panel, Type },
})
export default class App extends Vue {
  /** The interval between execution times of the core-loop `1000 / fps` */
  private interval: number;
  /** Frames-per-seconds, used in the interval */
  private fps: number;
  /** Core-loop interval reference */
  private loopRef: number;
  /** Last loop execution time, in ms */
  private before: number;
  /** Current loop time, in ms */
  private now: number;

  constructor() {
    super();

    this.before = new Date().getTime();
    this.now = new Date().getTime();

    this.fps = 30;
    this.interval = 1000 / this.fps;
    this.loopRef = 0;
  }

  /** On game mounted, start the core-game loop */
  public mounted(): void {
    this.loopRef = window.setInterval(() => this.loop(), this.interval);
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

@import './styles/skid-inc.scss';
</style>
