<template>
  <div id="type">
    <p class="type-prefix">user@skid-inc ></p>
    <input type="text" class="type-input">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Type extends Vue {
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
#type {
  display: flex;
  padding: 16px;
  cursor: pointer;

  .type-prefix {
    padding: 0;
    margin: 0 8px 0 0;
    font-size: 1.25rem;
    line-height: 1;
  }

  .type-input {
    flex: 1 1 auto;
    padding: 0;
    margin: 0;
    border: 0;
    font-size: 1.25rem;
    color: inherit;
    background-color: transparent;
    cursor: pointer;

    &:focus {
      outline: 0;
    }
  }
}
</style>
