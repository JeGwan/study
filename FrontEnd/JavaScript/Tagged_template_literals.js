// Tagged template literals 은 backstick으로 이루어진 템플릿 리터럴을 약속된 형식으로 함수에 집어넣는 문법입니다.

// 태그 템플릿 리터럴로 함수에 인자를 집어넣으면 어떻게 되는지 ...args라는 인자로 받아서 로그를 찍어보겠습니다.
function ttl(...args) {
  console.log(args)
}
// 일단은 그냥 string만 넣어보겠습니다.
ttl`Hello!`
// [ [ 'Hello!' ] ]
// 첫번째 인자는 스트링으로 이루어진 배열입니다. 왜 배열일까요?

ttl`${true}`
// [ [ '', '' ], true ]
// 중간에 변수를 넣으면 왜 첫번째 인자가 배열인지 알 수 있습니다.
// 변수는 두번째 인자부터 차례대로 할당되고, 변수로 잘린 문자열이 첫번째 인자의 배열에 차례대로 들어갑니다.

ttl`that ${ "제과니" } is ${ 32 } years old`
// [ [ 'that ', ' is ', ' years old' ], '제과니', 32 ]
// 그래서 이런 결과가 나오는 겁니다.

function advancedTtl(strings, name, age){
  return {name, age}
}

let me = advancedTtl`내 이름은 ${"오제관"}이에요. 나이는 ${32}살이에요`
console.log(me)
// { name: '오제관', age: 32 }
// 이렇게 약속한 순서에 있는 값을 변수로 받고, 받은 변수로부터 무언가 조작하거나 리턴할 수 있어요.