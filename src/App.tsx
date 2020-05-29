import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer, inject } from 'mobx-react';
import{Store} from './index';

interface AppProps{
  store?: Store
}

@inject('store')
@observer //반응할
class App extends React.Component<AppProps,{}>{
  render(){
   const store = this.props.store as Store;
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
        </header>
    <p className="App-info">
      {JSON.stringify(store.test)}
      <button onClick={()=>store.add()}>추가</button>
      </p>

      </div>
    )
  }
}

export default App;
