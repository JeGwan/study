const myList = {
  list : {
    description : "제과니 홈페이지",
    url : "http://www.super4sition.com",
  }
}

// 먼저 객체 바로 아래의 키인 list를 그대로 list라는 변수에 할당하는 문법입니다
const {list} = myList
console.log(list) // { description: '제과니 홈페이지', url: 'http://www.super4sition.com' }

// 아니면 다른 변수명으로 해당 값을 저장할 수도 있어요.
const {list:myVariable} = myList
console.log(myVariable) // { description: '제과니 홈페이지', url: 'http://www.super4sition.com' }

// nested된 객체까지 들어가서 해당 하는 값을 가져올 수도 있습니다. 지금 경우엔 list밑의 description이라는 키와 url이라는 키의 값을 키와 같은 이름의 변수로 저장해보았어요.
const {list:{description,url}} = myList
console.log(description) // 제과니 홈페이지 
console.log(url) // http://www.super4sition.com

// 이번엔 nested된 키들의 값을 다른 변수로 담고, none이라는 키는 해당 값이 설정되어있지 않을 경우 기본값으로 'default of null' 이라는 값을 넣었어요.
const {list : {description: a, url:b, none: c = "default of null"}} = myList
console.log(a) // 제과니 홈페이지 
console.log(b) // http://www.super4sition.com
console.log(c) // default of null
