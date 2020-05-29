## @observable (by mobx)

oberservable 사용법 - 2가지 방식

- observable(<value>)

  - 데코레이터가 없이 사용하는 방식

  - @ 없이 ,함수처럼 사용해서 리턴한 객체를 사용

    

- @observable <클래스의 프로퍼티> =>TypeScript

  - 데코레이터로 사용하는 방법
  - 클래스 내부에 프로퍼티 앞에 붙여서 사용
  - 한 클래스 안에 여러개의 @observable 존재

    

~~~javascript
import {observable} from 'mobx';

//array에 사용
const list = observable([1,2,4]);

//booleandㅔ 사용
const islogin = observable(true);

//literal 객체에 사용
const age =observable({
  age:27
});
//클래스의 멤버 변수에 데코레이터로 사용
class AgeStore{
  @observable
  private _age:27
}
const ageStore = new AgeStore();
~~~

## @observer (by mobx-react)

-컴포넌트에 붙여사용한다.

oberserver 사용법 - 2가지 방식

- observer(<컴포넌트>)

  - 데코레이터가 없이 사용하는 방식

  - SFC에 붙여 사용

  - 리액트의 state을 사용하지않으면 SFC로 해도 관계없다

    

- <컴포넌트 클래스>에 @observer달아서 처리

- 리액트의 라이프사이클이 아니라,mobx의 라이프 사이클

  - componentWillReact
  - componentWillUpdate
  - componentDidUpdate

  

~~~javascript
const StatelessApp = observer(()=>{
  function addAge(): void{
    ageState.addAge();
  }
  return (
    <div>{ageState.getAge()}
     <button onClick={()=>addAge()}>나이먹었다.</button>
   </div>                         
   );                                                  
});

@observer
class App extends React.Component<{},{}>{
  constructor(props:{}){
  super(props);
this.addAge = this.addAge.bind(this);
}
render(){
  return (
  <div>
    {ageState.getAge()}
<button onClcik={()=>this.addAge()}>나이 먹었다.</button>
    </div>
  );
 }
 addAge(){
   ageState.addAge();
 }
}
~~~

## @computed 란?

- getter에만 붙일수있다. (setter 부른면 getter도 실행된다.)

- 함수가 아니라 리액트브 하다는 것에 주목

- 실제 컴포넌트에서 사용하는 (getter)값들에 달아서 사용하면 최소 범위로 변경할 수 있기에 유용하다.

  -30살이 넘었을 때만 나이를 올리면 30살 이하 일대는 재랜더링 대상이 아닌 것과 같은경우

  -내부적으로 고도의 최적화 => 어떻게?

  - 매번 재계산하지않는다.
  - 계산에 사용 할 observable 값이 변경되지않으면 재실행하지 않음
  - 다른 computed 또는 reaction에 의해 호출되지않으면 재실행하지않음
  - observable과 처리방식이 차이로 인한 성능 이슈에 주목
  - observable이 변했는데 computed가 변하지않을때 사용에 따른 차이

computed 사용법 - 2가지 방식

- computed(<함수>)

  - 데코레이터 없이 사용하는 방식

  - 별의미가 없다.

- <클래스의 getter 메서드 >에 @computed 달아서 처리

~~~javascript
class AgeState{
  constructor(){
    extendObservable(this,{
      _age:27,
      age:computed(function (){
        return (this._age > 30) ? this._age: 0;
      })
    })
  }
}
class AgeState{
  @observable private _age: number = 27;
  @computed
   get age():number{
    return (this._age>30)? this._age:0; 
   }
 }
~~~



## @action (by mobx)

### action이란?

- observable을 수정하는 함수

  - 어디에 observable 처리된 객체를 수전하는 함수가 있는지 마킹
  - untracked, transaction 및 allowStateChange(각 각의 요소)로 래핑 한 후 리턴
- 평소엔 옵셔널
  - useStrict 모드를 쓰면 필수(useStrict(true));
  - useStrict모드에서 observable을 변경하는 함수가, action을 마킹하지 않으면 **<u>런타임 에러</u>**
- computed의 setter는 <u>액션</u>이다.

~~~ javascript
ref.child('todos').on('value',action((snapshot:firebase.database,DataSnapshot)=>{
  if(snapshot){
    const list = snampshot.val();
    const todos= [];
    if(list !== null){
      for(const key of Object.keys(list)){
        todos.push({
          id:key,
          text:list[key]
        });
      }
    }
    this.todos = todos;
  }
}));

@action addTodo = (text:string)=>{
  const ref = db.ref();
  ref.child('todos').push().set(text);
}
~~~



## @inject와 Provider

### Provider

- Redux을 사용할 때 ,Provider와 동일한 개념으로 컨테이너 라는 개념으로 사용해도 무관하다.

- Provider에 props로 넣고 ,@inject로 꺼내서 쓴다고 생각하면 된다.

  -상당히 명시적이고 ,편리한다

  -컨테이너를 쓰지 않아도 될것 같다.

  - props로 바꿔 줍니다.
    - this.props.store as IAgeState => 중요한 부분(타입을 지정해주는 부분)

~~~javascript
ReactDom.render(
<Provider>
  <App/>
  </Provider>,
  document.getElementById('root') as HTTLElement
);

@inject('store');
@observer
class App extends React.Component<{store?:IAgeState},{}>{
  render(){
    const store = this.props.store as IAgeState;
    return (
    <div>
      <Devtools/>
      <p className="App">
      	{store.age}
  			<button onClick={()=>store.addAge()}>나이가먹었다.</button>
  			<button onClick={()=>store.addAgeSync()}>깃헙 비동기 호출</button>
      </p>
      </div>
    )
  }
}
~~~



## @autorun

만약에 autorun으로 감싼 함수가 있다 처음에 무조건 한번 실행되고 , 그 다음 안에 있는 내용이 조금이라도 변경이 되면 다시 실행된다. 하지만 autorun의 사용은 그다지 권장되지 않는다.

##  autorun vs computed

- 둘다 리액티브

  - 무언가 변경이 있을때 즉시 실행(명령형)
- autorun
  -  일단 한번 실행되고 , 종속된 변수들이 변경되었을때 실행
  - 주로 로깅,UI 업데이트 같은 리액티브를 명령으로 전환할때 사용
- computed
  - observable 변수가 변경되었을때 실행
- 차이점 autorun은 안의 내용이 조금이라도 변경되면 실행된다. 변경되었을 때 computed는 최적화 되어 실행된다.


## mobx-react-devtools

- 이것은 컴포넌트입니다. 단 Mobx Developer Tools는 extension이라 chrome에 설치
- npm i mobx-react-devtools -D
- import DevTools from 'mobx-react-devtools';
- <DevTools/>
- http://github.com/mobxjs/mobx-react-devtools

