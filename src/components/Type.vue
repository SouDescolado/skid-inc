<template>
  <div id="type" @click="focus()">
    <p class="type-prefix">user@skid-inc ></p>
    <input v-model="command" type="text" class="type-input">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Type extends Vue {
  public command: string;

  constructor() {
    super();
    this.command = '';
  }

  /** Focus the input when clicking on the `#type` div-container. */
  public focus(): void {
    const input = this.$el.getElementsByTagName('input')[0];
    input.focus();
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
