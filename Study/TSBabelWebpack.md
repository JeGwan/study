# TS-BABEL-WEBPACK 통합환경구축

## 0. Goal

이 프로젝트는 `TypeScript` - `Babel` - `Webpack`으로 이어지는 컴파일 및 번들링 파이프라인을 구축하려고 합니다. 세가지 모듈을 접목시켜 개발환경을 구축하고, 각각이 하는 일을 따로 따로 실행해보면서 원리를 Practical하게 알아가는 것 또한 목적입니다.

## 1. TypeScript

### 1.1. TypeScript의 등장

> 자바스크립트의 태생적 문제를 극복하고자 CoffeeScript, Dart, Haxe와 같은 AltJS(자바스크립트의 대체 언어)가 등장하였다.
>
> TypeScript 또한 자바스크립트 대체 언어의 하나로써 자바스크립트(ES5)의 Superset(상위확장)이다. C#의 창시자인 덴마크 출신 소프트웨어 엔지니어 Anders Hejlsberg(아네르스 하일스베르)가 개발을 주도한 TypeScript는 Microsoft에서 2012년 발표한 오픈소스로, 정적 타이핑을 지원하며 ES6(ECMAScript 2015)의 클래스, 모듈 등과 ES7의 Decorator 등을 지원한다.
>
> 출처 : [Poiemaweb](https://poiemaweb.com/typescript-introduction)

### 1.2. TypeScript 사용법

#### 1.2.1. Type Annotation

파라미터에 ":DataType" 으로 데이터타입을 정해줄 수 있다.
이 것은 필수로 해당 데이터가 들어오게 강제한다.

```javascript
function greeter(person: string) {
  return "Hello, " + person;
}
```

#### 1.2.2.Interface

TypeScript에서는 내부 구조가 같은 두 객체는 '호환'된다.
그래서 단순히 필요한 모양을 갖추는 것만으로 인터페이스를 만들 수 있다.

```javascript
interface Person {
  firstName: string;
  lastName: string;
}
```

#### 1.2.3. Classess

클래스 생성도 할 수 있는데, public 키워드를 달아주면 해당 인자가 바로 속성이되게 만들어준다
즉 `this.firstName = firstName`을 안해도 된다.

```javascript
class Student {
  fullName: string;
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
      this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}
```

출처 : [JeGwan/ts-tutorial](https://github.com/JeGwan/ts-tutorial)

### 1.3 TypeScript Compile

이제 본격적으로 타입스크립트 파일을 작성한 뒤 컴파일 해보겠습니다.

#### Transfile? Compile?

타입스크립트 파일을 기계어로 바꾸는 것이 아니기 때문에 컴파일이 아니라 트랜스파일이라 불러야 한다는 의견이 있습니다. 그러나 사전은 물론이고 위키백과의 개발용어로도 Transfile 이라는 단어는 없습니다. 왜 컴파일러라고 부르는가 싶어 컴파일러의 의미가 기계어 변환외에 파일 변환을 아우르는 건지 위키에서 찾아봤습니다.

> 컴파일러(compiler, 순화 용어: 해석기, 번역기)는 특정 프로그래밍 언어로 쓰여 있는 문서를 다른 프로그래밍 언어로 옮기는 프로그램을 말한다. 원래의 문서를 소스 코드 혹은 원시 코드라고 부르고, 출력된 문서를 목적 코드라고 부른다. 목적 코드는 주로 다른 프로그램이나 하드웨어가 처리하기에 용이한 형태로 출력되지만 사람이 읽을 수 있는 문서 파일이나 그림 파일 등으로 옮기는 경우도 있다. 원시 코드에서 목적 코드로 옮기는 과정을 컴파일(compile, 순화 용어: 옮김, 번역, 문화어: 콤파일)이라고 한다.
>
> 출처 : [Wikipedia](https://ko.wikipedia.org/wiki/%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC)

맞았습니다. 컴파일이 한파일에서 다른 파일로 바꾸는 모든 과정을 아울러 말하는 것입니다. 따라서 컴파일 한다고 해도 틀린 표현이 아닙니다.

#### 1.3.1 CLI 환경에서 Compile

먼저 타입스크립트를 전역으로 터미널에서 설치해줍니다.

```bash
npm install -g typescript
```

프로젝트 루트에 `t1.ts`파일을 만들겠습니다.

```ts
//t1.ts
class Vehicle {
  private name: string;

  private passengers: Array<Person>;
  constructor(name: string) {
    this.name = name;
    this.passengers = [];
  }
  getName(): string {
    return this.name;
  }
  boarding(person: Person): void {
    this.passengers.push(person);
    console.log(...this.passengers);
  }
}
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
}
let car = new Vehicle("BMW");
let driver = new Person("David");
car.boarding(driver);
```

탈것과 사람이라는 객체를 만들고 탈것에 사람이 타는 메소드를 만들었습니다. 스프레드 연산자, 클래스 선언이 어떻게 바뀌는지 보여드리기 위한 코드입니다.

컴파일은 간단히 `tsc [path]`를 해주면됩니다. `.ts` 확장자는 생략가능합니다.

```bash
tsc t1
```

컴파일된 파일입니다.

```js
// t1.js
var Vehicle = /** @class */ (function () {
  function Vehicle(name) {
    this.name = name;
    this.passengers = [];
  }
  Vehicle.prototype.getName = function () {
    return this.name;
  };
  Vehicle.prototype.boarding = function (person) {
    this.passengers.push(person);
    console.log.apply(console, this.passengers);
  };
  return Vehicle;
})();
var Person = /** @class */ (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype.getName = function () {
    return this.name;
  };
  return Person;
})();
var car = new Vehicle("BMW");
var driver = new Person("David");
car.boarding(driver);
```

타입스크립트는 타겟 자바스크립트의 버전을 옵션으로 넣어주지 않을경우 기본 컴파일 버전이 es3입니다. 따라서 클래스 개념이 없었던 자바스크립트이므로 함수와 클로저를 만들어 클래스를 만들어주었습니다.

#### 타겟 버전 설정

```bash
tsc [path] -t [targetVersion]
```

타겟버전은 단순히 -t 옵션을 붙이고 뒤에 타겟 버전을 명시하면됩니다. 예를들어

```bash
tsc t1.ts -t es6
```

이런식으로 설정할 수 있습니다.

다음은 es6로 컴파일된 `t1.js`파일입니다.

```js
/// t1.js compiled by es6
class Vehicle {
  constructor(name) {
    this.name = name;
    this.passengers = [];
  }
  getName() {
    return this.name;
  }
  boarding(person) {
    this.passengers.push(person);
    console.log(...this.passengers);
  }
}
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
let car = new Vehicle("BMW");
let driver = new Person("David");
car.boarding(driver);
```

역시 es6에서는 클래스, let, spread operator 등을 지원하므로 타입스크립트의 타입 지정이 없어진 것 빼고는 달라진게 없습니다.

#### CLI 에서 여러가지 컴파일 옵션

한번에 여러 파일 컴파일

```bash
tsc [path1] [path2] ...
```

해당경로의 모든 ts파일 컴파일

```bash
tsc [directoryPath]/*.ts
```

오토 컴파일링 : 파일 내용이 변할 때 자동 컴파일링

```bash
tsc [path] --watch
```

### 1.3.2 tsconfig.json 을 활용한 컴파일

프로젝트 루트에 `tsconfig.json` 파일을 생성하고, 그 파일에서 옵션을 주고 알아서 컴파일되는 방식입니다.

#### 어떻게 "알아서" 컴파일 할까요?

`tsc`를 터미널에서 뒤에 input file 없이 실행해버리면 컴파일러는 `tsconfig.json`을 자동으로 찾습니다. 현재 디렉토리부터 부모 디렉토리로 점점 올라가면서 찾게되고 있으면 그 옵션을 따르게 됩니다. 그래서 `tsconfig.json`을 생성해주고 터미널에 `tsc`만 입력해주면 우리가 옵션을 매번 입력해줄 필요 없이 "알아서" 컴파일을 해줍니다.

혹은 `--project [path]`, `-p [path]` 옵션으로 직접 설정을 가지고 있는 json파일의 path를 선언해줄 수도 있습니다.

반대로 input file 이 주어진 채로 실행하면 `tsconfig.json` 파일을 무시합니다.

#### CLI 환경에서 했던 것을 tsconfig.json으로 해보기

먼저 프로젝트 루트에 `tsconfig.json`을 만들어줍니다.

```json
// tsconfig.json
{
  "files": ["t1.ts"],
  "compilerOptions": {
    "target": "es3"
  }
}
```

우리가 해왔던 것처럼 `t1.ts` 파일만을 대상으로 했고, 컴파일 옵션에서 타겟은 es3로 지정했습니다(컴파일 옵션을 안넣으면 기본으로 es3로 타겟을 잡기 때문에 명시해주시지 않아도 됩니다).

다시 터미널에서 `tsc`를 입력해보면 CLI 환경에서 컴파일 했던 것과 동일한 `t1.js`파일이 만들어집니다.

#### 옵션 설명

#### files, incldue, exclude

`files` 는 컴파일하고자 하는 파일들의 path를 array형태로 집어넣으면 됩니다.
`include`와 `exclude` 속성은 glob-like 패턴을 array형태로 받아 해당하는 path의 파일들을 컴파일대상에 포함시키거나(include) 제외(exclude)시킵니다.

`files`, `include` 속성에서 포함된 파일들이 호출하는 파일들도 컴파일에 포함됩니다.

glob은 path를 지정할 때 와일드카드 패턴을 지원해주는데요. 이를테면 `**/` 는 재귀적으로 모든 서브디렉토리를 포함하고 `**/*`는 모든 서브디렉토리와 그 하위의 파일들을 포함합니다.

#### 타입스크립트 컴파일러에서 지원하는 glob 와일드카드

> `*` matches zero or more characters (excluding directory separators)
>
> `?` matches any one character (excluding directory separators)
>
> `**/` recursively matches any subdirectory

만약 글롭패턴에서 `*` 또는 `.*` 가 포함되면 오로지 **지원하는 확장자**만 포함되게 됩니다.

#### 지원하는 확장자

기본적으로 `.ts`, `.tsx`(타입스크립트용 JSX), `.d.ts`는 기본적으로 포함이 되고 `.js`, `jsx`는 컴파일 옵션에서 `allowjs`를 `true`로 설정해주면 역시 컴파일 대상으로 포함됩니다.

만약 `files`와 `include`가 모두 지정되어있지 않으면 컴파일러는 `exclude`속성으로 제외된 대상외에 현재디렉토리와 서브디렉토리의 모든 **지원하는 확장자** 파일을 컴파일하게됩니다.
하지만 `files`와 `include`로 명시되어있는 경우 명시된 파일들만을 컴파일합니다.

#### outDir

`outDir`옵션은 컴파일되어 `.js`확장자를 가지게 된 파일들이 어디에 저장되는지를 지정해주는 옵션입니다. 당연히 `outDir`은 컴파일 폴더에서 제외됩니다. 그리고 `.ts`파일들을 다양한 디렉토리 밑에 뒀다면 컴파일 될 때 `outDir`에도 똑같은 구조로 들어가게 됩니다. 예를 들어볼게요.

`tsconfig.js`파일을 아래와 같이 설정해줍시다.

```json
{
  "include": ["./**/*"],
  "compilerOptions": {
    "target": "es3",
    "outDir": "compiled"
  }
}
```

제가 선택한 옵션은 es3를 아웃풋 타겟으로하고 모든 경로의 `.ts`, `.tsx`, `.d.ts` 파일을 포함하며 아웃풋 디렉토리로 `./compiled` 디렉토리를 지정한 것입니다.
그리고 `tsc`를 터미널에서 입력하면 다음과 디렉토리 구조가 다음과 같아집니다.

```
├── compiled
|  ├── dir1
|  |  └── t1.js
|  └── dir2
|     └── t2.js
├── dir1
|  └── t1.ts
├── dir2
|  └── t2.ts
└── tsconfig.json
```

컴파일 된후 자바스크립트의 파일 의존관계, 디렉토리 구조를 유지하기 위해서 이렇게 설정되는 듯합니다. 그래서 한개파일만이 프로젝트에 있을 경우 디렉토리 구조를 가져오지 않고 바로 `compiled`폴더 아래에 컴파일된 파일이 생성됩니다.

```
├── compiled
|  └── t1.js
├── dir1
|  └── t1.ts
├── dir2(empty)
└── tsconfig.json
```

#### exclude

`exclude`는 제외될 파일과 패스를 어레이로 넣습니다.

#### exclude를 쓸때 주의할 점1.

주의해야할 것은 `exclude`를 정의하는 순간 `outDir`로 지정한 디렉토리까지 compile 대상으로 포함된다는 것입니다. 따라서 `exclude`를 쓸때는 반드시 `outDir`로 지정한 디렉토리를 포함시켜야합니다.

#### exclude를 쓸때 주의할 점2.

또 중요한 것 하나는 `include`로 포함된 파일이 `exclude`에도 선언됐다면, 제외되지만 `files` 속성에서 선언된 파일들은 `exclude`에서 어떤걸 제외하든 무시하고 컴파일됩니다.

#### exclude를 쓸때 주의할 점3.

`exclude`에 포함되어 있는데도 컴파일 될 때가 있습니다. `include`에 포함된 폴더 아래 파일이 `exclude`된 파일을 참조하고 있는 경우에 그렇습니다.

#### 결론 : 복잡하지 않게 include 와 outDir만 씁시다

사실 그냥 `exclude`는 지정하지 않고 `include`와 `outDir`만 이용해도 전혀 문제없습니다. `include`에서 지정한 폴더들 외에는 컴파일 하지 않으니까요. 모든 복잡함은 `exclude`를 쓰는 순간 생겨버리니깐 가능한 간단하게 `include`와 `outDir`만 쓰면 됩니다.

#### extends : 설정 상속

`tsconfig.js`에 탑레벨 속성으로 `extends`를 쓸 수 있습니다. 이것은 다른 설정 파일을 상속해올 수 있어서 상속해올 설정파일 path를 값으로 써넣어주면 됩니다.

그렇게 되면 상속받는 설정은 `files`, `include`, `exclude`를 부모의 설정으로 덮어씁니다. 그리고 모든 상대경로는 그 경로가 쓰여진 파일로부터 해석됩니다.

#### compileOnSave : 저장 시 컴파일

탑레벨 속성으로 `compileOnSave`를 쓰게 되면 IDE에서 저장을 할 때마다 컴파일을 하게 됩니다.(vscode 1.35.1 버전에서 해봤는데 아직은 안되는 것 같습니다...)

#### 그외 옵션 설정

모든 옵션은 [TypeScript-Compiler Option](https://www.typescriptlang.org/docs/handbook/compiler-options.html)에서 확일할 수 있습니다. Option 명이 CLI 환경에서 넣을 때 기준이라 `tsconfig.json`파일에서 설정하실 때에는 --를 빼고 `compilerOptions`에 쓰면 됩니다.

#### 도움되는 영상

[Anders Hejlsberg - Introducing TypeScript](https://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript)

## 2. Babel

바벨은 자바스크립트 컴파일러다. 타입스크립트가 타입스크립트형식을 컴파일하여 자바스크립트로 만들듯이 바벨은 자바스크립트의 backwards compatible을 위한 컴파일, polyfill, minify, React, TypeScript 파일의 변환을 도와준다. 최신 버전의 자바스크립트 문법을 지원해주고 그것을 타겟브라우저에 맞게 컴파일 해주는 역할을 한다. 여러면에서 타입스크립트와 비슷한 역할을 한다.

#### Babel이 할수 있는 것

- 문법 변환 (ES6,ESNext 에서 ES5나 그 이전 버전으로)
- 타겟브라우저에서 없는 기능(객체나 프로토타입)을 Polyfill(by @babel/polyfill)
- 소스코드 변환 (JSX, TypeScript)

### 2.1. Babel 설치

#### 2.1.1. CLI 환경에서 설치와 컴파일

#### 설치

```bash
npm install --save-dev @babel/core @babel/cli
```

#### 컴파일(디렉토리 단위 : 특정 디렉토리 안의 파일(들)을 다른 디렉토리로)

```bash
# npx babel [inputDirectoryPath] --out-dir [outputDirectoryPath]
npx babel ./input --out-dir ./output
```

#### 컴파일(파일 단위 : 특정 파일을 다른 파일로)

```bash
# npx babel [inputFilePath] --out-file [outputFilePath]
npx babel script.js --out-file script-compiled.js
```

#### 컴파일(변경시마다 자동으로 컴파일)

--watch 또는 -w 옵션을 붙여준다.

```bash
npx babel script.js --watch --out-file script-compiled.js
```

기존 TypeScript로 컴파일 된 파일(`s2_ts_compiled/t1.js`)을 바벨로 컴파일해서 `s3_babel_compild`폴더로 넘어가게 해보자.

```bash
npx babel s2_ts_compiled/ --out-dir s3_babel_compiled/
```

다른 문구들과 함께 변환 된 파일을 표시해주는 문구가 뜬다.

```bash
s2_ts_compiled\t1.js -> s3_babel_compiled\t1.js
```

그러나 실제로 변한건 거의 없다(Beautify한 것처럼 그저 공백하나가 function 앞에 더 붙었을 뿐이다).

#### 2.1.2. Configuration 파일을 이용한 컴파일

사실 아무것도 변하지 않는 이유는 우리가 preset이나 plugin을 지정해주지 않았기 때문이다.
위에서 이미 `core`와 `cli`는 설치했지만 컴파일을 위한 최소한의 패키지였고, 브라우저 호환성을 위해서 `@babel/preset-env`와 `@babel/polyfill`도 설치해주자.

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env
npm install --save @babel/polyfill
```

그리고 프로젝트 루트에 `babel.config.js`파일을 만들어준다(바벨 7.x 이후로 바벨은 루트 디렉토리에서 `babel.config.js`를 검색한다). 그리고 아래의 내용을 입력해보자.

```js
// babel.config.js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
        ie: "11",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```

시험을 위해 `s2_ts_compiled/t2.js`파일을 만들어주었다.

```js
// s2_ts_compiled/t2.js
const concat = (a, b) => [...a, ...b];
let a = [1, 4, 6];
let b = [2, 3, 5];
console.log(concat(a, b));
```

그리고 다시

```bash
npx babel s2_ts_compiled/ --out-dir s3_babel_compiled/
```

을 해주면

```js
// s3_babel_compiled/t2.js
"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var concat = function concat(a, b) {
  return [].concat(_toConsumableArray(a), _toConsumableArray(b));
};

var a = [1, 4, 6];
var b = [2, 3, 5];
console.log(concat(a, b));
```

이렇게 ie에서도 쓸 수 있게 컴파일 해준다.
require가 많은데 이는 `usage`옵션을 `"entry"`값으로 보면 더 간단해진다.

```js
"use strict";

function _toConsumableArray(arr) {
  return (
    _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread()
  );
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (
    Symbol.iterator in Object(iter) ||
    Object.prototype.toString.call(iter) === "[object Arguments]"
  )
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var concat = function concat(a, b) {
  return [].concat(_toConsumableArray(a), _toConsumableArray(b));
};

var a = [1, 4, 6];
var b = [2, 3, 5];
console.log(concat(a, b));
```

typescript에선 어떨까? `s1_source/t3.ts`를 다음과 같이 만들어주었다.

```js
const concat = (a: number[], b: number[]) => [...a, ...b];
let a = [1, 4, 6];
let b = [2, 3, 5];
console.log(concat(a, b));
```

Arrow function, Spread operator 등 ES6 문법을 그대로 썼다.

`tsc`를 해주니

```js
var concat = function (a, b) {
  return a.concat(b);
};
var a = [1, 4, 6];
var b = [2, 3, 5];
console.log(concat(a, b));
```

똑같이 IE에서 돌아가고. 훨씬 깔끔하게 나왔다... 바벨보다 타입스크립트가 더 좋은 것 같다는 생각이 점점 든다...

### 정리가 필요한 구문

바벨 7.x에서 새로 나온 바벨은 현재 작업 디렉토리(pwd)로 기본 설정되는 "Root" 디렉토리의 개념을 가지고 있다. 프로젝트 전체 configuration을 위해, 바벨은 자동으로 이 루트 디렉토리에서 "babel.config.js"를 검색한다. 또는 명시적인 "configFile" 값을 사용하여 **기본 설정 파일 검색 수행**(default config file search behavior)을 커스터마이징 할 수도 있다.

프로젝트 전체의 설정 파일은 설정 파일의 실제 위치와 분리되어 있기 때문에 광범위하게 적용해야하는 설정에 이상적이다. 심지어 Babel 6.x에서는 굉장히 고통스러웠던 작업이었던 플러그인이나 프리셋을 node_modules이나 심볼릭 링크 된 패키지의 파일에도 쉽게 적용 할 수 있다.

때문에 가장 큰 단점은 monorepos에서 사용할 때 현재 디렉토리가 monorepo의 루트가 아닐 경우 더욱 고통스러울 수 있다는 것이다(monorepos가 뭘 의미하는지가 젤 고통스러운데... 찾아보니 여러 패키지가 중첩된 프로젝트에서 각 패키지 별로 바벨의 설정파일이 있을 때... 를 말하는 것 같다).

## 3. webpack

참고 : [webpack guides](https://webpack.js.org/guides/)

### 3.1. webpack 이란?

`webpack`은 최신 자바 스크립트 애플리케이션을 위한 static module bundler이다. `webpack`으로 앱을 처리하면 내부적으로 `dependency graph`(의존성 그래프)를 만드는데 이것은 우리 푸로젝트에서 필요한 모든 모듈을 맵핑하고 하나 혹은 그 이상의 번들파일로 생성해준다.

### 3.2. module 이란?

`modular programming`(모듈식 프로그래밍)에서 개발자는 프로그램을 모듈이라는 기능별 덩어리로 나눈다.

각 모듈은 전체 프로그램보다 작은 `surface`(컨텍스트정도로 이해하면 될듯)를 갖고 있어 검증, 디버깅, 테스팅이 쉽다. 잘 작성된 모듈은 견고한 추상화(solid abstractions)와 캡슐화 경계(encapsulation boundaries)를 제공하므로, 각 모듈은 전체프로그램 내에서 일관된 디자인과 명확한 목적을 갖게 된다.

Node.js는 거의 처음부터 moudlar programming을 지원해왔다. 하지만 웹상에서 모듈 지원은 느리다(브라우저별로 접목시키는 속도가 다르다). 웹상에서 모듈식 자바스크립트를 지원하는 다양한 툴들이 있지만 이점이 많은 만큼 한계도 많다. webpack은 이러한 시스템에서 배운 교훈을 토대로 프로젝트의 모든 파일에 모듈 개념을 적용할 수 있게 개발되었다.

#### 웹팩 모듈이란(What is a webpack Module)

Node.js의 모듈과 대조적으로 webpack 모듈은 자신의 dependency를 다양한 방법으로 표현할 수 있다.

- ES2015 의 `import`
- CommonJS 의 `require()`
- AMD 의 `define`, `require`
- css/sass/less파일 내의 `@import`
- stylesheet(`url(...)`)나 html(`<img src=...>`)에서의 이미지 url

#### 웹팩에서 지원되는 모듈 타입(Supported Module Types in webpack)

webpack은 `Loader`를 통해 다양한 언어와 preprocessor로 작성된 모듈을 지원한다. `Loader`는 non-javascript 모듈을 처리하고 이 dependency들을 번들에 포함시키는 방법을 webpack에게 전달한다. 즉, 모듈 번들링의 구체적 명세이다.

webpack 커뮤니티에는 다양한 인기언어와 언어 processor를 위한 로더들을 만들어져 있는데 그 예로 다음과 같은 것이 있다.

- CoffeeScript
- TypeScript
- ESNext(Babel)
- Sass
- Less
- Stylus

그 외에도 많다. 전반적으로 webpack은 사용자들의 커스터마이징을 위한 강력하고 풍부한 API를 제공하고 어떤 stack과 testing, production workflow를 갖더라도 적용할 수 있게 한다.

버전 4.0.0 부터 웹팩은 프로젝트를 번들링 하기 위해 설정파일이 필요 없지만, 우리의 용도에 맞게 설정도 가능하다.

### 3.3 core concepts

웹팩을 시작하기 위해선 다음과 같은 핵심 개념을 알고 가야한다.

- Entry
- Output
- Loaders
- Plugins
- Mode
- Browser Compatibility

#### Entry

**entry point**은 내부 dependency graph를 그리기 위해 웹팩이 처음 사용할 모듈(그러니까 index.js, app.js와 같은 파일)이 무엇인지를 가리키는 것이다. 우리가 직접 설정해주는 것. 웹팩은 entry point 파일이 어떤 모듈이나 라이브러리에 직간접적으로 의존하고 있는지 알아낸다.

기본 값은 `./src/index.js`인데 우리가 직접 하나 또는 그 이상의 entry point를 설정할 수 있다. 방법은 webpack 설정 파일에서 `entry`속성에 쓰는 것이다.

```js
// webpack.config.js
module.exports = {
  entry: "./path/to/my/entry/file.js",
};
```

#### Output

**output** 속성은 웹팩에게 어디에 번들된 파일을 생성하고, 이름을 어떻게 지을 것인지를 가리킨다. 기본 값은 `./dist/main.js`이 번들된 메인 아웃풋이고 `./dist`가 그 외에 생성된 모든 파일이 들어가는 폴더이다. 이 역시 우리가 설정 파일에서 명시적으로 선언해줄 수 있다.

```js
// webpack.config.js
const path = require("path");
module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
};
```

위의 예시에서 우리는 `output.filename`과 `output.path`속성을 썼는데 이는 웹팩에게 어떤 이름으로 어디에 저장할 건지를 말해준다. `path`모듈은 파일 경로를 조작하기 위해서 가져온 Node.js의 모듈이다. `output`의 다른 속성들에 대해 궁금하면 [여기](https://webpack.js.org/concepts/output/)를 참고하자.

#### Loaders

순수한 `webpack`은 자바스크립트와 JSON파일만을 이해한다. `Loaders`는 웹팩이 다른 타입의 파일을 처리할 수 있게 하고 유효한 모듈(우리의 앱에서 사용되고 dependency graph에 추가될 수 있게)로 바꾸게 해준다.

**잠깐 다른 얘기** : `import`로 어떤 타입의 모듈(이를테면 css)도 불러올 수 있는 기능은 오로지 웹팩에서만 가능한 기능이다. 이러한 언어의 확장이 개발자들로 하여금 종속성 그래프를 보다 정확하게 그릴 수 있게 한다.

설정에서 `loaders`는 다음 두 가지 상위(high level) 속성을 갖는다.

1. `test` 속성 : 어떤 파일 또는 파일들이 변환되어야 하는지.
2. `use` 속성 : 어떤 loader가 변환에 사용되어야 하는지.

```js
// webpack.config.js
const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
```

위의 설정에서 `rules`의 속성으로 정의 되었다. 이것은 단일 모듈에 대한 두 속성(`test`,`use`)으로 이루어져있다. 위 속성은 webpack에게 이렇게 말한다.

> 웹팩 컴파일러야! 우연히 '.txt' 따위의 파일을 `require()`나 `import` statement안에서 발견하게 되면 번들에 추가하기 전에 `raw-loader`로 변환하렴.

**중요** : 웹팩 설정파일에 룰을 정의할 때 꼭 `module.rules`에 써야 한다는 걸 기억하자 `rules`가 아니다. 우리를 위해서 웹팩이 경고를 띄워주긴 한다.

**중요** : 파일 매칭을 위해서 정규표현식을 쓸 때 `/\.txt$/`의 정규표현식 리터럴을 쓰자. `'/\.txt$/'`나 `"/\.txt$/"`가 아니다. 따옴표로 묶은 것은 절대경로 '.txt'의 단일 파일을 의미한다.

loader에 대해 더 알고 싶으면 [여기](https://webpack.js.org/concepts/loaders/)를 참조하자.

#### Plugins

로더가 특정 타입의 모듈을 변환하는데 쓰이는 반면에 플러그인은 번들 최적화(bundle optimization), 에셋 관리(asset management), 환경변수 주입(injection of environment variables)과 같은 보다 광범위한 작업들에 사용될 수 있습니다.

[plugin interface](https://webpack.js.org/api/plugins/)에서 플러그인 api가 웹팩의 가능성을 확장시키는 사용법을 볼 수 있습니다.

플러그인을 사용하기 위해선 우리는 이것을 `require()`하고 `plugins` 배열에 집어 넣어야 합니다. 플러그인은 대부분 옵션을 통해 커스터마이징 할 수 있습니다. 우리는 플러그인을 다양한 목적으로 설정파일에서 여러번 쓸 수 있기 때문에 이것을 생성할 때 인스턴스 형태로 `new`를 붙여 생성해야 합니다.

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
const webpack = require("webpack"); //to access built-in plugins

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

위의 예시에서 `html-webpack-plugin`은 여러분의 앱의 HTML 파일을 자동으로 생성된 번들들을 주입시켜 새로 생성해줍니다.

[list of plugins](https://webpack.js.org/plugins/) 에서 웹팩이 제공하는 더 많은 플러그인들을 만날 수 있다.

웹팩 설정에서 플러그인을 사용하는 것은 간단합니다. 그러나 더 탐구할 가치가 있는 사용 사례가 많이 있습니다. [여기](https://webpack.js.org/concepts/plugins/)에서 볼수 있습니다.

#### Mode

`mode`파라미터를 `development`, `production`, `none`으로 설정하는 것으로 여러분은 각 환경에 맞는 웹팩의 빌트인 최적화를 사용할 수 있습니다. 기본 값은 `production`입니다. 모드 설정에 대해서는 [여기](https://webpack.js.org/configuration/mode/)를 참고해 각 값에 대해 어떤 최적화가 이루어지는지 참고합시다.

#### Browser Compatibility

웹팩은 ES5-compliant를 가지는 모든 브라우저를 지원합니다(IE8과 그 아래버전은 ES5-compliant를 지원하지 않아서 지원안됩니다). 웹팩은 `import()`와 `require.ensure()`를 위해 `Promise`가 필요합니다. 만약 우리가 더 오래된 브라우저를 지원하고 싶다면 우리는 저러한 expression을 쓰기 전에 [polyfill](https://webpack.js.org/guides/shimming/)을 불러와야합니다.

## 4. Final

이제 세가지 컴파일 및 번들링 툴을 알아봤으니 TypeScript로 시작되어 babel, webpack으로 가는 과정을 만들어보려한다.

먼저 `s1_source/`폴더에 다음과 같은 세가지 타입스크립트 파일을 만들었다.

```ts
// s1_source/Vehicle.ts
import Person from "./Person";
export default class Vehicle {
  private name: string;

  private passengers: Array<Person>;
  constructor(name: string) {
    this.name = name;
    this.passengers = [];
  }
  getName(): string {
    return this.name;
  }
  boarding(person: Person): void {
    this.passengers.push(person);
    console.log(...this.passengers);
  }
}
```

```ts
// s1_source/Person.ts
export default class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  sayHello(): void {
    console.log(`My Name is ${this.name}`);
  }
}
```

```ts
// s1_source/App.ts
import Vehicle from "./Vehicle";
import Person from "./Person";
let car = new Vehicle("Porsche");
car.boarding(new Person("JeGwan"));
console.log(car.getName());
```

의존성 관계는 `Person -> Vehicle -> App <- Person` 이런식이다.

### 4.1 TypeScript Compile

이미 `tsconfig.json`에서 설정을 해놓았으므로 `tsc`를 터미널에 친다.

```json
// tsconfig.json
{
  "include": ["s1_source"],
  "compilerOptions": {
    "target": "es3",
    "outDir": "s2_ts_compiled"
  },
  "compileOnSave": true
}
```

바뀐 파일들은 `s2_ts_compiled/`에 저장되며 다음과 같다.

```js
// s2_source/Vehicle.js
"use strict";
exports.__esModule = true;
var Vehicle = /** @class */ (function () {
  function Vehicle(name) {
    this.name = name;
    this.passengers = [];
  }
  Vehicle.prototype.getName = function () {
    return this.name;
  };
  Vehicle.prototype.boarding = function (person) {
    this.passengers.push(person);
    console.log.apply(console, this.passengers);
  };
  return Vehicle;
})();
exports["default"] = Vehicle;
```

```js
// s2_source/Person.js
"use strict";
exports.__esModule = true;
var Person = /** @class */ (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype.getName = function () {
    return this.name;
  };
  Person.prototype.sayHello = function () {
    console.log("My Name is " + this.name);
  };
  return Person;
})();
exports["default"] = Person;
```

```js
// s2_source/App.js
"use strict";
exports.__esModule = true;
var Vehicle_1 = require("./Vehicle");
var Person_1 = require("./Person");
var car = new Vehicle_1["default"]("Porsche");
car.boarding(new Person_1["default"]("JeGwan"));
console.log(car.getName());
```

### 4.2 Babel Compile

바벨은 `npx babel s2_ts_compiled/ --out-dir s3_babel_compiled/`만 해주면된다. 바벨 컴파일되면서 달라진 것은 없었다. 파일을 `Beautify`하는 것(띄어쓰기나 줄바꿈으로 개발자가 보기 편하게 바꿔주는 것, 내용은 변화가 없다) 밖에 안됐다.

아무리 생각해도 바벨과 타입스크립트를 동시에 쓸 필요가 없이 그냥 타입스크립트를 사용하면 될 것 같다.

### 4.3 Webpack Bundling

먼저 `webpack.config.js`파일을 다음과 같이 설정해주자. 간단히 엔트리, 아웃풋만 설정해준 것이다.

```js
// webpack.config.js
const path = require("path");
module.exports = {
  entry: "./s3_babel_compiled/App.js",
  output: {
    path: path.resolve(__dirname, "s4_webpack_bundled"),
    filename: "app.bundle.js",
  },
};
```

그 다음 CLI 웹팩을 이용할 건데 `npm install --save-dev webpack-cli`로 설치해주자.

웹팩 번들링의 옵션은 이미 `webpack.config.js`파일에 있으므로 우리는 실행만 하면된다.
터미널에서 아래의 명령어를 입력해주자.

```bash
npx webpack
```

#### 결과

```bash
Hash: 999fe847b5702cc55874
Version: webpack 4.35.2
Time: 289ms
Built at: 2019-07-04 11:36:48 AM
        Asset      Size  Chunks             Chunk Names
app.bundle.js  1.54 KiB       0  [emitted]  main
Entrypoint main = app.bundle.js
[0] ./s3_babel_compiled/App.js 242 bytes {0} [built]
[1] ./s3_babel_compiled/Vehicle.js 430 bytes {0} [built]
[2] ./s3_babel_compiled/Person.js 353 bytes {0} [built]
```

성공적으로 번들링이 되었다.

`s4_webpack_bundled/`밑에 하나의 `app.bundle.js`파일이 만들어졌다.

```js
!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var o = n(1),
      r = n(2),
      u = new o.default("Porsche");
    u.boarding(new r.default("JeGwan")), console.log(u.getName());
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var o = (function () {
      function e(e) {
        (this.name = e), (this.passengers = []);
      }
      return (
        (e.prototype.getName = function () {
          return this.name;
        }),
        (e.prototype.boarding = function (e) {
          this.passengers.push(e), console.log.apply(console, this.passengers);
        }),
        e
      );
    })();
    t.default = o;
  },
  function (e, t, n) {
    "use strict";
    t.__esModule = !0;
    var o = (function () {
      function e(e) {
        this.name = e;
      }
      return (
        (e.prototype.getName = function () {
          return this.name;
        }),
        (e.prototype.sayHello = function () {
          console.log("My Name is " + this.name);
        }),
        e
      );
    })();
    t.default = o;
  },
]);
```

보면 알겠지만 `minify`를 하고 의존관계의 파일을 하나로 묶었다(`bundle`).

잘 실행 되는지 터미널에서 `node`로 실행해보았다.

```bash
$ node s4_webpack_bundled/app.bundle.js
e { name: 'JeGwan' }
Porsche
```

잘 된다.

웹에서 시험해보기 위해 `s4_webpack_bundled/index.html`파일을 만들었다.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <h1>ts-babel-webpack</h1>
    <script src="app.bundle.js"></script>
  </body>
</html>
```

