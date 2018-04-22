<template>
  <div id="panel-scripts">
    <div class="panel-scripts-container" v-for="(script, index) in scripts">
      <div class="panel-scripts-names">
        <p><b>{{script.name}}</b></p>
        <p>Level</p>
        <p>Autoscript</p>
      </div>

      <div class="panel-scripts-values">
        <p>{{script.progression}}s</p>
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
}
</script>

<style lang="scss"></style>
