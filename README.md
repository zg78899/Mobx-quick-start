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

## Observer (by mobx-react)

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

## computed 란?

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

