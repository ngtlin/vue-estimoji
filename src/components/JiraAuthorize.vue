<template>
  <div>JiraAuthorize Callback page</div>
</template>
<script>

export default {
  name: 'JiraAuthorize',
  data() {
    return {
      jiraAuthResponse: {},
    };
  },
  created() {
    // Jira Authorize Call back, parsing the result
    const authCode = this.$route.query.code;
    const appState = this.$route.query.state;
    console.log('-XXX->JiraAuthorize!, authCode=', authCode, ', appState=', appState);
    const payload = {
      code: authCode,
      redirectUrl: `${window.location.origin}/jira-auth`,
    };
    this.$store.dispatch('authCodeReceived', payload);
  },
  methods: {
    errorMessage(error, description) {
      return `${error}: ${description}`;
    },
  },
};
</script>
