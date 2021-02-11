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
        // redirectUrl: `${window.location.origin}/jira-auth/`,
        redirectUrl: 'https://353378b80926.ngrok.io/jira-auth',
      };
      console.log('-XXX->redirectUrl=', payload.redirectUrl);
      this.$store.dispatch('signIn', payload);

      // // const callbackUrl = 'https://79e020adb2f0.ngrok.io';
      // const appBoundState = uuid.v4();
      // // https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=QcwyuQAriZCInXZQ9U2zWANPp89VwjDx&scope=write%3Ajira-work%20read%3Ajira-work%20read%3Ajira-user&redirect_uri=https%3A%2F%2F22f81ecf4292.ngrok.io%2Fjira-code&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent
      // // https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=qt9ZmJNFdSQmBiVtGGYgSfhUOfduZQiD&scope=read%3Ajira-user%20read%3Ajira-work%20write%3Ajira-work&redirect_uri=https%3A%2F%2F79e020adb2f0.ngrok.io%2Fjira-code&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent
      // const jiraAuthUrl = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=qt9ZmJNFdSQmBiVtGGYgSfhUOfduZQiD&scope=read%3Ajira-user%20read%3Ajira-work%20write%3Ajira-work&redirect_uri=https%3A%2F%2F79e020adb2f0.ngrok.io%2Fjira-code&state=${appBoundState}&response_type=code&prompt=consent`;
      // window.sessionStorage.setItem('jiraAuth', { id: appBoundState, state: 'ongoing' });

      // window.location.href = jiraAuthUrl;
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
