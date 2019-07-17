## 문자열도 행렬처럼 인덱스 콜을 할 수 있다
var word = "abcde";
console.log(word[0]); // a
## 문자열도 행렬처럼 slice를 이용해 특정 구간의 문자열만 리턴해줄 수 있다.
word.slice(3,word.length); //"de"
그리고 word.slice(3) 이렇게 인자하나만 쓰면 같은 뜻으로 해당 인덱스부터 끝까지를 자른 문자열을 리턴한다.
## 문자열을 행렬로 만들려면 split([구분자])을 써준다.
word.split(); // return ["abcde"], 구분자가 없으므로
word.split(""); // return ["a","b","c","d","e"], 문자열 하나씩 잘라준다.
## js. Array 객체
배열은 여러 값을 하나의 변수에 저장하기 위한 것으로 쓰인다. 그리고 접근하기 위해 인덱스를 쓴다.
var cars = ["Saab", "Volvo", "BMW"];
var cars = new Array("Saab", "Volvo", "BMW");
똑같지만 가독성과 단순성, 그리고 실행 속도면에서 위의 방식이 더 좋다.
불러올 때나 새로운 값을 대입할 땐 cars[0] 처럼 인덱스를 쓴다.
어레이 안에 여러 오브젝트를 넣을 수도 있다.
배열도, 객체도, 함수도 다 넣을 수 있다. 다만 인덱스는 항상 0부터 시작하는 숫자란것.

Array 프로퍼티와 메소드를 쓸 수 있다.
ex) cars.length, cars.sort()

## js. Date 객체

년/월/일/시/분/초/밀리초로 이루어져있다.
new Date()라는 생성자(현재의 일시 데이트오브젝트, 변하지 않고 현재가 기록됨.) 로 만들 수 있다.
new Date("October 13, 2014 11:13:00") 따위로 만들면 특정 일시의 데이트 오브젝트를 만든다.
new Date(13512351) 따위로 만들면 밀리세컨즈로 1970년부터 시작한 날짜가 반환됨. new Date(99, 5, 24, 11, 33, 30, 0) 이렇게 하면 년월일시분초밀리초로 생성된 특정일의 데이트 오브젝트가 만들어짐.
new Date(99, 5, 24) 년월일만 할 수도 있는데 월은 0~11까지임 0이 1월
d = new Date();
d.toString() : 똑같음
d.toUTCString():UTC기준 시로 보여줌
d.toDateString():요일 월 일 년을 보여줌

ISO Date	"2015-03-25"
Short Date	"03/25/2015"
Long Date	"Mar 25 2015" or "25 Mar 2015"
Full Date	"Wednesday March 25 2015"

ISO를 가장 많이 쓴다.
Date오브젝트의 메서드
getDate()	Get the day as a number (1-31)

getDay()	Get the weekday as a number (0-6)
// 0이 일요일 6이 토요일이다. 반환되는 인테저에 해당하는 인덱스에 요일을 집어넣는 형태로 요일 반환을 할 수 있다.
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
이런식으로.
getFullYear()	Get the four digit year (yyyy)

getHours()	Get the hour (0-23)

getMilliseconds()	Get the milliseconds (0-999)

getMinutes()	Get the minutes (0-59)

getMonth()	Get the month (0-11)

getSeconds()	Get the seconds (0-59)

getTime()	Get the time (milliseconds since January 1, 1970)


setDate()	Set the day as a number (1-31)
해당 월의 일자만 바꾼다. 만약에 31을 넘어가면 자동으로 월이나 년계산을 해준다.
setFullYear()	Set the year (optionally month and day)

총 년,월,일 세개의 인풋이 들어갈 수 있다.
setHours()	Set the hour (0-23)

해당 날의 시만 바꾼다. 이하 동일
setMilliseconds()	Set the milliseconds (0-999)

setMinutes()	Set the minutes (0-59)

setMonth()	Set the month (0-11)

setSeconds()	Set the seconds (0-59)

setTime()	Set the time (milliseconds since January 1, 1970)

