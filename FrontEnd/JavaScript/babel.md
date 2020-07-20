# 바벨이란 무엇인가?

Babel은 ECMAScript 2015+ 코드를 현재 또는 이전 버전의 브라우저 또는 환경에서 JavaScript의 하위 호환성 버전으로 변환하는 데 주로 사용되는 Toolchain이다.

## 컴파일러란 무엇인가?

어떠한 "소스코드"를 다른 형태의 것으로 변환해주는 툴.
예를들어 다음의 LISP-LIKE 코드를 C-LIKE 코드로 변환하는 것을 예로들 수 있다.

```LISP
(add 2 2)
```

```C
add(2, 2)
```

### 컴파일러가 변환하는 단계

대부분의 컴파일러는 구문 분석, 변환 및 코드 생성의 세 가지 기본 단계로 분류된다.

#### 1. Parsing : row code를 보다 추상적인 표현으로 바꾼다. 다음 두단계로 이루어져있다.

1.1. Lexical Analysis : row code를 가져와 분리하고 토큰이라고 불리는 것으로 나눈다.
토큰은 토크나이저 혹은 Lexer 라고 불리우는 것으로 바꾼다. 토큰은 문법적으로 독립된 요소들을 나타내는 아주 작은 객체들로 이루어진 어레이이다. 이것은 숫자, 레이블, 구두법(!,.;), 연산자등 무엇이든 될 수 있다.

1.2. Syntactic Analysis : 문법적 분석은 이러한 코튼들을 문법관계에 따라 재형성(reformat)한다. 이것은 intermediate representation 혹은 Abstract Syntax Tree(AST)라고 알려져 있다. AST는 코드 작업을 쉽게 할 수 있고 우리에게 많은 정보를 알려주는 방식으로 코드를 나타내는 깊이 중첩된(deeply nested) 객체다.

다음과 같은 코드에 대해서

```
(add 2 (subtract 4 2))
```

토큰은 아래와 같이 보일 것이다.

```js
[
  { type: "paren", value: "(" },
  { type: "name", value: "add" },
  { type: "number", value: "2" },
  { type: "paren", value: "(" },
  { type: "name", value: "subtract" },
  { type: "number", value: "4" },
  { type: "number", value: "2" },
  { type: "paren", value: ")" },
  { type: "paren", value: ")" },
];
```

Abstract Syntax Tree는 다음과 같다.

```js
  {
    type: 'Program',
    body: [{
      type: 'CallExpression',
      name: 'add',
      params: [{
        type: 'NumberLiteral',
        value: '2',
      }, {
        type: 'CallExpression',
        name: 'subtract',
        params: [{
          type: 'NumberLiteral',
          value: '4',
        }, {
          type: 'NumberLiteral',
          value: '2',
        }]
      }]
    }]
  }
```

#### 2. Transformation

여기에서는 AST로 부터 넘겨 받은 것을 같은 언어 혹은 새로운언어로 변환할 수 있다. (왜냐면 AST는 한 언어의 문법이 아닌, 새로운 상징체계로 소스코드의 구조를 변환해 놓은 것이기 때문에)
AST는 같은 객체 여러개가 중첩되어 있는데, 그들의 타입이 무엇인지를 프로퍼티로 가지고 있다. 이러한 객체 하나 하나를 AST Node라 한다. AST를 변환할 때 우리는 노드를 프로퍼티를 더하거나 삭제하거나 대체하는 방식을통해 조작할수도 있고, 새로운 노드를 추가하거나 삭제하거나 할수도 있다. 혹은 AST그대로 두거나 AST를 바탕으로 전체적으로 새롭게 만들 수도 있다.
Traverse : 이 모든 노드를 탐색하려면, 우리는 그 노드를 전체적으로 훑어볼 수 있어야 한다. 이 통과 프로세스는 AST를 깊이 우선적으로 탐색한다.
Visitior : visitor는 노드의 타입에 해당하는 메소드를 가진 객체이다. AST를 횡단하며(traverse) 우리가 매칭되는 타입의 노드를 **enter**할 때 visitor의 메소드가 호출된다. 그리고 이를 위해서 노드 자기 자신과 부모노드를 변수로 전달 한다.

```js
var visitor = {
  NumberLiteral(node, parent) {},
  CallExpression(node, parent) {},
};
```

그런데 traverse down(더 아래로 탐색)을 하다가 더 이상 자식을 갖지 않을 때, 우리는 다시 위로 올라와야 한다. 즉 enter가 된 뒤에는 **exit**으로 위로 올라와야 한다.
AST 예시에 맞게 구조를 그리면 이렇다.

