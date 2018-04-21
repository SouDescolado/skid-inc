<template>
  <div id="panel">
    <tabs>
      <tab name="Scripts" prefix="<i class='fa fa-microchip'></i>">
        <panel-scripts></panel-scripts>
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

@Component({
  components: { PanelStats, PanelScripts },
})
export default class Panel extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss"></style>
