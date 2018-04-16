<template>
  <div id="logs"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Logs extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';

#logs {
  flex: 1 1 auto;
  width: $logs-width;
}
</style>
