<template>
  <div id="panel-stats">
    <div class="panel-stats-names">
      <p>Level</p>
      <p>Experience</p>
      <p>Money</p>
    </div>

    <div class="panel-stats-values">
      <p>{{level}}</p>
      <p>{{exp}}/{{expReq}}</p>
      <p>${{money}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

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
}
</script>

<style lang="scss"></style>
