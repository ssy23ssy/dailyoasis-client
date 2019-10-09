import axios from 'axios';

const urls = {
  login: ['post', '/login'],
  userInfo: ['get', '/currentUser'],
  signup: ['post', '/signup'],
  makeQuest: ['get', '/questAllocation'],
  allActivity: ['get', '/activityList'],
  currentQuest: ['get', '/currentQuest'],
  doneQuest: ['get', '/doneQuest'],
  getTitleList: ['get', '/titleList'],
  getMyTitle: ['get', '/userTitleList'],
  activityDetail: ['get', '/activityReview'],
  finishQuest: ['get', '/finishQuest'],
  writeReview: ['post', '/writeReview'],

  updateAddress: ['post', '/updateUserAddress'],

  getTags: ['get', '/userPreferenceList'],
  editTag: ['post', '/updateUserPreference'],

  changeTitle: ['post', '/updateUserTitle'],
}

function serverApi(type, data, myHeaders) {

  let apiURL = urls[type][1];
  const apiHttpMethod = urls[type][0];

  console.log(process.env.REACT_APP_serverURL);
  const api = axios.create({
    baseURL: process.env.REACT_APP_serverURL || 'http://localhost:3000',
  });

  // handle headers
  api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      // config.headers['Authorization'] = token;
      config.headers['Authorization'] = `JWT ${token}`;
    }
    if (myHeaders) {
      for (let h in myHeaders) {
        config.headers[h] = myHeaders[h];
      }
    }

    return config;
  });

  // handle query string
  if ( apiHttpMethod === 'get' ) {
    if ( data ) {
      apiURL = apiURL + '?';
      for ( let key in data ) {
        apiURL = apiURL + `${key}=${data[key]}&`;
      }
      // remove lastest &
      apiURL = apiURL.slice(0, -1);
    }
  }

  console.log(apiURL);
  return api({
    url: apiURL,
    method: apiHttpMethod,
    data: data,
  });
};

export default serverApi;