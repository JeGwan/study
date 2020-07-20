# Flex
[flexbox로 만들 수 있는 10가지 레이아웃](https://d2.naver.com/helloworld/8540176)를 참고하며 만들었다.

## 구성
1. flex-container
2. flex-item
## 속성
1. flex-container : flex-direction,flex-wrap,justify-content,align-items,align-content
2. flex-item : flex, flex-grow, flex-shrink, flex-basis
### flex-item 의 속성에 대해
기본적으로 flex 뒤에 들어가는 값은 각각 flex-grow, flex-shrink, flex-basis에 1대1대응 된다.
마치 `marign:0 1px 2px 3px;`이 'margin-top:0; margin-right:1px; margin-bottom:2px; margin-left:3px;`인 것처럼.
그럼 각각의 의미가 무엇이냐.
#### 1. flex-grow
이 값이 1이상이면 flex-container가 늘어날 때 flex-item은 화면을 채우며 늘어난다.
다만 같은 자식요소중에 하나가 `flex-grow:n`이고 나머지 하나가 `flex-grow:m`라면 n:m의 비율로 공간을 차지하게 된다.
즉 둘다 1을 가지면 반반 차지하고 1과 2를 가지면 1:2의 비율을 갖고 2와 2를 가지면 둘다 1을 가진 것과 같게 동작한다.
#### 2. flex-shrink
이 값은 1이면 flex-container가 줄어들 때 비례해서 줄어든다. 이 역시 숫자에 비례해서 줄어드는 폭이 달라진다.
즉 같은 넓이를 가진 두녀석이 

### 예시
예를들어 한줄에 제목과 장르를 적는다면, 장르의 영역은 고정된 길이를 갖고 줄기만 할뿐이고 나머지 공간을 제목이 차지하고 컨테이너가 flex-item의 전체 길이보다 줄어들 때 바깥으로 삐져나오지 않게 말줄임을 달려면?
1. 제목 영역 : 
```css
flex-grow:1; /*나머지공간을 채우며 늘어나니까*/
flex-shrink:1; /*줄어들 때 길이비에 맞게 줄어드니까*/
flex-basis:400px; /*상대적 너비 비를 위해*/
```
2. 장르 영역 :
```css
flex-grow:0; /*길이가 flex-basis인 100px이상 늘지 않게 하기 위해*/
flex-grow:1; /*줄어들 때 길이비에 맞게 줄어드니까*/
flex-basis:100px; /*상대적 너비 비를 위해*/
white-space:nowrap; /*줄넘김을 하지 않고 한줄로 처리하게 만든다*/
overflow:hidden; /*컨터에너 바깥으로 튀어나오는 부분은 보이지 않게 한다.*/
text-overflow:ellipsis; /*문자열이 튀어나왔을 때 말줄임표 처리*/
```