```
-> Program (enter)
  -> CallExpression (enter)
    -> Number Literal (enter)
    <- Number Literal (exit)
    -> Call Expression (enter)
       -> Number Literal (enter)
       <- Number Literal (exit)
       -> Number Literal (enter)
       <- Number Literal (exit)
    <- CallExpression (exit)
  <- CallExpression (exit)
<- Program (exit)
```

따라서 visitor도 다음과 같이 수정되어야 한다.

```js
var visitor = {
  NumberLiteral: {
    enter(node, parent) {},
    exit(node, parent) {},
  },
};
```

3. Code Generation : 변환된 코드로 부터 새로운 코드로 바꾼다.
   마지막은 코드 생성이다. 가끔 컴파일러는 변형단계에서 뭔가 더하기도 하지만, 대부분은 이단계에서 AST를 코드블럭으로 Stringify 하는 것이다. 코드제너레이터는 여러가지 방법으로 동작하지만 대개는 AST를 가져와서 모든 노드를 하나의 긴 코드문장으로 바꿀 때까지 재귀식으로 호출한다.

### TOKENIZER examle

그대로 따왔는데 보면 알겠지만 **소스코드의 스트링을 인풋으로 받아** 몇가지 정규표현식으로 이 값이 뭘의미하는지 가려서 tokens 어레이에 집어넣는 것이다. 아래의 경우는 아주 단순한 LISP like 코드를 바꾸는 거라서 경우의 수가 얼마 되지 않는다.

```js
function tokenizer(input) {
  // A `current` variable for tracking our position in the code like a cursor.
  let current = 0;

  // And a `tokens` array for pushing our tokens to.
  let tokens = [];

  // We start by creating a `while` loop where we are setting up our `current`
  // variable to be incremented as much as we want `inside` the loop.
  //
  // We do this because we may want to increment `current` many times within a
  // single loop because our tokens can be any length.
  while (current < input.length) {
    // We're also going to store the `current` character in the `input`.
    let char = input[current];

    // The first thing we want to check for is an open parenthesis. This will
    // later be used for `CallExpression` but for now we only care about the
    // character.
    //
    // We check to see if we have an open parenthesis:
    if (char === "(") {
      // If we do, we push a new token with the type `paren` and set the value
      // to an open parenthesis.
      tokens.push({
        type: "paren",
        value: "(",
      });

      // Then we increment `current`
      current++;

      // And we `continue` onto the next cycle of the loop.
      continue;
    }

    // Next we're going to check for a closing parenthesis. We do the same exact
    // thing as before: Check for a closing parenthesis, add a new token,
    // increment `current`, and `continue`.
    if (char === ")") {
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    // Moving on, we're now going to check for whitespace. This is interesting
    // because we care that whitespace exists to separate characters, but it
    // isn't actually important for us to store as a token. We would only throw
    // it out later.
    //
    // So here we're just going to test for existence and if it does exist we're
    // going to just `continue` on.
    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    // The next type of token is a number. This is different than what we have
    // seen before because a number could be any number of characters and we
    // want to capture the entire sequence of characters as one token.
    //
    //   (add 123 456)
    //        ^^^ ^^^
    //        Only two separate tokens
    //
    // So we start this off when we encounter the first number in a sequence.
    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      // We're going to create a `value` string that we are going to push
      // characters to.
      let value = "";

      // Then we're going to loop through each character in the sequence until
      // we encounter a character that is not a number, pushing each character
      // that is a number to our `value` and incrementing `current` as we go.
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // After that we push our `number` token to the `tokens` array.
      tokens.push({ type: "number", value });

      // And we continue on.
      continue;
    }

    // We'll also add support for strings in our language which will be any
    // text surrounded by double quotes (").
    //
    //   (concat "foo" "bar")
    //            ^^^   ^^^ string tokens
    //
    // We'll start by checking for the opening quote:
    if (char === '"') {
      // Keep a `value` variable for building up our string token.
      let value = "";

      // We'll skip the opening double quote in our token.
      char = input[++current];

      // Then we'll iterate through each character until we reach another
      // double quote.
      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      // Skip the closing double quote.
      char = input[++current];

      // And add our `string` token to the `tokens` array.
      tokens.push({ type: "string", value });

      continue;
    }

    // The last type of token will be a `name` token. This is a sequence of
    // letters instead of numbers, that are the names of functions in our lisp
    // syntax.
    //
    //   (add 2 4)
    //    ^^^
    //    Name token
    //
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";

      // Again we're just going to loop through all the letters pushing them to
      // a value.
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // And pushing that value as a token with the type `name` and continuing.
      tokens.push({ type: "name", value });

      continue;
    }

    // Finally if we have not matched a character by now, we're going to throw
    // an error and completely exit.
    throw new TypeError("I dont know what this character is: " + char);
  }

  // Then at the end of our `tokenizer` we simply return the tokens array.
  return tokens;
}
```

