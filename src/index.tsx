import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {observable,useStrict, action, computed  } from 'mobx';
import { Provider,} from 'mobx-react';
import autobind from 'autobind-decorator';

useStrict(true);

export class Store {
  @observable private _test: number[] =[];
  // action이라고 달아줌
  @autobind
  @action
  add(){
      this._test.push(Math.round(Math.random() * 100 ));
  }
  @computed
  get test(){
    if(this._test.length >5){
      return this._test;
    }else{
      return [];
    }
  }
}


const store = new Store();
//test가 변하면 반영
//객체에 observable을 달아줌
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
