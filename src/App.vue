<template>
  <div id="app" class="app-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  methods: {
  },
};
</script>

<style lang="scss">
  @import "./assets/scss/main";

  .app-container {
    display: flex;
    justify-content: center;
  }

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

  .translate-enter-active {
    transition: transform .5s ease-in-out;
  }

  .translate-enter {
    transform: translateY(15rem);
  }

  .translate-leave-active {
    transition: opacity 1s;
    opacity: 0
  }
</style>
