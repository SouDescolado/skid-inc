<template>
  <div id="panel-stats">
    <div class="panel-container">
      <div class="panel-names">
        <p>Level</p>
        <p>Experience</p>
        <p>Money</p>
      </div>

      <div class="panel-values">
        <p>{{level}}</p>
        <p>{{exp}}/{{expReq}}</p>
        <p>${{money}}</p>
      </div>
    </div>

    <div class="panel-container">
      <div class="panel-names">
        <p>Money mult.</p>
        <p>Exp. mult.</p>
        <p>Time mult.</p>
      </div>

      <div class="panel-values">
        <p>x{{moneyMultiplier}}</p>
        <p>x{{expMultiplier}}</p>
        <p>/{{timeMultiplier}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import * as Utils from '../../utils';

@Component({})
export default class Panel extends Vue {
  constructor() {
    super();
  }

  get money(): number {
    return this.$store.getters.getMoney;
  }

  get totalMoney(): number {
    return this.$store.getters.getTotalMoney;
  }

  get level(): number {
    return this.$store.getters.getLevel;
  }

  get exp(): number {
    return this.$store.getters.getExp;
  }

  get totalExp(): number {
    return this.$store.getters.getTotalExp;
  }

  get expReq(): number {
    return this.$store.getters.getExpReq;
  }

  get multipliers() {
    return this.$store.getters.getMultipliers;
  }

  get moneyMultiplier() {
    return Utils.format(this.multipliers.money);
  }

  get expMultiplier() {
    return Utils.format(this.multipliers.exp);
  }

  get timeMultiplier() {
    return Utils.format(this.multipliers.time);
  }
}
</script>

<style lang="scss">
@import '../../styles/variables.scss';
</style>
