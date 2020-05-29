##@observable (mobx)

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



