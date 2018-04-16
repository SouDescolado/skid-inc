<template>
  <div id="tabs"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Tabs extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';

#tabs {
  width: $tabs-width;
}
</style>
