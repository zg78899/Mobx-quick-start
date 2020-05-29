##@observable (by mobx)

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

##Observer (by mobx-react)

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

