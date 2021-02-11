<template>
  <div id="home" class="login-panel">
    <div class="login-button">
      <button
        class="button button--primary"
        @click="onClicked"
      >
        Connect Jira
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
  },
  methods: {
    onClicked() {
      console.log('-XXX->Connect Jira');
      const payload = {
        redirectUrl: `${window.location.origin}/jira-auth`,
        // redirectUrl: 'https://353378b80926.ngrok.io/jira-auth',
      };
      console.log('-XXX->redirectUrl=', payload.redirectUrl);
      this.$store.dispatch('signIn', payload);
    },
  },
};
</script>

<style lang="scss">
  @import "@/assets/scss/main";

  .login-panel {
    @include flex(column);
    align-items: center;
    justify-content: center;
    align-self: center;
    height: 30rem;
    width: 64rem;
    background-color: $horizon-40;
    border-top: 4px solid $fac-primary;

    .login-button {
      margin-top: 24px;
    }

    .loader-spinner {
      margin-bottom: 48px;
    }
  }
</style>
