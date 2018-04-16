<template>
  <div id="type" @click="focus()">
    <p class="type-prefix">user@skid-inc ></p>
    <input v-model="command" type="text" class="type-input"
      v-on:keyup.enter="submitCommand()"
      v-on:keyup.38="browseCommandHistory('up')"
      v-on:keyup.40="browseCommandHistory('down')"
    />
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
    const input: HTMLInputElement = this.$el.getElementsByTagName('input')[0];

    input.focus();
  }

  get commandHistory(): string {
    return this.$store.getters.getCommandHistory;
  }

  /** On-enter: trim and slice the command, commit it to the store */
  public submitCommand(): void {
    const cmd: string[] = this.command.replace(/ +(?= )/g, '').trim().split(' ');

    this.$store.commit('submitCommand', cmd);

    this.command = '';
  }

  /** Navigate through the command history: `up` or `down` */
  public browseCommandHistory(direction: 'up' | 'down'): void {
    this.$store.commit('browseCommandHistory', direction);

    this.command = this.$store.getters.getCommandHistory;
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