### PARSER example

recursion 때문에 복잡해보일 수도 있는데 여튼 `tokens`어레이를 받아서 한 행씩 보며 타입과 벨류 오브젝트를 내뱉는다. 그리고 `CallExpression`을 만났을 때 마지막 프로퍼티에 `params` 를 만들어줘서 `nested`된 구조가 잘 되게 만들어주는 역할이다.

```js
function parser(tokens) {
  // Again we keep a `current` variable that we will use as a cursor.
  let current = 0;

  // But this time we're going to use recursion instead of a `while` loop. So we
  // define a `walk` function.
  function walk() {
    // Inside the walk function we start by grabbing the `current` token.
    let token = tokens[current];

    // We're going to split each type of token off into a different code path,
    // starting off with `number` tokens.
    //
    // We test to see if we have a `number` token.
    if (token.type === "number") {
      // If we have one, we'll increment `current`.
      current++;

      // And we'll return a new AST node called `NumberLiteral` and setting its
      // value to the value of our token.
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    // If we have a string we will do the same as number and create a
    // `StringLiteral` node.
    if (token.type === "string") {
      current++;

      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    // Next we're going to look for CallExpressions. We start this off when we
    // encounter an open parenthesis.
    if (token.type === "paren" && token.value === "(") {
      // We'll increment `current` to skip the parenthesis since we don't care
      // about it in our AST.
      token = tokens[++current];

      // We create a base node with the type `CallExpression`, and we're going
      // to set the name as the current token's value since the next token after
      // the open parenthesis is the name of the function.
      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      // We increment `current` *again* to skip the name token.
      token = tokens[++current];

      // And now we want to loop through each token that will be the `params` of
      // our `CallExpression` until we encounter a closing parenthesis.
      //
      // Now this is where recursion comes in. Instead of trying to parse a
      // potentially infinitely nested set of nodes we're going to rely on
      // recursion to resolve things.
      //
      // To explain this, let's take our Lisp code. You can see that the
      // parameters of the `add` are a number and a nested `CallExpression` that
      // includes its own numbers.
      //
      //   (add 2 (subtract 4 2))
      //
      // You'll also notice that in our tokens array we have multiple closing
      // parenthesis.
      //
      //   [
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'add'      },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: '('        },
      //     { type: 'name',   value: 'subtract' },
      //     { type: 'number', value: '4'        },
      //     { type: 'number', value: '2'        },
      //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
      //     { type: 'paren',  value: ')'        }, <<< Closing parenthesis
      //   ]
      //
      // We're going to rely on the nested `walk` function to increment our
      // `current` variable past any nested `CallExpression`.

      // So we create a `while` loop that will continue until it encounters a
      // token with a `type` of `'paren'` and a `value` of a closing
      // parenthesis.
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        // we'll call the `walk` function which will return a `node` and we'll
        // push it into our `node.params`.
        node.params.push(walk());
        token = tokens[current];
      }

      // Finally we will increment `current` one last time to skip the closing
      // parenthesis.
      current++;

      // And return the node.
      return node;
    }

    // Again, if we haven't recognized the token type by now we're going to
    // throw an error.
    throw new TypeError(token.type);
  }

  // Now, we're going to create our AST which will have a root which is a
  // `Program` node.
  let ast = {
    type: "Program",
    body: [],
  };

  // And we're going to kickstart our `walk` function, pushing nodes to our
  // `ast.body` array.
  //
  // The reason we are doing this inside a loop is because our program can have
  // `CallExpression` after one another instead of being nested.
  //
  //   (add 2 2)
  //   (subtract 4 2)
  //
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  // At the end of our parser we'll return the AST.
  return ast;
}
```

### TRAVERSER

트래버서는 구조를 `enter`, `exit`하며 도는데 이게 왜필요한지는 아직 모르겠다.