데이트 오브젝트끼리 바로 크기 비교를 할 수 있다.

## js Math 객체
Math.PI : 매스 객체의 프로퍼티로 3.141592653589793를 반환
Math.round():가장가까운 인테저 반환
Math.pow(a, n):a의 n승 반환
Math.sqrt(n):루트 n 반환(양수)
Math.abs():절대값 반환
Math.ceil():가장 가까운 인테저로 "올림"
Math.floor(4.7):가장 가까운 인테저로 "버림"
Math.sin(rad) : 라디안을 넣으면 사인값 반환 디그리를 넣을려면 * 파이/180 해주면됨
Math.cos(): 위와 같은데 코사인
Math.min(), Math.max() : 인풋으로 들어온 아규먼트중에 최소값 최대값 반환
Math.random();0이상 1미만의 랜덤소수반환
Math는 static이라(객체에서 인스턴스를 만들지 않는 그대로 쓰이는 놈) 생성자로 인스턴스 안만들고 바로 접근가능.

Math.floor(Math.random() * 10);  
이렇게하면 10미만의 랜덤수가 나오는데 그걸 버림하는거니까 0~9까지나옴
그니까 
function getRand(limit){
  return Math.ceil(Math.random()*limit);
}
을 만들면 내가 정한 limit을 포함해 그보다 적은 인테저 난수를 리턴한다.
function getRandInteger(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}
을 만들면 min과 max를 포함한 영역에서 인테저 난수 반환

## js Number 객체
자바스크립트는 오로지 한개 타입의 넘버를 갖는다. 그래서 실수(float) 정수(int)를 생각할 필요가 없다.
*decimals : 십진법의, 소수
var x = 123e5;    // 12300000
var y = 123e-5;   // 0.00123
지수형태로 표현할 수도 있다.
Integers (numbers without a period or exponent notation) are accurate up to 15 digits.정수로는 15자리까지만 표현 (그걸 넘어서면10000000000000000으로 표현한다)그러나 지수형으로는 더 큰 숫자도 표현할 수 있다.
소수는 17자리까지 표현하지만 언제나 정확하진 않다.
var x = (0.2 * 10 + 0.1 * 10) / 10; 
그래서 가끔은 이렇게 해줘야 정확히 계산되기도 한다.
var x = 10;
var y = 20;
var z = "30";
var result = x + y + z;
The JavaScript compiler works from left to right.

First 10 + 20 is added because x and y are both numbers.

Then 30 + "30" is concatenated because z is a string.
즉 처음 두개까진 덧셈 연산자로 쓰이다가 마지막에 스트링을 만나서 결합연산자로 쓰여지게 되서 의도치 않은 결과를 나타낸다.
그러나 덧셈외의 산술연산자로 스트링을 피연산자로 넣으면 숫자처럼 다시 생각한다.
NaN - Not a Number
이또한 자바스크립트의 예약된 언어인데, 숫자가 유효하지 않은 숫자일 때 뜬다.
ex. var x = 100 / "Apple"; 
그리고 isNaN()함수로 확인할 수 있다.
NaN또한 타입은 number이다.
var x =  2 / 0;          // x will be Infinity

var y = -2 / 0;          // y will be -Infinity
Infinity도 역시 넘버타입이다.
var x = 0xFF;           // x will be 255
0x로 시작하면 16진법 수로 생각한다. (자바스크립트 인터프리터가 그렇다.)

var myNumber = 128;

myNumber.toString(16);  // returns 80
myNumber.toString(8);   // returns 200
myNumber.toString(2);   // returns 10000000
이런식으로 toString메서드를 사용, 16진법, 8진법, 2진법 표현으로 만들수도 있다.