IE11에서 열어보았더니 잘 된다.

이로써 TypeScript, Babel, Webpack을 공부해보았다.

그런데 이 모든 과정이 웹팩만으로도 될 것 같다(Loader의 개념이 있지 않은가!). 즉, TypeScript 컴파일하는 부분은 웹팩용 타입스크립트 로더를 설치하고 `webpack.config.js`에 해당 로더를 사용하겠다는 설정을 써주면 된다.

## 5. Webpack만으로 다하기

### 5.1 typescript, ts-loader 설치

```bash
npm install --save-dev typescript ts-loader
```

`tsconfig.json` 파일에 약간의 수정을 가하자

```json
{
  "include": ["s1_source"],
  "compilerOptions": {
    "outDir": "./s4_webpack_bundled/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  },
  "compileOnSave": true
}
```

- include : s1_source 디렉토리 밑의 파일들이 컴파일 대상
- outDir : 컴파일된 파일이 저장되는 directory
- noImplicitAny : any 타입을 쓰게 되면 에러를 던진다!
- module : 모듈이 어떤 버전의 자바스크립트를 쓰는가?
- target : 변환될 타겟은 ECMAScript 몇 버전인가?
- jsx : .tsx 파일에서 JSX를 지원한다.
- allowJs : .js 파일도 컴파일하게 한다.
- compileOnSave : 저장시 IDE에 신호를 보내 컴파일을 자동으로 하게 한다. VS2015, TypeScript 1.8.4, atom-typescript 플러그인에서 지원

