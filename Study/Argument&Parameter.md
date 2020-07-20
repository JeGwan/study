### Argument & Parameter
함수의 호출에 들어가는 녀석이냐 선언에 들어가는 녀석이냐에 따라 다르다.
간단히 말해 함수를 호출 할때 넣는 녀석은 `Argument` 함수를 선언할 때 일종의 `placeholder`이자 내부의 지역변수가 되는 녀석은 `Parameter`라고 부른다.
```js
let argument_name = "JeGwan";
sayHello(argument_name);
// 함수를 호출할 때 들어가는 인자는 Argument

function sayHello(parameter_name="none"){
  // 함수의 선언부에 들어가는 인자는 Parameter
  // 기본 값은 "none"으로 지정해 주었다.
  console.log(`Hello, ${parameter_name}!`);
}

```