x.toString() 숫자를 문자로
x.toExponential(2) 소수점 2자리의 지수형태 표현
x.toFixed(1) 반올림형태의 소수 표현, 여기서는 소수점1자리까지 반올림표현.( 정수로만 표현할려면 toFixed(0)을 해주면 됨.

var x = 9.656;

x.toPrecision();        // returns 9.656
x.toPrecision(2);       // returns 9.7
x.toPrecision(4);       // returns 9.656
x.toPrecision(6);       // returns 9.65600
해당하는 유효숫자까지만 표현 4면 4자리 표현.
x.valueOf(); 숫자그대로 반환(보통 오브젝트형 숫자를 원시 숫자로 변환할때 씀)
모든 자바스크립트 데이터 타입은 valueOf()와 toString() 메서드를 가지고 있다.
*글로벌 메서드로 숫자형으로 변환시키는 메서드들
The Number() method

The parseInt() method

The parseFloat() method

x = true;

Number(x);        // returns 1

x = false;     

Number(x);        // returns 0

x = new Date();

Number(x);        // returns 1404568027739

x = "10"

Number(x);        // returns 10

x = "10 20"

Number(x);        // returns NaN

Used on Date(), the Number() method returns the number of milliseconds since 1.1.1970. 데이트 객체를 숫자로 만들면 1970년 1월 1일을 기준으로 밀리세컨드가 나온다.

parseInt("10");         // returns 10

parseInt("10.33");      // returns 10

parseInt("10 20 30");   // returns 10

parseInt("10 years");   // returns 10

parseInt("years 10");   // returns NaN 

팔스인트는 아규먼트가 숫자로 시작할 때 첫 숫자만을 인테져로 가져온다. parseFloat()은 첫 숫자만을 소수형으로 가져온다.

Number.MAX_VALUE; js에서 가장큰수 표현
Number.MIN_VALUE; js에서 가장 작은 수 표현
Number.NEGATIVE_INFINITY; -Infinity
Number.POSITIVE_INFINITY; Infinity
Number.NaN; NaN

## js. string
var txt = "afdsafds";
기본적으로 싱클 쿼츠든 더블 쿼츠든 다음에 이것을 만날 때까지를 값으로 생각한다.
(그래서 escape 가 있다 \으로 이스케이프)
스트링은 프로퍼티나 메서드를 사용할 때 객체처럼 쓰일 수 있다.
ex.
- txt.length : 문자열 길이 반환
- txt.indexOf("f") : 처음 f가 발견된 인덱스를 반환 (위의 예시에 따라 여기선 1이 반환)
- txt.lastIndexOf("f") : 찾고자하는 문자열이 마지막으로 발견된 곳의 인덱스 반환.
  못 찾으면 둘 다 -1 반환
  둘다 검색시작위치를 두번째 파라미터에 인자로 집어넣을 수 있다.
  그래서 txt.indexOf("f",2)는 여기서 5를 반환한다.
- txt.search("f") : 똑같이 1을 반환하지만, 정규표현식을 쓸 수 있고,  대신 시작하는 위치는 설정할 수 없다.
- txt.slice(start, end) : start포함 시작해 end이전까지 반환한다.
ex. var txt = "01234567", 
res = txt.slice(2,5) -> res = "234"
res = txt.slice(2,3) -> res = "2"
만약 파라미터가 음수면 뒤에서부터 시작한다.
txt.slice(-2,-1); //뒤에서 둘째짜리수부터 뒤에서 첫째짜리 앞까지 
여기선 6이 반환됨
인자하나만 넣으면 처음부터 그 포지션까지 짜르고 나머지를 반환
- txt.substr(7, 6) 똑같은데 시작위치와 그로부터 가져올 길이를 파라미터로 넣는다.
- txt.replace(바꿀(원래) 문자열, 새로운 문자열)  * 모든 문자열을 바꾸고싶으면 바꿀문자열을 /바꿀문자열/g로 넣어준다.(쿼츠없이 그대로) ,  /바꿀문자열/i 하면 대소문자구분안한다.
- txt.toUpperCase(); 대문자로 바꾸어진 문자열 반환
- txt.toLowerCase(); 소문자로 바꾸어진 문자열 반환
- txt.cancat("합칠문자열1","합칠문자열2") : txt+"합칠문자열1"+"합칠문자열2"을 반환
  var text = "Hello" + " " + "World!";
  var text = "Hello".concat(" ", "World!");
둘이 완전히 같음.  
All string methods return a new string. They don't modify the original string.
모든 메소드는 새로운 스트링을 리턴하지 오리지널을 바꾸지 않는다.
- txt.charAt(0) : 해당인덱스의 캐릭터 반환 여기서는 0이므로 시작되는 문자열 "0" 이 반환됨. 
- txt.charCodeAt(0) : 해당 인덱스의 유니코드 반환
*스트링을 array처럼 접근하면 안전하지 않다. txt[0]은 동작할수도 안할수도 있고 에러도 안내서 위험.
*그래서 어레이처럼 쓰려면 먼저 컨버팅을 해줘라
var txt = "a,b,c,d,e";   // String
- txt.split(",") : 해당하는 구분자로 잘라서 배열에 요소로 넣음.(5) ["a", "b", "c", "d", "e"]
- txt.split("") : 그냥 한자한자 잘라서 넣음.(9) ["a", ",", "b", ",", "c", ",", "d", ",", "e"]
그러나 절대 오리지날이 바뀌는게 아니다 모두 반환되는 것 뿐이다!

## js scope

로컬 : 함수 내에서 선언된 변수는 모두 함수내에서만 사용되고, 종료시에 없어진다.
글로벌 : 함수 밖에서 선언된 변수는 글로벌로 사용할 수 있다. 웹페이지 내 모든 스크립트, 함수내에서 사용가능하다.
* var를 붙이지 않고 선언한 함수 내의 변수는 글로벌이 되버린다. 
* 함수의 파라미터를 통해 들어온 아규먼트는 로컬이 된다.

## js object
JavaScript objects are containers for named values.
객체는 이름이 있는 값들의 저장소이다.
이름과, 값의 페어들로 구성되어있다.
그런 페어를 속성이라 한다. 즉
var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
person이라는 객체 변수의 속성은 firstName등이 있는 것이다.
메소드는 객체에서 수행될수 있는 어떤 동작들이다. 그리고 저장은 함수 정의처럼 저장된다.

자바스크립트 객체는 속성이나 메소드라고 불리는 명명된 값들의 저장소이다. 

속성에 접근하는 두가지 방법
1. objectName.propertyName
2. objectName["propertyName"]
메소드 호출하는 두가지
objectName.methodName() //메소드를 실행
objectName.methodName // 메소드의  정의를 리턴 
ex. function () { return this.firstName + " " + this.lastName; }
사실 메소드는 함수의 정의를 속성값으로 저장한 것이다.


*!중요 : 속성값이 같아도 자바스크립트 오브젝트는 언제나 서로 다르다고 생각한다.

## js function
함수는 특수한 업무를 하는 코드블락이다. 함수는 호출될 때 쓰인다.
파라미터로 들어온 아규먼트는 함수내에서 지역변수로 쓰인다.
return은 함수의 실행을 종료시키며 return value가 있을 경우 caller에게 그 값을 반환한다.

## js 배열과 객체선언
배열 var array = ["스트링", 302, true];
객체 var object = {firstName : "오", lastName : "제관"}
객체가 비었을 때 값은 null이다. 여전히 타입은 object이다 자바스크립트에서 null은 데이터타입이 아니다.
array 또한 타입은 object이다. 자바스크립트에서 어레이는 오브젝트 타입으로 분류된다. 즉, array라는 데이터타입은 없다.
즉 js에서 임의의 키에 해당하는 밸류의 묶음으로 뭔가를 만들고 싶으면
오브젝트를 만들어야 한다. { "이름" : "제관", "나이" : 30 } 이런식으로.

## js 실행문의 구성요소
Values, 
고정된 것들 : literals("문자열",10.14(숫자)) 
수정할수 있는 밸류 : variable
Variable,
var로 시작해서 선언, 대소문자를 구분한다. 숫자로 시작하지 않는다. 그래서 숫자와 변수를 구분한다.
선언만 했을 경우에 var carName; carName에는 아무 값이 없지만 기술적으로는 undefined라는 값이 있다.
변수 명명법엔 여러가지가 있다.
 camel-var, camel_var
파스칼표기법
CamelVar
카멜표기법(자바스크립트 프로그래머들이 젤 많이씀)
camelVar
Statements,
브라우저에게 어떤것을 실행하라고 하는 지침들, 지시
Operators,
산술연산자 -> + - * / (스트링 간 + 는 문자결합연산자가 됨)
어떠한 식에다가 스트링으로 취급되는거 하나가 들어오면 그 뒤에 숫자부터는 모두 스트링으로 생각한다. (이를 방지하기위해 숫자연산해주고 스트링에 붙인다면 숫자연산만 괄호로 묶어준다 )
ex ) 2+3+"5" = 55, "5"+2+3=523
Keywords,
이를테면 var 등 약속된, 브라우저에게 어떠한 수행을 하게 끔 하는 문구들
이런 약속된 키워드는 변수명으로 사용할 수 없다.
Comments,
//이걸로 쓰는 모든 것들.
Expressions,  and 

