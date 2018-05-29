<template>
  <div id="panel">
    <tabs>
      <tab name="Scripts" prefix="<i class='fa fa-microchip'></i>">
        <panel-scripts></panel-scripts>
      </tab>

      <tab name="Servers" prefix="<i class='fa fa-server'></i>">
        <panel-servers></panel-servers>
      </tab>

      <tab name="Stats" prefix="<i class='fa fa-bar-chart'></i>">
        <panel-stats></panel-stats>
      </tab>

      <tab name="Options" prefix="<i class='fa fa-cog'></i>"></tab>
    </tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import PanelStats from './panels/PanelStats.vue';
import PanelScripts from './panels/PanelScripts.vue';
import PanelServers from './panels/PanelServers.vue';

@Component({
  components: { PanelStats, PanelScripts, PanelServers },
})
export default class Panel extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import '../styles/variables.scss';

#panel {
  z-index: 1;
  width: $tabs-width;
  padding: 16px 8px;

  .panel-container {
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    .panel-names {
      text-align: left;
    }

    .panel-values {
      text-align: right;
      font-weight: 500;
    }

    p {
      margin: 0 0 6px;
      line-height: 1.35;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