`webpack.config.js`에도 `ts-loader`를 적용해야한다.

```js
const path = require("path");

module.exports = {
  entry: "./s1_source/App.ts", // 번들링할 목표 파일, 이 파일이 가지는 의존성관계를 모두 불러와 번들링한다.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
        // 위에서 언급했던 것처럼 loader는 module.rules에 배열로 들어가며 대상 파일을 가리키는 test 와 그 로더를 가리키는 use 속성을 쓴다.
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // resolve 순서 여기서는 .tsx가 가장 우선 resolve 된다. 만약 같은 이름의 3개파일이 있다면 .tsx확장자로 된 파일만 처리하고 그다음은 스킵한다.
  },
  output: {
    filename: "app.bundle.js",
    path: path.resolve(__dirname, "s4_webpack_bundled"),
  },
};
```

그리고 다음을 실행한다.

```bash
npx webpack --config webpack.config.js
```

결과

```
Hash: 634902299d8226422a9c
Version: webpack 4.35.2
Time: 1113ms
Built at: 2019-07-04 3:33:00 PM
        Asset      Size  Chunks             Chunk Names
app.bundle.js  1.38 KiB       0  [emitted]  main
Entrypoint main = app.bundle.js
[0] ./s1_source/App.ts + 2 modules 938 bytes {0} [built]
    | ./s1_source/App.ts 167 bytes [built]
    | ./s1_source/Vehicle.ts 429 bytes [built]
    | ./s1_source/Person.ts 342 bytes [built]
```

잘 동작됨을 확인할 수 있다.
