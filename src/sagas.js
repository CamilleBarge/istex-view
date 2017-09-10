import * as Actions from './actions.js';
import { call, put, all, take, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchConfig() {
  console.log('SAGA fetchConfig START');
  const config = yield call(axios, '/config.json');
  console.log('SAGA fetchConfig END');
  //console.log('CONFIG', config, config.data);
  yield put(Actions.updateConfig({ ...config.data, loaded: true }));
}

function* fetchDemoDocsFromTheApi(action) {
  const updateConfig = yield take(Actions.updateConfig); // wait for the config to be loaded
  console.log('SAGA fetchDemoDocsFromTheApi START', updateConfig.config);
  
  const config = updateConfig.config;
  

  // console.log('fetchDemoDocsFromTheApi saga',
  //   config,
  //   config.istexApiProtocol,
  //   !config.istexApiProtocol,
  //   !config.istexApiDomain,
  //   !config.istexApiProtocol || !config.istexApiDomain
  // );

  if (!config.istexApiProtocol || !config.istexApiDomain) return;
  
//  console.log('fetchDemoDocsFromTheApi saga after', config);

  let theUrl = config.istexApiProtocol + '://' + config.istexApiDomain;
  theUrl += '/document/?q=*&output=id,ark,title,genre&sid=istex-view&size=15&rankBy=random';
  //console.log('theUrl', theUrl);

  const res = yield call(axios, theUrl);

  //console.log('DEMO_DOCS', res.data);

  yield put(Actions.updateDemoDocsFromTheApi({nbIstexDoc: res.data.total, hits: res.data.hits}));
}

export default function* rootSaga() {
  yield all([
    takeLatest('FETCH_CONFIG', fetchConfig),
    takeLatest('FETCH_DEMO_DOCS_FROM_THE_API', fetchDemoDocsFromTheApi),
  ]);
}