```js
function traverser(ast, visitor) {
  // A `traverseArray` function that will allow us to iterate over an array and
  // call the next function that we will define: `traverseNode`.
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  // `traverseNode` will accept a `node` and its `parent` node. So that it can
  // pass both to our visitor methods.
  function traverseNode(node, parent) {
    // We start by testing for the existence of a method on the visitor with a
    // matching `type`.
    let methods = visitor[node.type];

    // If there is an `enter` method for this node type we'll call it with the
    // `node` and its `parent`.
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    // Next we are going to split things up by the current node type.
    switch (node.type) {
      // We'll start with our top level `Program`. Since Program nodes have a
      // property named body that has an array of nodes, we will call
      // `traverseArray` to traverse down into them.
      //
      // (Remember that `traverseArray` will in turn call `traverseNode` so  we
      // are causing the tree to be traversed recursively)
      case "Program":
        traverseArray(node.body, node);
        break;

      // Next we do the same with `CallExpression` and traverse their `params`.
      case "CallExpression":
        traverseArray(node.params, node);
        break;

      // In the cases of `NumberLiteral` and `StringLiteral` we don't have any
      // child nodes to visit, so we'll just break.
      case "NumberLiteral":
      case "StringLiteral":
        break;

      // And again, if we haven't recognized the node type then we'll throw an
      // error.
      default:
        throw new TypeError(node.type);
    }

    // If there is an `exit` method for this node type we'll call it with the
    // `node` and its `parent`.
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  // Finally we kickstart the traverser by calling `traverseNode` with our ast
  // with no `parent` because the top level of the AST doesn't have a parent.
  traverseNode(ast, null);
}
```

### TRANSFORMER

여기서는 AST를 받아 traverser로 넘기며 새로운 ast를 생성할 것이다.
트래버서는 미들웨어 느낌인데 다음 AST를 생성하기위해 탐색하는 녀석이라고 보면된다. 우리는 새로만드는 AST의 컨텍스트를 기존 ast에 삽입해서 새로운 AST의 구조를 준비해놓고 마지막에 탑레벨의 컨텍스트를 newAst로 리턴하는 것이다. 눈에 띄었던 것은 여기서부턴 문법적으로 한 statement에게 세미콜론을 붙인다거나 하는 일을 위해서 statement와 expression을 구분하는 것이다.

### CODE GENERATOR

이제 새롭게 생성된 AST를 바탕으로 코드제너레이터는 node의 타입에 따라 문법적으로 string을 생성하고 리턴한다. 이렇게 컴파일이 끝난다.

## 바벨에서 할수 있는것

1. 문법 변환(Transform syntax)
2. 폴리필 (`@babel/polyfill`,이를 통해 최신 자바스크립트 문법을 하위 버전의 환경에서 쓸 수 있게 바꿔 해준다!)
3. 소스코드 변환(Source code transformations(codemods))

## 변환 형식을 어떻게 지정하는가?

[Babel plugins](https://babeljs.io/docs/en/plugins#presets) 에 가서 각 기능 별로 어떻게 변환하는지 볼 수 있다. ES단계별 문법 변환, 미니파이어, 리액트, 타입스크립트 등을 볼 수 있다!
트랜스폼 블러그인은 자동적으로 문법 플러그인을 포함하기 때문에 변환과정에서 오류를 집어내줄 것이다.

### 변환 순서?

이게 아주 **중요**하다.
위에서 다루었던 최상위 노드가 Program이었다.
요약하자면

1. Plugins 는 Prests에 앞선다
2. Plugin은 순서대로 실행된다.
3. Preset은 역순으로 실행된다.

[Babel User Guide](https://babeljs.io/docs/en/usage) 여기보면서 따라하는중.

- 변환은 cli에서 직접 명령어로 할수도 있다.
- 이 때 옵션을 지정해줄 수 있다.
- plugin은 바벨이 어떻게 코드를 변환시켜야하는지를 가리키는 작은 JS프로그램이다.
- 근데 이렇게 하나하나 지정해가기 보다는 미리 정의된 plugin set인 **preset** 이용할 수도 있다.
- 근데 매번 그럴 필요 없이 configuration 파일을 생성할 수도 있다.

### configuration 설정 파일

프로젝트 루트에 `babel.config.js`라는 파일을 만든다.

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
      },
    },
  ],
];

module.exports = { presets };
```

이렇게 해놓고 `npx babel src --out-dir lib` 을 터미널에 입력하면 바벨은 자동으로 설정파일을 검사하고 있게 되면 해당 설정대로 컴파일하게 된다.

그런데 이렇게 해도 ES6에서 나온 프로토타입 메소드는 만들어줘야할 필요성이 있다. 이럴때
`@babel/polyfill`을 쓴다.

configuration 파일에서는 env preset이 `useBuiltIns` 옵션을 지원하기 때문에 이 값을 `usage`로 바꾸면 된다.

```js
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
```
