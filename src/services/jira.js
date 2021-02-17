import axios from 'axios';
import { jiraClientId, jiraClientSecret } from '@/config';

const headers = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
});

// curl --request POST \
//   --url 'https://auth.atlassian.com/oauth/token' \
//   --header 'Content-Type: application/json' \
//   --data '{"grant_type": "authorization_code","client_id": "YOUR_CLIENT_ID","client_secret": "YOUR_CLIENT_SECRET","code": "YOUR_AUTHORIZATION_CODE","redirect_uri": "https://YOUR_APP_CALLBACK_URL"}'
const exchangeAccessToken = ({ code, redirectUrl }) => {
  console.log('-Service->exchangeAccessToken, code=', code, ', callBackUrl=', redirectUrl);
  const hostUri = 'https://787dcc27930e.ngrok.io/getAccessTokenWithCode';
  return axios.post(hostUri, {
    clientId: jiraClientId,
    clientSecret: jiraClientSecret,
    code,
    redirectUri: redirectUrl,
  },
  {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // const hostUri = 'https://auth.atlassian.com/oauth/token';
  // return axios.post(hostUri, {
  //   grant_type: 'authorization_code',
  //   client_id: jiraClientId,
  //   client_secret: jiraClientSecret,
  //   code,
  //   redirect_uri: redirectUrl,
  // },
  // {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
};

// curl --request GET \
//   --url https://api.atlassian.com/oauth/token/accessible-resources \
//   --header 'Authorization: Bearer ACCESS_TOKEN' \
//   --header 'Accept: application/json'
const getCloudId = (token) => {
  console.log('-Service->getCloundId, token=', token);
  return axios.get(
    'https://api.atlassian.com/oauth/token/accessible-resources',
    headers(token),
  );
};

const getProjects = (toekn, cloudId) => {
  console.log('-Service->getProjects!');
  return axios.get(
    `https://api.atlassian.com/ex/jira/${cloudId}/rest/api/2/project`,
    headers(toekn),
  );
};

export {
  exchangeAccessToken,
  getCloudId,
  getProjects,
};
