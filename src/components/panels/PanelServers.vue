<template>
  <div id="panel-servers">
    <div class="panel-servers-container" v-for="(server, index) in servers">
      <div class="panel-servers-stats">
        <div class="panel-servers-names">
          <p><b>{{server.name}}</b></p>
          <p>Next upgrade</p>
        </div>

        <div class="panel-servers-values">
          <p>lvl. {{server.level}}</p>
          <p>$0.00</p>
        </div>
      </div>

      <div class="panel-servers-effects">
        <p><i class="fa fa-clock-o"></i> x0.05</p>
        <p><i class="fa fa-money"></i> x0.03</p>
        <p><i class="fa fa-flask"></i> x0.075</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import * as Models from '../../models';
import * as Utils from '../../utils';

@Component({})
export default class Panel extends Vue {
  constructor() {
    super();
  }

  get servers(): Models.Server[] {
    return this.$store.getters.getServers;
  }
}
</script>

<style lang="scss"></style>
