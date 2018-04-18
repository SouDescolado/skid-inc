<template>
  <div id="type" @click="focus()">
    <p class="type-prefix">user@skid-inc ></p>
    <input v-model="command" type="text" class="type-input"
      v-on:keyup.enter="submitCommand()"
      v-on:keyup.38="browseCommandHistory('up')"
      v-on:keyup.40="browseCommandHistory('down')"
      v-on:keyup.ctrl.75="clearToCaret($event)"
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

  /** Clear the command from the end to the caret position */
  public clearToCaret(event: KeyboardEvent): void {
    if (event === null || event.target === null) {
      return;
    }

    // @ts-ignore - event.target is not an HTMLInputElement
    const caretPosition: number = event.target.selectionStart;

    this.command = this.command.substr(0, caretPosition);
  }
}
</script>

<style lang="scss"></style>
