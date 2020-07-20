# TypeScript

타입스크립트를 공부하기 위한 레포.

### References

- [TypeScript 공식 튜토리얼](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Learn TypeScript in 50 Minutes - Tutorial for Beginners](https://www.youtube.com/watch?v=WBPrJSw7yQA)

## 1. What's TypeScript?

- 타입스크립이란 마이크로소프트에서 내놓은 오픈소스 프로그래밍 언어이다.
- 개발 유지가 마이크로소프트로부터 보장된다.
- 자바스크립트가 타이핑된 수퍼셋트이다
- 플레인 자바스크립트로 컴파일 해준다.

## 2. Why TypeScript?

- 자바스크립트와 관련성이 깊다.
- 정적타이핑(static typing)과 타입 인터페이스(type interface)
- IDE 지원(intellisense를 지원)
- 빠른 성장과 사용률

## 3. installation

`npm install -g typescript`를 통해 설치할 수 있다.

## 4. usage

### 4.1. Hello World(Make and Compile)

먼저 `main.ts`파일을 만들고 다음과 같이 써주자

```ts
let message = "Hello World";
console.log(message);
```

타입스크립트 컴파일은 단순히 터미널에서

```bash
# tsc [filePath]
tsc main.js
```

를 해주면된다. 그럼 프로젝트에 `main.js`파일이 자동 생성되는데

```js
var message = "Hello World";
console.log(message);
```

이렇게 나올 것이다. 타입스크립트는 자동으로 브라우저 호환성을 고려해 `.ts`파일로 작성된 파일을 `.js`로 컴파일 해주는데 이 때 기본 타겟 버전은 `es3`이다.

이렇게 컴파일 하고 나면 `main.ts`에 에러가 뜬다(vscode기준). 메세지를 읽어보면 `main.js`에 이미 `message`가 선언되었고 다시 선언할 수 없다는 뜻이다. 타입스크립트는 기본적으로 모든 파일들의 글로벌 스콥을 공유한다고 본다. 따라서 두번 선언되는 것은 명백히 오류로 생각한다. 이런 문제를 없앨려면 파일이 `module`이라고 선언해줘야되는데 방법은 간단하다.

```ts
export {};
let message = "Hello World";
console.log(message);
```

`export {}`한 문장만 추가해주면된다. 이제부터는 모듈이라 생각한다(따라서 글로벌 스코프에 중복된 변수명이 있음에도 오류가 뜨지 않는다).

다시 `tsc main.ts`를 해주면

```js
// main.js
"use strict";
exports.__esModule = true;
var message = "Hello World";
console.log(message);
```

생성된 js파일은 위와 같아 진다(module을 지원하지 않는 es3기준에 맞춰서 작성된다).

이번엔 파일이 변경시마다 자동으로 컴파일되게 옵션을 부여해서 컴파일해보자.

```bash
tsc main.ts --watch
```

그럼 프로세스모드가 되고 파일을 수정할 때마다 자동으로 컴파일 해준다.

```
[18:16:03] File change detected. Starting incremental compilation...
[18:16:03] Found 0 errors. Watching for file changes.
```

위는 수정 될때 터미널에 뜨는 메세지

## 4.2. Variables

이번엔 변수 선언을 보자. 타입스크립트는 어떻게 static typing을 지원해주는가?

### static typing

```ts
let isBeginner: boolean = true;
let total: number = 0;
let name: string = "Vishwas";

let sentence: string = `My name is ${name}
I am a beginner in Typescript`;
```

그렇다. `[variableName] : [type]` 형식의 변수명 뒤에 콜론을 붙이고 타입을 선언해주어 정적 타이핑 시킨다. 이를 통해 해당변수에 선언된 타입 이외의 것이 들어오면 IDE에서도 오류 메시지를 팝업하고 컴파일할 때도 오류메세지를 띄워준다.

그러나 원래 자바스크립트는 동적 타이핑 언어이므로 컴파일을 해도 에러가 뜨진 않는다. 그래서 그런지 에러가 떠도 컴파일 해주긴 한다.

이런 타이핑은 `intellisense`에 접목되면서 IDE에서 우리가 개발하기 아주 편한 장점을 제공하는데, 이를 테면 구체적으로 할당된 데이터가 없어도 정적 타입을 통해 해당 데이터타입의 프로토타입 메소드 등을 자동으로 추천해준다는 것이다.

타입스크립트는 또 `null`, `undefined`을 모든 데이터타입에 할당할 수 있게 한다(당연히 자바스크립트에선 기본으로 선언만 된 변수는 undefined이므로).

```ts
let isNew: boolean = null;
let myName: string = undefined;
```

### Array

배열의 선언도 보자. 원소가 단일 데이터 타입인 경우 다음 두가지 방식으로 선언할 수 있다.

```ts
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
```

원소가 서로 다른 데이터 타입일 경우 배열 리터럴 안에 각 위치별 데이터타입을 써준다.

```ts
let person1: [string, number] = ["Chris", 22];
```

적힌 데이터 타입과 순서를 지켜야 에러가 뜨지 않는다.

### enum

`enum`도 지원한다.

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log(c); // 1
```

`enum`의 각 변수는 선언만 해줄 수도 있고 값을 받을 수도 있는데, 선언만 받을 경우 인덱스 처럼 0부터 써진 순서대로 숫자를 부여 받는다. 따라서 위의 `Color.Green`은 `1`의 값을 갖는다.

```ts
enum Color {
  Red = 4,
  Green,
  Blue,
}
console.log(Color.Red, Color.Green, Color.Blue); // 4 5 6
```

할당을 해주면 할당된 변수 앞의 변수들은 `0, 1, 2`식으로 값이 증가하고 할당된 변수 뒤의 변수들은 부여한 값으로부터 1씩 증가한 값을 갖는다.

### 뭐든지 될 수 있는 any 타입

```ts
let randomValue: any = 10;
randomValue = true;
randomValue = "Vishwas";
```

`any`타입은 어떤 타입도 넣을 수 있는 와일드 카드이다. 위처럼 써도 오류가 나지 않는다.

그러나 `any`타입은 동시에 타입스크립트의 장점인 정적 타이핑을 지원하지 않으므로 다음과 같은 예기치 못한 상황에서 에러를 던지지 않는다.

```ts
let randomValue: any = 10;
randomValue.name;
randomValue();
randomValue.toUpperCase();
```

즉, `any`로 선언된 변수에 무엇이든 들어와도 되지만 `10`이 할당된 이후로는 다른 타입의 프로토타입 메소드를 쓰지 못하게 해야하지만, 에러를 내지 않는다.

이러한 상황을 방지하기 위해서 나온 것이 `unknown` 타입이다.

### unknown 타입

```ts
let randomValue: unknown = 10;
randomValue.name; //-> Property 'name' does not exist on type 'unknown'.
randomValue(); //-> Cannot invoke an expression whose type lacks a call signature. Type '{}' has no compatible call signatures.
randomValue.toUpperCase(); //->Property 'toUpperCase' does not exist on type 'unknown'.
```

이렇게 써주면 할당해주는 순간 할당된 타입으로 타이핑이 되어버려 다른 타입으로 다루면 에러가 뜬다.

### type casting

타입 캐스팅도 된다(여러모로 자바를 많이 닮았다).

위의 예시중 마지막 `toUpperCase()`메소드는 변수를 `string`으로 캐스팅 해주면 동작가능 하므로 아래와 같이 쓸 수 있다.

```ts
let randomValue: unknown = 10;
(randomValue as string).toUpperCase();
```

타입스크립트에서는 타입캐스팅을 `(변수명 as 타입명)`으로 해줄 수 있다.

### object check

```ts
let myVariable: unknown = 10;

function hasName(obj: any): obj is { name: string } {
  return !!obj && typeof obj === "object" && "name" in obj;
}

if (hasName(myVariable)) {
  console.log(myVariable.name);
}
```

`unknown` 타입으로 설정된 변수를 체크하기 위해서는 위와 같은 함수를 만들어 줄 수 있다. 함수 명 뒤에 콜론이 붙고 오는 데이터타입은 `return`되는 데이터 타입을 선언한다. `obj is {name:string}`이 눈에 띄는데 이렇게 선언해주면 타입스크립트는 체크 하는 함수를 통과한 블록 내에서 해당 변수를 `{name:string}`형태를 가진 것으로 생각한다.

즉, 굳이 리턴 데이터 타입으로 불린을 쓰지 않고 `[parameter] is [dataType]`의 형식으로 선언하는 것의 이점은 체크 함수를 통과한 블록내에서 자동으로 해당 데이터 타입의 프로토타입 메소드나 프로퍼티를 쓸 수 있게 해준다는 점이다.

### inference

```ts
let a = 20;
a = true; //error
```

타입스크립트에서 변수는 데이터타입 선언을 안해도 되긴 하다. 대신 선언과 함께 특정 값을 할당 받았다면 타입스크립트는 그 값의 데이터타입으로 변수를 추론한다. 때문에 2번째 줄에서 `number`인 변수 `a`에 `boolean`으로 재할당하는 것에 오류를 던진다.

```ts
let b;
b = 20;
b = true;
```

하지만 이런 표현은 가능하다. 이 경우 변수 선언시 초기화를 함께 하지 않았다. 그런 경우 타입스크립트는 any로 생각한다. 때문에 `intellisense`가 지원되지 않는다.

### union type

```ts
let multiType: number | boolean;
multiType = 20;
multiType = true;
```

한 변수에 대해서 여러 타입으로 선언할 수 있고 `[dataType1] | [dataType2]`식으로 선언할 수 있다.

왜 `any`를 쓰지 않을까?

1. `union type`으로 선언하면 일단 선언된 데이터 타입만으로 할당되는 값에 제한을 걸 수 있다.
2. `intellisense`가 `any`일 때는 지원되지 않지만 `union type`은 지원된다.

## 4.3. Functions

### Parameter and Return datatype declaration

타입스크립트에서 함수는 파라미터와 리턴 데이터타입을 설정해줄 수 있다. 이렇게 되면 `intellisense`가 알아서 잘못 입력된 값에 대해 경고도 띄워주고 함수를 만들 때 아웃풋 데이터 타입에 일치 하지 않을 때도 경고를 띄워준다.

```ts
function add(num1: number, num2: number): number {
  return num1 + num2;
}
```

위 식에서 두 파라미터 `num1`, `num2`에 대해 모두 `number`타입을 받고 리턴 또한 `number`이다.

```ts
add(5, 10);
add(5, "10"); // error
```

그래서 아규먼트를 넣어 줄 때 `number`가 아닌 타입이 들어가면 에러가 된다.

### Optional parameter

뒤의 파라미터들을 옵셔널하게 지정할 수도 있다. 파라미터 네임 뒤에 퀘스천마크 `?`만 붙이면 된다.

```ts
function add2(num1: number, num2?: number): number {
  if (num2) return num1 + num2;
  return num1;
}
add2(5); // return 5
```

### Default parameter

디폴트 값도 정해줄 수 있다. 이럴 경우 옵셔널 파라미터에서 했던 퀘스쳔 마크는 없애야 한다.

```ts
function add3(num1: number, num2: number = 10): number {
  if (num2) return num1 + num2;
  return num1;
}
add3(5); // return 15
```

## 4.4. Interface

앞서 보았던 것처럼 타입스크립트는 파라미터로 객체의 구조를 명시해줄 수 있다.

```ts
function fullName(person: { firstName: string; lastName: string }) {
  console.log(`${person.firstName} ${person.lastName}`);
}
let p = {
  firstName: "Bruce",
  lastName: "Wayne",
};
fullName(p); // Bruce Wayne
```

하지만 `person`변수와 같은 타입이 엄청 많이 쓰인다면 일일이 구조를 명시하는 것은 복잡할 것이다. 타입스크립트는 이런 상황을 해결하기 위해서 `interface`를 제공한다. 만드는 법은 `class`와 비슷하지만 객체도 클래스도 아닌 문법이다. 가지고 있는 프로퍼티명과 데이터타입을 열거하는 식이다.

한번 `Person`이라는 `interface`를 만들어서 위 코드를 바꿔보자.

```ts
interface Person {
  firstName: string;
  lastName: string;
}
function fullName(person: Person) {
  console.log(`${person.firstName} ${person.lastName}`);
}
let p = {
  firstName: "Bruce",
  lastName: "Wayne",
};
fullName(p); // Bruce Wayne
```

훨씬 직관적이고 코드가 짧아졌다.

### Optioanl property

함수에서 했던 것과 마찬가지로 `property`도 선택적 선언을 할 수 있다.
optional property가 될 property name 뒤에 `?`만 붙이면 된다.

```ts
interface Person {
  firstName: string;
  lastName?: string;
}
function fullName(person: Person) {
  console.log(`${person.firstName} ${person.lastName}`);
}
let p = {
  firstName: "Bruce",
};
fullName(p); // Bruce undefined
```

`lastName`을 optional로 지정한 경우 밑의 변수 `p`에서 `lastName`을 지워도 오류가 뜨지 않는다. 다만 `fullName`이라는 함수에서 `person.lastName`이 없으므로 `Bruce undefined`라는 결과가 나올 뿐이다. 역시 에러를 던지진 않으므로 `fullName`함수를 그대로 쓰면 불안하다.

```ts
function fullName(person: Person) {
  console.log(`${person.firstName} ${person.lastName || ""}`);
}
```

이런식으로처리 해주면 문제는 없다.

중요한 것은 인터페이스에서 옵셔널 프로퍼티를 선언하고 나서 컴파일 할 때는 에러를 던지지 않지만 런타임시 에러가 발생할 수 있다는 것이다. 따라서 옵셔널 프로퍼티를 쓴다면 해당 인터페이스를 이용하는 함수들에 옵셔널 프로퍼티가 들어오지 않을 때의 예외를 잘 만들어줘야 한다.

## 4.5. Class

타입스크립트에서 클래스는 다음과 같이 선언한다. 플레인 자바스크립트와 다른 점은 인스턴스의 멤버 변수의 데이터 타입을 선언할 수 있다는 점이다.

```ts
class Employee {
  employeeName: string;

  constructor(name: string) {
    this.employeeName = name;
  }

  greet() {
    console.log(`Good Morning ${this.employeeName}`);
  }
}
```

### inheritance

상속 역시 가능하다.

```ts
class Manager extends Employee {
  constructor(managerName: string) {
    super(managerName);
  }
  delegateWork() {
    console.log(`Manager delegating tasks ${this.employeeName}`);
  }
}

let m1 = new Manager("Bruce");
m1.delegateWork();
m1.greet();
console.log(m1.employeeName);
```

이 경우 `constructor`메소드의 `super()`는 부모 클래스의 컨스트럭터에 `managerName`을 넣는다. 즉, 위의 경우 생성자에 들어오는 변수명은 의미 없고, 인스턴스를 만들 때 부모에서 인스턴스 멤버로 선언했던 `employeeName`으로 접근할 수 있는 것이다.

### Access Modifier

자바처럼 클래스의 프로퍼티나 메소드를 접근가능성을 나타내는 키워드 `public`, `private`, `protected`가 있다. 기본적으로 모든 클래스의 멤버는 `public`이다.

#### public (상속받은 자식 클래스 내부, 인스턴스 모두에서 접근 가능)

우리가 아까 선언했던 클래스 두개를 다시 보면

```ts
class Employee{
  employeeName: string; // == public emploeeName : string
  ...
}
let emp1 = new Employee('Vishwas');
console.log(emp1.employeeName); // working

class Manager extends Employee{
  ...
  delegateWork(){
    console.log(`Manager delegating tasks ${this.employeeName}`); //working
  }
}
```

`employeeName`이 자식클래스나 인스턴스에서 접근가능 했던 것은 클래스 프로퍼티의 기본 접근제한자가 `public`이기 때문이다.

#### private (오직 선언된 클래스 내에서만 접근 가능)

위에서 선언했던 `Employee`클래스에서 `employeeName`을 `private`으로 바꿔보자.

```ts
class Employee{
  private employeeName: string;
  ...
}
let emp1 = new Employee('Vishwas');
console.log(emp1.employeeName); // error

class Manager extends Employee{
  ...
  delegateWork(){
    console.log(`Manager delegating tasks ${this.employeeName}`); //error
  }
}
```

이제부터는 인스턴스에서 직접 employeeName에 접근하는 것이 불가능하다. 또한 상속받은 클래스에서도 접근은 불가능하다. `private`은 클래스 프로퍼티를 외부로부터 보호하기 위한 것이다.

그런데 상속받은 클래스까지는 접근 가능하게 하고 싶다면 `protected`를 쓰면된다.

#### protected (상속 받은 클래스까지 접근 가능)

```ts
class Employee{
  protected employeeName: string;
  ...
}
let emp1 = new Employee('Vishwas');
console.log(emp1.employeeName); // error

class Manager extends Employee{
  ...
  delegateWork(){
    console.log(`Manager delegating tasks ${this.employeeName}`); // working
  }
}
```

`protected`는 상속 받은 자식 클래스 내부에서는 접근 가능하다. 하지만 역시 인스턴스에서는 접근 불가하다.

이로써 타입스크립트의 `variable`, `function`, `interface`, `class`, `access modifier`의 쓰임새와 문법을 다루었다.
