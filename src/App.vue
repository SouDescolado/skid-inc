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
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,500,700');
@import '~modern-normalize/modern-normalize.css';

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
  }

  .terminal-input {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