### jquery 가장 최신 버전 cdn
```html
<script src="http://code.jquery.com/jquery-latest.js"></script>
```

### js event
html이벤트란 html요소에 일어난 어떤 것들이다.
그리고 자바스크립트는 이러한 액션에 반응할 수 있다.
이벤트 예시
- html 페이지 로딩이 끝날 때
- html 인풋 필드가 변할 때
- html 버튼이 클릭될 때
html 요소는 이벤트 핸들러를 태그의 속성으로 가질 수 있게 한다.
```html
<element event='some JavaScript'>
<!-- ex -->
<button onclick="document.getElementById('demo').innerHTML = Date()">The time is?</button>
```
이러한 것으로 하여금 이벤트에 대해 어떠한 함수를 호출하고 그 함수에서 동작을 실시 할 수 있다. 또한 이벤트 속성에 부여된 동작은 해당 이벤트가 일어난 요소를 this로 가져올 수 있다.
다음과 같은 이벤트가 있다.
- onchange	An HTML element has been changed
- onclick	The user clicks an HTML element
- onmouseover	The user moves the mouse over an HTML element
- onmouseout	The user moves the mouse away from an HTML element
- onkeydown	The user pushes a keyboard key
- onload	The browser has finished loading the page

온로드 속성으로 차례차례 데이터를 가져오게 하면 어떻게 될까?
이러한 이벤트 핸들러의 속성 값으로 자바스크립트문을 바로 실행시킬수도 있고, 함수를 호출할 수도 있다.

