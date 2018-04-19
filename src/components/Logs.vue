<template>
  <div id="logs">
    <p class="log" v-for="log in logs">{{log}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MutationPayload } from 'vuex';

@Component({})
export default class Logs extends Vue {
  constructor() {
    super();
  }

  get logs(): string[] {
    return this.$store.getters.getLogs;
  }
}
</script>

<style lang="scss"></style>
