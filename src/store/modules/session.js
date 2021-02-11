import { jiraClientId } from '@/config';
import { uuid } from 'uuidv4';
import { exchangeAccessToken, getCloudId } from '@/services/jira';

const state = {
  session: null,
  setSession(session) {
    this.session = session;
  },
  authOngoing: false,
  setAuthOngoing(onGoing) {
    this.authOngoing = onGoing;
  },
  authError: undefined,
  setAuthError(error) {
    this.authError = error;
  },
};

const getters = {
  isAuthenticated: (st) => !!st.session,
};

const mutations = {
  signIn(st, payload) {
    st.setSession(payload);
  },
  signOut(st) {
    st.setSession(undefined);
  },
  resetSession(st) {
    st.setSession(undefined);
  },
  setAuthOngoing(st, payload) {
    st.seAuthOngoing(payload);
  },
  setAuthError(st, error) {
    st.setSsoOngoing(false);
    st.setSsoError(error);
  },
};

const actions = {
  setSignoutTimer({ commit }) {
    const exp = JSON.parse(localStorage.getItem(('jiraSession'))).expiration;
    const remainingTime = exp - Date.now();
    setTimeout(() => {
      commit('signOut');
    }, remainingTime);
  },
  tryAutoSignIn({ commit, dispatch }) {
    const jiraSession = localStorage.getItem('jiraSession');
    if (!jiraSession) {
      return Promise.reject(new Error('Not logged-in yet'));
    }
    const session = JSON.parse(jiraSession);
    const expirationDate = session.expiration;
    if (Date.now() > expirationDate) {
      return Promise.reject(new Error('Token expired'));
    }
    commit('signIn', session);
    dispatch('setSignoutTimer');
    return dispatch('loadJiraOpenTasks', session);
  },
  signOut({ commit }) {
    localStorage.removeItem('jiraSession');
    commit('signOut');
  },
  signIn({ commit }, payload) {
    const { redirectUrl } = payload;
    const appState = uuid();
    const jiraAuthUrl = `https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${jiraClientId}&scope=read%3Ajira-user%20read%3Ajira-work%20write%3Ajira-work&redirect_uri=${redirectUrl}&state=${appState}&response_type=code&prompt=consent`;
    // https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=qt9ZmJNFdSQmBiVtGGYgSfhUOfduZQiD&scope=read%3Ajira-user%20read%3Ajira-work%20write%3Ajira-work&redirect_uri=https%3A%2F%2F79e020adb2f0.ngrok.io%2Fjira-code&state=${YOUR_USER_BOUND_VALUE}&response_type=code&prompt=consent
    if (process.browser) {
      window.sessionStorage.setItem('jiraAuth', { id: appState, ongoing: true });
      // window.sessionStorage.setItem('authOngoing', true);
      window.location.href = jiraAuthUrl;
    }

    commit('setAuthOngoing', true);
  },
  authCodeReceived({ commit, dispatch }, payload) {
    exchangeAccessToken(payload).then((token) => {
      getCloudId(token).then((result) => {
        window.sessionStorage.removeItem('jiraAuth');

        const jiraSession = {
          token,
          cloudId: result.id,
          domain: result.name,
        };
        commit('signIn', jiraSession);
      }).catch((err) => {
        dispatch('signInError', err);
      });
    }).catch((err) => {
      dispatch('signInError', err);
    });
  },
  // authSuccess({ commit, dispatch }, payload) {
  //   window.sessionStorage.removeItem('jiraAuth');

  //   const now = new Date();
  //   const expirationDate = now.getTime() + (payload.expires_in * 1000);

  //   const userSession = {
  //     user: {
  //       id: payload.username,
  //       name: payload.username,
  //     },
  //     token: payload.access_token,
  //     tokenType: payload.token_type,
  //     expiration: expirationDate,
  //   };
  //   localStorage.setItem('userSession', JSON.stringify(userSession));
  //   commit('setAuthOngoing', false);
  //   commit('signIn', userSession);

  //   dispatch('setSignoutTimer');
  //   dispatch('loadJiraOpenTasks', userSession);
  // },
  signInError({ commit }, payload) {
    window.sessionStorage.removeItem('jiraAuth');
    commit('setAuthError', payload);
  },
  authorizationFailed({ dispatch }) {
    dispatch('signOut');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