## js. 동작을 볼 수 있는 4가지 방법
HTML 요소에 쓰려면 -> innerHTML.

HTML 아웃풋스트링으로 바로 ->  document.write(). 이건 오로지 테스트용으로 쓴다. 문서가 완전 로딩된 후에 이것을 쓰면(이를 테면 버튼의 온클릭으로 실행되면) 문서가 다날라가고 이것으로 쓰여진 것만 남는다.

알러트 시키고싶으면 ->window.alert().

콘솔로 뜨게 하려면 ->console.log().

## js. 외부파일

```html
<script src="myScript.js"></script>
```
이런식으로 하면된다. 다만 이것이 있는 위치에 마치 js파일이 그대로 위치해있는 것처럼 동작한다.
이점
1. html 태그와 코드를 분리할 수 있다.
2. html과 js를 읽기 쉽고, 유지하기 편하게 한다.
3. 캐시가 되기 때문에 다시 방문시 로딩속도가 빨라진다.

완전 외부경로
```html
<script src="https://www.w3schools.com/js/myScript1.js"></script>
```
웹서버의 루트 폴더 에 따른 절대경로
```html
<script src="/js/myScript1.js"></script>
```
같은 폴더 내라면 상대경로
```html
<script src="myScript1.js"></script>
```

## js 스크립트 태그를 가장 아래에 두는 이유
브라우저는 html요소를 먼저 디스플레이 시키는데 도중에 script 태그가 있으면 디스플레이 속도가 느려진다. 즉 맨 아래 스크립트 태그를 두면 디스플레이 속도가 향상된다.

