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

<style scoped lang="scss">
@import '../styles/variables.scss';

#logs {
  z-index: 1;
  flex: 1 1 auto;
  padding: 16px 8px;
  width: $logs-width;

  .log {
    margin: 0 0 8px;
    padding: 0;
    line-height: 1.35;
    font-size: .9em;

    .error {
      font-weight: 700;
      color: #ff8f8f;
    }

    .warning {
      font-weight: 700;
      color: #f5fe9d;
    }

    .success {
      font-weight: 700;
      color: #70fcb8;
    }

    .info {
      font-weight: 700;
      color: #90e2fa;
    }

    .sub {
      font-weight: 700;
      color: #c7c7c7;
    }
  }
}
</style>
