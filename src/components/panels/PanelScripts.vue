<template>
  <div id="panel-scripts">
    <div class="panel-scripts-container" v-for="script in scripts">
      <div class="panel-scripts-names">
        <p>{{script.name}}</p>
        <p>Level</p>
        <p>Autoscript</p>
      </div>

      <div class="panel-scripts-values">
        <p>{{script.progression}}s</p>
        <p>{{script.level}}</p>
        <p v-if="script.autoscript">unlocked</p>
        <p v-else>locked</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import * as Models from '../../models';

@Component({})
export default class Panel extends Vue {
  constructor() {
    super();
  }

  get scripts(): Models.Script[] {
    return this.$store.getters.getScripts;
  }
}
</script>

<style lang="scss"></style>
