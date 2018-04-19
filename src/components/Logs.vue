<template>
  <div id="logs"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { MutationPayload } from 'vuex';

@Component({})
export default class Logs extends Vue {
  constructor() {
    super();
  }

  public mounted(): void {
    this.$store.subscribe((mutation: MutationPayload) => {
      if (mutation.type === 'printLog') {
        const log = document.createElement('div');
        log.setAttribute('class', 'log');
        log.innerHTML = mutation.payload;

        this.$el.appendChild(log);
      }

      if (mutation.type === 'clearLog') {
        while (this.$el.firstChild) {
          this.$el.removeChild(this.$el.firstChild);
        }
      }
    });
  }

  get logs(): string[] {
    return this.$store.getters.getLogs;
  }
}
</script>

<style lang="scss"></style>
