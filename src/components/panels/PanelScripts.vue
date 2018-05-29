<template>
  <div id="panel-scripts">
    <div class="panel-container" v-for="(script, index) in scripts">
      <div class="panel-names">
        <p><b>{{script.name}}</b></p>
        <p>Level</p>
        <p>Autoscript</p>
      </div>

      <div class="panel-values">
        <p>{{scriptTime(index)}}</p>
        <p v-if="script.level">{{script.level}}</p>
        <p v-else>cost ${{scriptPrice(index)}}</p>
        <p v-if="script.autoscript">unlocked</p>
        <p v-else>cost ${{autoscriptPrice(index)}}</p>
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

  get scripts(): Models.Script[] {
    return this.$store.getters.getScripts;
  }

  /** Return a nicely formatted script-price string */
  public scriptPrice(i: number): string {
    return Utils.format(this.scripts[i].price);
  }

  /** Return a nicely formatted autoscript-price string */
  public autoscriptPrice(i: number): string {
    return Utils.format(this.scripts[i].autoscriptPrice);
  }

  /** Return a nicely formatted script-time string */
  public scriptTime(i: number): string {
    return `${Utils.format(this.scripts[i].progression)}s`;
  }
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';
</style>
