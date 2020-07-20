# GraphQL

출처 : [How to GraphQL](https://www.howtographql.com)

## 1. GraphQL이란 ?

- GraphQL은 페이스북에 의해 개발되고 오픈소스로 공유되고 있는 새로운 API의 기준이다.
- 선언적 데이터 가져오기를 할 수 있다.(enables declarative data fetching)
- 모든 쿼리에 대해 하나의 엔드포인트를 가진다.

모든 웹 서비스가 그러하듯 클라이언트는 서버에 리퀘스트를 보내고 서버는 데이터베이스에서 해당 데이터를 가져온 뒤 클라이언트에게 건내준다.
지금 까지는 RESTful API가 주도적인 API 패러다임이었지만 다음과 같은 상황 때문에 페이스북은 GraphQL을 개발했다.

### 등장배경

1. 모바일 유저가 늘어났고 이 때문에 보다 효율적인 데이터 로딩이 필요했다.
2. 프론트엔드의 프레임워크, 플랫폼이 다양해지고 이 다양함을 쉽게 대응할 필요가 있었다.
3. 신속한 기능 개발.

### GraphQL을 사용하는 회사들

- 핀터레스트
- 깃허브
- 트위터
- ...

## 2. GraphQL은 왜 REST 보다 나은가?

지난 십년동안 REST API는 API의 표준이었다. stateless 서버나 resoures로의 접근을 구조화 했다는 점에서 좋은 아이디어 였다.
그러나 REST API는 클라이언트의 급변하는 요구 사항을 따라 잡기에는 너무 융통성이 없다(매번 요청에 따라 엔드포인트를 하나 더 만들어줘야 하기 때문에!).

GraphQL은 이러한 보다 유연하고 효율적인 API의 수요에 대응하기 위해 만들어졌다. 그리고 REST API에서 겪었던 많은 비효율과 단점들을 풀어주었다.

REST와 GraphQL가 API로서 데이터를 가져올 때 어떻게 다른지 쉬운 예시를 하나 들어보자. 우리가 블로그 앱을 만든다고 하자.
앱은 특정 유저의(아마도 로그인한 유저나 어떤 유저의 계정 페이지에서) **제목이나 포스트**들을 불러와서 화면에 표시해야한다. 동시에 같은 화면에서 가장 최근 해당 유저를 **팔로우 한 유저 3명**도 불러와야 한다. GraphQL과 REST 가 어떻게 다를까?

### REST vs GraphQL : 데이터 가져오기(Data fetching)

REST API에서는 다양한 엔드포인트에서 화면에 뿌려주기위한 정보를 가져와야 할 것이다.
예를들어 먼저 `/users/:id` 라는 엔드포인트에서 유저의 정보를 가져올테고 두번째로, `/users/:id/posts`에서 유저가 쓴 포스트를 가져와야 한다.
마지막으로 `/users/:id/follwers` 라는 곳에서 유저를 팔로우하는 팔로워 리스트를 불러올 것이다.

![REST API에서 데이터를 가져오는 과정](https://imgur.com/VRyV7Jh.png)

GraphQL에서는 반대로 오로지 하나의 쿼리만을 서버에 보낸다. 서버는 요구사항을 충족하는 단하나의 JSON 오브젝트로 응답한다.

![GraphQL에서 데이터를 가져오는 과정](https://imgur.com/z9VKnHs.png)

### No more Over- and Underfetching

더 이상은 클라이언트에 정보를 뿌려주기위해 필요 이상으로 많은(Overfetching) 데이터를 불러오거나 필요에 충족하지 못하는 부분 데이터를 가져와서(Underfetching) API를 여러번 호출하지 말자. REST의 가장 큰 문제가 Overfetching 혹은 Underfetching이다. 이런 문제가 발생하는 원인은 REST가 하나의 엔드포인트에서 **고정**된 데이터 형식만 가져오기 때문이다. 때문에 클라이언트가 정확히 원하는 데이터 셋을 전달하는 API를 제공하기가 어려웠다.

### Overfetching : 불필요한 데이터까지 다운로드 해버린다.

Overfetching은 클라이언트가 그들이 필요한 것보다 더 많은 데이터를 다운로드 한다는 뜻이다. 화면에서 유저리스트를 뿌리는데 오로지 그들의 이름만 필요하다고하자. REST 에서는 `/users` 라는 엔드포인트에서 유저들의 모든 데이터를 담은 JSON 배열을 받을 것이다. 이 데이터에는 유저들의 이름 외에 많은 정보가 담겨 있을 것이다.

### Underfetching 과 n+1 문제

또 다른 문제는 Underfetching과 n+1-request 문제다. Underfetching이란 특정 엔드포인트가 필요한 모든 데이터를 제공해주지 못할 때의 문제를 일컫는다. 이 때 클라이언트는 불충분한 나머지 정보를 얻기 위해 추가적으로 다른 엔드포인트에 요청을 하게 된다.

예시로 보인 앱에서는 팔로워를 불러들이기 위해 `/users/:id/followers` 라는 엔드포인트를 추가적으로 만들어야할 것이다. 매번 앱이 화면에 유저와 팔로워를 보여줄 때마다 앱은 `/users/:id` 와 `/users/:id/follwers` 라는 두 곳에 모두 요청을 보내고 받아야 한다.

### 프론트엔드에서의 빠른 개발, UI변화가 가능

REST API에서 자주 쓰이는 패턴중에 하나는 뷰에 대응하는 엔드포인트를 만드는 겁니다. 언더페칭, 오버페칭을 해결하기 위해 그냥 뷰에서 필요한 모든 정보를 해당 뷰에 1:1대응 하는 하나의 엔드포인트에 만들어 주는 것이죠.

이러한 접근의 가장 큰 약점은 프론트엔드에서의 빠른 개선을 허용하지 않는다는 점입니다. UI가 변경될 때마다 필요한 데이터는 달라지고 결과적으로 endpoint에서 주어야할 데이터는 더 적어지거나 더 많아지므로 매번 바꾸어야 하므로 백엔드가 수정되어야만 프론트엔드에서의 수정사항이 제대로 동작합니다. 이러한 점은 생산성을 죽이고 유저의 피드백에 대한 변화를 현저하게 느리게 만들어버리죠.

GraphQL라면 해결할 수 있습니다. 자체의 유연한 성질 때문에 클라이언트 사이드에서의 변화가 생겨도 서버에서 추가적으로 API를 바꿀 필요가 없습니다. 클라이언트에서 그들이 필요한 데이터를 정확히 지정해서 얻을 수 있기 때문에 백엔드 엔지니어까지 대동해서 UI변화에 대해 업무를 할 필요가 없다는 것이죠.

### 백엔드에서 통찰력있는 분석자료를 얻을 수 있다

GraphQL은 백엔드로 들어온 요청들에 대해 잘 정제된 인사이트를 제공합니다. 각 클라이언트가 어떤 정보가 필요한지 지정해서 요청하기 때문에 사용하고 있는 데이터가 어떻게 쓰이는지 깁게 이해할 수 있습니다. 예를들어 이는 전혀 쓰이지 않은 특정 field를 버릴 수도 있고 개선할 수도 있습니다.

GraphQL은 서버로 들어온 요청들에 대해 낮은 수준에서의 퍼포먼스를 모니터링할 수 있습니다. GraphQL은 클라이언트에서 요청된 데이터를 수집하기 위해 *resolver function*이라는 개념을 씁니다. 이러한 퍼포먼스의 측정으로부터 리졸버는 우리에게 아주 중요한 인사이트를 제공합니다.

### 스키마와 타입 시스템의 장점을 얻을 수 있다.

GrapQL은 한 API의 수용성을 정의하기 위해서 강력한 타입 시스템을 사용합니다. API에 노출된 모든 타입들은 GraphQL Schema Definition Language(SDL)을 사용하여 schema로 쓰여집니다. 이러한 스키마는 클라이언트가 어떻게 데이터에 접근하는지 정의하기 위해 서버와 클라이언트 사이의 계약사항을 제공해줍니다. 그니까 일종의 명세서입니다.

한번 스키마가 정의되면 프론트엔드와 백엔드 팀은 더 소통할 필요 없이 자기 일을 할 수 있습니다. 왜냐하면 서로 네트워크를 통해 전송되는 데이터의 확실한 구조를 알고 있기 때문입니다.

프론트 엔드 팀은 필요한 데이터 구조를 모방하여 앱을 쉽게 테스트 할 수 있습니다. 서버가 준비되면 스위치를 뒤집어 클라이언트 응용 프로그램에서 실제 API의 데이터를로드 할 수 있습니다.

## 3. 핵심 개념(Core concepts)

이번 챕터에서는 우리는 그래프큐엘의 근간이되는 언어 구조를 배워볼것입니다. 여기서 타입을 정의하고 쿼리와 뮤테이션을 보내는 syntax를 보게될 것입니다. 또한 여러분이 배운 것을 실험하기 위해 사용할 수있는 `graphql-up`에 기반한 샌드 박스 환경을 준비했습니다.

### The Schema Definition Language (SDL)

그래프큐엘은 API의 스키마를 정의하기 위한 자체 타입 시스템을 가지고 있습니다. 스키마를 쓰기 위한 문법을 Schema Definition Language (SDL) 라고 부릅니다.

SDL로 `Person`이라는 간단한 타입을 정의한 예시입니다.

```
type Person {
  name: String!
  age: Int!
}
```

이 타입은 두가지 필드를 가지고 있습니다. `name`과 `age`입니다. 각 필드는 `String`, `Int` 타입을 가지며 타입 뒤의 느낌표 `!`는 이것이 필수 필드라는 것을 의미합니다.

그리고 타입간에 관계를 표현하는 것도 가능합니다. 블로깅 앱에서 보여준 예시처럼 하나의 `Person`이 `Post`에 연결될 수 있습니다.

```
type Post {
  title: String!
  author: Person!
}
```

Conversely, the other end of the relationship needs to be placed on the Person type(이 구문좀 해석해주세요 ㅠㅠㅠ)

```
type Person {
  name: String!
  age: Int!
  posts: [Post!]!
}
```

방금 우리는 `Person`과 `Post`간에 1대다관계(one-to-many-relationship)를 만들었다는 걸 알아둡시다. `Person`의 `posts`라는 필드는 실제로 `Post`의 배열로 이루어져있습니다.

### 쿼리로 데이터 가져오기(Fetching Data with Queries)

REST API로 작동을 했다면 데이터는 특정 엔드포인트에서 불러져옵니다. 각 엔드포인트는 리턴해야할 정보의 구조를 명확히 정의하고 있죠. 즉 클라이언트의 데이터 요구사항은 연결되는 URL에 효율적으로 인코딩됩니다.

그래프큐엘에서 취하는 접근방법은 상당히 다릅니다. 고정된 데이터 구조를 리턴하는 다양한 엔드포인트를 가지는 대신에, 그래프큐엘 API는 일반적으로 단 하나의 엔드포인트만 노출시킵니다. 이것이 가능한 이유는 그래프큐엘 API가 리턴하는 데이터의 구조가 고정된 형태가 아니기 때문입니다. 클라이언트 쪽에서 어떤 데이터가 실제로 필요한지 직접 요청할수 있고, 그에 대응되게 리턴을 해준다는 점에서 그래프큐엘 API는 유연성을 가집니다.

이것은 클라이언트가 어떤 데이터가 필요한지를 *query*를 통해 표현하고 서버로 보낸다는 것을 의미합니다.

#### 기본적인 쿼리

다음의 예제 쿼리를 살펴봅시다

```
{
  allPersons{
    name
  }
}
```

쿼리 안의 `allPersons` 필드는 이 쿼리의 *root field*라고 부릅니다. 루트 필드 뒤에 따라오는 모든 것은 쿼리의 *payload*라고 부릅니다. 이 쿼리에서 지정된 쿼리의 payload는 `name` 하나뿐입니다.

이 쿼리는 데이터베이스에 저장된 모든 사람들의 리스트를 리턴합니다. 이것이 응답의 예시입니다.

```
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" }
  ]
}
```

각 사람이 오직 `name`만 가지고 있는 것에 주목합시다. `age`는 서버에서 리턴되지 않았습니다. 왜냐하면 우리가 작성한 쿼리에서 오로지 `name` 필드만 지정했기 때문입니다.

만약 클라이언트가 `age`도 필요하다면 오로지 쿼리의 페이로드에 추가만 하면됩니다.

```
{
  allPersons{
    name
    age
  }
}
```

그래프큐엘의 가장 큰 장점중 하나는 자연스럽게 중첩된 정보를 질의(querying)할 수 있다는 겁니다. 예를 들어 `Person`이 쓴 모든 `posts`를 가져오고 싶다면 다음과 같이 작성하면됩니다.

```
{
  allPersons{
    name
    age
    posts {
      title
    }
  }
}
```

#### 매개변수(argument)가 있는 쿼리

그래프큐엘에서는 모든 필드가 0 혹은 여러개의 매개변수를 가질 수 있습니다(다만 스키마에서 지정되어 있어야합니다). 예를 들어 `allPersons` 필드는 `last` 파라미터를 가질 수 있습니다. 오로지 지정된 숫자의 사람만 가져오기 위해서 말이죠. 다음과 같이 쓸 수 있습니다.

```
{
  allPersons(last: 2){
    name
  }
}
```

### Mutation으로 데이터 쓰기

서버에서 정보를 요청할 때, 대부분의 애플리케이션은 백엔드에서 저장된 데이터를 변경할 수 있는 방법이 필요합니다. 그래프큐엘에서는 이러한 변화는 *mutations*라고 불리는 것을 사용해서 이루어집니다(즉 CRUD에서 CUD를 담당합니다). 일반적으로 다음 세개의 뮤테이션이 있습니다.

- creating new data(생성)
- updating existing data(수정)
- deleting existing data(삭제)

뮤테이션은 쿼리와 문법적으로 같은 구조가 따라오지만 항상 `mutation`이라는 키워드와 함께 시작되어야 합니다. 여기에는 `Person`을 어떻게 새로 만드는지에 대한 예시가 있습니다.

```
mutation {
  createPerson(name: "Bob", age: 36) {
    name
    age
  }
}
```

우리가 이전에 썼던 쿼리와 비슷함을 주목합시다. 뮤테이션도 루트 필드를 가지고 있고, 이 경우에서는 `createPerson`이 되겠습니다. 우리는 필드의 아귝먼트에 대한 컨셉도 알고 있습니다. 이번 경우에서는 `createPerson`필드가 새로운 `person`의 `name`과 `age`를 지정해주는 두가지 아규먼트를 받고 있습니다.

쿼리처럼 `Person`객체의 속성을 요청할 수 있는 뮤테이션의 페이로드를 지정할 수 있습니다. 이번 예시에서 우리는 `name`,`age`를 묻고있습니다.

## 4. Big Picture (Architecture)

사실 그래프큐엘은 오로지 명세(specification)만 합니다. 다시 말해 그래프큐엘 서버가 어떻게 동작해야하는지에 대한 아주 긴 문서에 불과하다는 것이죠.

### Use Cases

이번 섹션에서는 그래프큐엘 서버를 포함하는 3가지 아키텍처의 종류를 짚고 넘어가겠습니다.

1. 데이터베이스와 연결된 그래프큐엘서버
2. 다수의 서드파티 혹은 레거시 시스템 앞에 얇은 레이어로서의 그래프큐엘, 그리고 이들을 하나의 그래프큐엘 API로 통합하는 것.
3. 하나의 그래프큐엘 API로부터 연결된 데이터베이스, 서드파티, 레거시 시스템들로 접근 가능한 하이브리드 접근법

세가지 아키텍쳐 모두 그래프큐엘의 주요 사용법으로 대표되며 이것이 사용될 수 있는 컨텍스트에서의 유연성을 보여줍니다.

### 1. 데이터베이스와 연결된 그래프큐엘 서버

![GraphQL server with a connected database](https://imgur.com/cRE6oeb.png)
아마 이 사용법이 가장 흔할겁니다. 셋업 단계에서 우리는 하나의 웹서버에서 그래프큐엘의 명세를 작동시킬 겁니다. 쿼리가 그래프큐엘 서버에 도착할 때 서버는 그래프큐엘 쿼리의 페이로드를 읽고 데이터베이스에서 필요한 정보를 가져옵니다. 이것을 쿼리를 *resolving*한다고 합니다. 그 다음은 공식적으로 명세된 것을 바탕으로 응답 객체를 생성하여 클라이언트에게 리턴하죠.

그래프큐엘은 사실 전송계층과 상관없습니다(transport-layer agnostic).
이것은 어떤 사용 가능한 네트워크 프로토콜 수도 쓸 수 있다는 것을 의미합니다.
그러니까 그래프큐엘 서버를 TCP나 웹소켓 위에서 작동시킬 수 있다는 겁니다.

그래프큐엘은 데이터베이스나 데이터베이스 저장하기 위한 형식을 쓰지 않습니다.
우리는 AWS Aurora와 같은 SQL 데이터베이스도 MongoDB와 같은 NoSQL 데이터베이스도 쓸 수 있습니다.

### 2. 기존 시스템을 통합하는 GraphQL Layer

![GraphQL layer that integrates existing systems](https://imgur.com/zQggcSX.png)

그래프큐엘의 또 다른 주요 쓰임 법은 하나의 그래프큐엘 API로 여러개의 기존 시스템을 합치는 것입니다. 이는 레거시 인프라와 수년에 걸쳐 성장해 왔으며 현재 유지 보수 부담이 큰 다양한 API를 보유한 기업에게 특히 유용합니다. 이러한 회사의 문제점은 다양한 시스템으로의 접근이 필요한 혁신적 제품개발이 거의 불가능하다는 것이죠.

그러한 점에서 그래프큐엘은 기존 시스템을 통합하는 데에 쓰일 수 있습니다. 그리고 그 복잡성을 가려주죠. 클라이언트는 그들이 필요한 데이터를 가져오기 위해 단순히 그래프큐엘과 통신하면 됩니다. 그래프큐엘 서버는 오로지 데이터베이스에서 데이터를 가져와 그래프큐엘 응답 형식에 맞게 바꿔줄 뿐이죠.

이전에 말했던 것처럼 그래프큐엘은 어떤 데이터베이스를 쓰든 관심을 두지 않습니다. 이번에도 어떤 데이터 소스, 어떻게 쿼리를 처리하는지에 대해는 관심을 두지 않습니다.

### 3. 하이브리드!

![Hybrid approach with connected database and integration of existing system](https://imgur.com/73dByTz.png)

마지막으로 위 두가지를 합치는 그래프큐엘 서버를 만들 수도 있습니다.
쿼리가 서버로 부터 받아지면 통합된 API나 서드파티, 레거시, 그리고 직접 연결된 데이터베이스를 통해 필요한 데이터를 가져올 수 있습니다.

### Resolver functions

https://imgur.com/e1gBEP5.png
하지만 우리는 도대체 어떻게 이러한 유연성을 그래프큐엘을 통해 얻을 수 있을까요? 다른 use case들에 어떻게 적합하게 만들 수 있을까요?

우리가 이전 챕터에서 배웠든 그래프큐엘 쿼리의 페이로드는 필드들로 구성되어 있습니다. 그래프큐엘 서버의 작동에서 각 필드는 resolver라 불리는 함수에 1대1 대응되고 있죠.
리졸버 함수의 유일한 목적은 해당하는 필드의 데이터를 가져오는 것입니다.

![리졸버로 리턴](https://imgur.com/e1gBEP5.png)

서버가 쿼리를 받을 때 서버는 쿼리의 페이로드에 담긴 필드들에 맞는 모든 함수를 호출할 것입니다. 그래서 쿼리를 처리하고 각 필드에 맞는 데이터를 찾아 가져오죠. 한번 모든 리졸버가 리턴하면 서버는 이를 쿼리에서 명시한 형식에 맞게 패키징을 하고 다시 클라이언트에게 이 응답 객체를 리턴합니다.

### 그래프큐엘 클라이언트 라이브러리들

그래프큐엘은 프론트엔드 개발자들에게 특히 훌륭합니다. REST API를 통해 겪는 많은 불편과 단점들을 제거했기 때문입니다(언더, 오버페칭 같은 것들이요!). 클라이언트는 데이터를 어디서 가져오는지 신경쓸 필요 없이 오로지 하나의 API만 쓰면 됩니다.

순수히 선언적 접근방법으로 데이터를 가져오기 보다 그래프큐엘을 쓰면 어떠한 큰 변화가 있는지 살펴봅시다. REST API에서 데이터를 가져올 때 대부분의 애플리케이션은 다음 단계를 수행해야합니다.

1. http request를 생성하고 보냅니다(자바스크립트에선 `fetch`가 있겠죠).
2. 서버의 응답을 받고 파싱합니다.
3. 데이터를 로컬에서 가지고 있습니다(클라이언트의 컨텍스트에서).
4. 데이터를 UI에 보여줍니다.

선언적 데이터 가져오기 접근방법에서는 클라이언트는 오로지 다음 두개만 하면됩니다.

1. 필요한 데이터를 명시합니다.
2. 데이터를 UI에 보여줍니다.

데이터 저장뿐만 아니라 모든 하위 수준의 네트워킹 작업은 추상화되어야하며 데이터 종속성 선언이 지배적인 부분이어야합니다.

이것이 바로 Relay 또는 Apollo와 같은 GraphQL 클라이언트 라이브러리가 가능하게하는 것입니다. 이들은 반복적 인 인프라 구현을 다루지 않고 애플리케이션의 중요한 부분에 집중할 수 있어야하는 추상화를 제공합니다.

## 5. Clients

## 6. 기타등등

## 7. graphql-node Tutorial

여기서는 다음과 같은 기술을 쓰게 된다.

### 쓸 도구들

- graphql-yoga : 쉬운 설치 / 퍼포먼스 / 좋은 개발 경험에 포커스를 맞춘 Fully-featured Graphql server 이다. Express, apollo-server, graphql-js 등 위에서 동작한다.

- prisma : Prisma 는 전통적인 ORM을 대체한다. 프리즈마 클라이언트는 GraphQL resolvers를 선언하거나 데이터베이스 액세스를 단순화 시켜주는 역할을 한다.

- GraphQL Playground : 이것은 GraphQL IDE로 GraphQL API에서 쿼리를 보내걱나 변화를 주는 등의 기능을 인터랙티브하게 사용할 수 있게 테스트하고 탐험해줄 수 있게 한다. 한마디로 GraphQL의 Postman이다. 다만 GraphQL Playground가 다른 점은
  - 사용가능한 모든 API 동작에 대해 포괄적인 문서를 자동생성해준다.
  - 자동완성과 Syntax 하이라이팅이 지원되는 쿼리, mutations, subscription 을 쓸 수 있는 에디터를 제공한다.
  - 쉽게 API oreration을 공유할 수 있게 해준다.

### 기대할 수 있는 것들!

여기서는 해커뉴스를 클론하는 API를 만든다. 이를 통해

- GraphQL schema를 정의하고 그에 대응되는 resolver function을 만드는 것으로부터 GraphQL 서버가 기본적으로 어떻게 동작하는지 배운다. 이 시점까지는 데이터는 메모리(아마도 RAM)에 저장되기 때문에 영구적이지 않다.

- 누구도 데이터를 계속 저장하지 못하는 서버를 원하지 않기 때문에 우리는 데이터베이스 레이어를 추가할 겁니다. 데이터베이스 레이어는 Prisma를 통해 구동되며 우리의 GraphQL server 와 Prisma client를 통해 연결됩니다.

- 한번 우리가 데이터베이스를 연결 시키면, 우리는 보다 진보된 기능을 API에 추가할 수 있습니다.

- signup/login 등 유저의 인증 API를 통해 시작할 것입니다. 이를 통해 어떤 유저에게 어떠한 API 동작을 줄지 권한을 체크할 수 있을 것입니다.
- 그 다음 파트는 실시간 기능을 우리의 API에 추가해볼 겁니다. 바로 GraphQL subscriptions 을 이용해서요.

- 마지막으로, API 사용자의 API에서 검색 한 항목의 목록을 필터링 및 페이지네이션 기능을 추가하여 제한할 수 있습니다.

## 8. Getting Started

이번 섹션에서는 우리의 GraphQL서버를 위한 프로젝트를 준비하고 첫번째 GraphQL 쿼리를 선언해 볼 것입니다. 마지막에는 이론을 조금 설명하고 GraphQL schema에 대해 배워볼 겁니다.

### 프로젝트 만들기

이 튜토리얼은 우리에게 어떻게 GraphQL서버를 처음부터 빌드하는지 알려줍니다. 먼저 디렉토리 하나를 만듭시다.

```bashß
mkdir hackernews-node
cd hackernews-node
yarn init -y
# 또는
npm init -y
```

### 하나의 GraphQL server 만들기

프로젝트 폴더에 들어가서 `src`라는 디렉토리를 만들어주고 그 안에 `index.js`를 만들어줍시다.

```
├── package.json
└── src
    └── index.js
```

현재 프로젝트 구조입니다.

이제 서버를 구동하기 위해서 첫번째로 필요한 디펜던시 는 `graphql-yoga` 입니다.

```bash
npm install graphql-yoga
```

`graphql-yoga`는 앞서 말한거 처럼 모든 기능을 갖춘 GraphQL server 입니다. 이것은 Express.js와 그 외의 몇개의 라이브러리들 을 기반으로 우리가 production-ready된 GraphQL server를 만들 수 있게 도와줍니다.

기능은 다음과 같습니다.

### graphql-yoga 의 기능

- GrqphQL spec-compliant(규격 준수)
- 파일 업로드 지원
- GraphQL subscriptions를 이용한 실시간 기능(데이터가 바뀌면 UI도 바뀜)
- 타입스크립트의 정적 타이핑과 함께 동작할 수 있음
- Out-of-the-box support for GraphQL Playground(이건 뭔말일까?)
- Express 미들웨어들을 통해 확장 가능
- GraphQL schema에서 커스텀 지시문을 처리
- Query의 퍼포먼스를 추적
- content-types로 `application/json`이나 `application/graphql` 모두를 받음.
- 어디서나 작동 : now, up, AWS Lambda, Heroku 등에서 배포가능.

이제 코드를 조금 써보자.

```js
// src/index.js
const { GraphQLServer } = require("graphql-yoga");

// 1
const typeDefs = `
type Query {
  info: String!
}
`;

// 2
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
  },
};

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
```

이제 번호가 매겨진 구문 하나하나를 살펴보면서 무엇이 동작하는지 이해해보자.

1. `typeDef` constant는 우리의 GraphQL schema를 정의한다. 여기에서는 `Query`타입을 써서 `info`라는 하나의 field를 갖게 선언했다. 이 field는 `String!`이라는 타입을 갖는데, exclamation mark(느낌표)는 해당 field가 `null`이 되면 안된다는 것을 의미한다.

2. `resolvers` 객체는 GraphQL schema의 실제적 작동방법이다. 그리고 이 구조는 `typeDefs`에서 선언한 것고 구조가 같다는 것을 유념하자.

3. 마지막으로 스키마와 리졸버들은 번들되고 `graphql-yoga`에서 import된 `GraphQLSever`에 넘겨진다. 이 구문은 서버에게 어떤 API operation들이 accept됐는지, 그리고 그들이 어떻게 처리되어야 하는지(how they should be resolved)를 말해준다.

**이 모든게 서버단에서 설정해 놓은 거라는 걸 유념하자**

서버를 테스트해보자.

```bash
node src/index.js
```

터미널에서 출력된 것이 알려주듯 우리의 서버는 `http://localhost:4000`에서 돌아가고 있다. 우리의 API를 실험해보기 위해 해당 주소로 들어가보자.

해당 주소로 접속하면 우리는 GraphQL Playground 를 보게 된다. 강력한 GraphQL IDE이다. 이를 통해 우리는 API의 능력들(capabilities)을 상호작용적으로 확인할 수 있다.

오른쪽의 schema 버튼을 통해 API 문서를 열 수 있다. 이 문서는 우리가 정의한 스키마에 따라 자동 생성되고 모든 API operations, 우리 스키마의 데이터 타입들을 보여준다.

이제 왼쪽 패널에 우리의 첫번째 GraphQL query를 작성해봅시다.

```
query{
  info
}
```

다음과 같은 응답이 온다.

```
{
  "data": {
    "info": "This is the API of a Hackernews Clone"
  }
}
```

실제로 GraphQL 쿼리는 최상단 키인 query에 담긴 string형태로 전달된다. 즉

```
'{"query":"query {\n  info\n}\n"}'
```

이러한 형태로 클라이언트에서 값을 보내게 된다. 이러한 데이터를 GrqphQL 서버가 파싱해서 쿼리처리를 한다.

이번에는 `resolvers`를 다음과 같이 바꿔보자

```js
const resolvers = {
  Query: {
    info: () => null,
  },
};
```

다음과 같은 응답이 온다.

```
{
  "data": null,
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Query.info.",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "info"
      ]
    }
  ]
}
```

에러가 뜬다! null 을 허용하지 않은 field에 null로 응답했기 때문에다. **GraphQL은 리졸버의(resolvers) 응답이 타입 정의를(typeDefs) 따르도록 강제한다.** 일종의 validation 역할도 해준다는 것이다. 때문에 GraphQL에 보내는 모든 요청들은 API가 리턴하는 데이터 구조를 확신할 수 있다(에러가 리턴되지 않는다면).

### GraphQL schema

GraphQL schema는 보통 GraphQL Schema Definition Language(SDL : GraphQL에서 정한 약어라서 다른 툴, 언어에서 쓰는 용어는 아니다)로 쓰여진다. 한마디로 타입스크립트처럼 데이터 구조와 함께 static typing을 해주는 역할이다.

모든 GraphQL 스키마는 세개의 특별한 root 타입 `Query`, `Mutation` 그리고 `Subscription`을 가지고 있다. 이 root 타입은 GraphQL이 제공하는 세가지 작동방식(queries, mutations and subscriptions)과 대응된다. 그 root 타입 바로 아래의 field들은 root field라고 부르며 사용 가능한 API 작업을 가리킨다.

예를 들어 위에서 보았던 단순한 GraphQL 스키마를 다시 보자.

```
type Query {     //=> Root type
  info: String!  //=> Root field
}
```

이 스키마는 오로지 하나의 root field info를 가지고 있다. mutations나 subscriptions를 GraphQL API로 보낼 때 이것은 언제나 root field로 시작해야 한다. 이번 예제에서는 하나만 썼기 때문에 실제로 API에서 받는 쿼리는 하나뿐입니다.

다른 예제를 봅시다.

```
type Query{
  users:[User!]!
  user(id:ID!):User
}

type Mutation{
  createUser(name:String!):User!
}

type User {
  id:ID!
  name:String!
}
```

이 경우에서는 우리는 세개의 root field를 가지고 있습니다. `Query`의 `users`, `user` 그리고 `Mutation`의 `createUser`까지. 추가적으로 `User` 타입은 스키마 정의가 완벽하게 하기위해 필요합니다(다른 field의 데이터타입으로 썼으니까!).

API operation은 이런 스키마 정으로 부터 어떻게 이루어질까요?
우리는 모든 API operation이 root field로 시작되어야함을 압니다. 하지만 우리는 root field의 타입이 다른 오브젝트일 때는 배우지 않았죠. 이번 경우 root field는 `[User!]!`, `User`, `User!` 세가지 타입을 리턴 받게 되어있습니다. 이전 `info`의 경우 타입은 `String`이었고 이는 스칼라타입에 해당합니다.

만약 root field의 타입이 객체일 경우 우리는 쿼리를 확장시켜서 날릴 수 있고, 이는 `selection set`이라고 불립니다.

쿼리 예시를 봅시다.

```
# Query for all users
query {
  users {
    id
    name
  }
}

# Query a single user by their id
query {
  user(id: "user-1") {
    id
    name
  }
}

# Create a new user
mutation {
  createUser(name: "Bob") {
    id
    name
  }
}
```

몇가지 중요한 사실이 있습니다.

- 이 예제에서 우리는 언제나 id, name을 User라는 객체를 리턴받을 때 써주었습니다. 우리는 둘중하나만 받을 수도 있지만 오브젝트 타입의 쿼리를 날릴 때는 해당 오브젝트의 field를 적어도 하나 이상은 필수적으로 적어야 합니다.
- selection set에 있는 field들은 root field의 유형이 필수인지 또는 목록인지 여부와 상관없이 쓸 수 있습니다. 보다 위에서 정의했던 스키마엣서는 세가지 root field가 모두 다른 타입을 가졌습니다. 한번 보시죠.
  - `users` : `[User!]!` -> 리스트(자바스크립트에서는 배열)를 반드시 리턴해야하고 요소는 반드시 User객체여야한다. 다만 요소 없이 빈 리스트도 받을 수 있습니다(배열이면서 원소가 없는 상태이기 때문입니다. []안의 User!가 꼭 1개 이상의 원소를 가져야한다는 뜻은 아니라는 거죠).
  - `user(id:ID)` : `User` -> 없으면 null을 리턴받을 수도 있고 있으면 반드시 User객체여야 합니다.
  - `createUser(name:String!)` : `User!` -> 이 오퍼레이션은 반드시 User객체를 리턴해야합니다.

이 정보를 제공함에 따라 `Prisma` 인스턴스는 데이터베이스 서비스에 대한 모든 액세스 권한을 가지며 나중에 들어오는 요청을 해결하는 데 사용할 수 있습니다.

## 9. A Simple Query

이번에는 해커뉴스의 기능을 본딴 API를 만들어 볼겁니다. 바로 유저들이 올린 포스트의 링크들로 이루어진 피드를 쿼리로 날리는 것입니다.

### 스키마 정의 확장하기(Extending the schema definition)

먼저 `Link`요소로 이루어진 리스트를 가져오는 `feed`라는 녀석을 작성해봅시다. 일반적으로 API에 새로운 기능을 추가할 때마다 프로세스는 거의 다음과 비슷할 겁니다.

1. GraphQL schema definition을 새로운 root field를 달아서 확장시킵니다.

2. 새로 달린 field에 대응되는 resolver를 작성합니다.

이런 프로세스는 _schema-driven_ 또는 *schema-first development*라고 불립니다.

이제 직접 작성해봅시다.

```js
// src/index.js
const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;
```

`feed`와 그 root field의 리턴으로 받을 타입인 `Link`를 작성했습니다. 모든 `Link`는 `id`, `description`, `url`로 이루어져있습니다.

### resolver 함수 가동하기(Implement resolver functions)

cf. resolve는 어떤 일을 풀거나 끝내다라는 뜻을 가지는데 resolver인경우 그냥 **'처리기'**라고 생각하면 편할것 같습니다. 우리가 스키마 를 정의 할 때 API에서 몇가지 동적을 할건지, 리턴타입이 어떤건지 정했다면, 그 정의에 따른 API역할을 해줄녀석을 resolver에 써주는 것이죠. 그니까 **처리기**가 맞습니다.

다음 스텝은 `feed` 쿼리에 대한 리졸브 함수를 작성하는 것입니다. 그리고 아직까지 언급되지 않은 사실이 있는데 root field 뿐만아니라 GraphQL 스키마에 정의된 모든 field들에 대해서 리졸버함수가 필요하다는 것입니다. 그래서 여러분은 `Link`타입의 `id`, `description`, `url`에대한 리졸버도 역시 만들어주어야 합니다.

```js
// 1 : 우리가 DB와 연결을 아직 안했기때문에 단순히 임의의 데이터를 써놓은 것입니다.
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2 : feed라는 root field에 대한 리졸버로 links를 바로 리턴해주는 함수를 작성했습니다.
    feed: () => links,
  },
  // 3 : 여기서 root field가 아닌, 타입으로 쓰인 객체의 field들도 리졸버를 만들었습니다. parent에 대해선 나중에 다루겠습니다.
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};
```

실행해봅시다. 이제부터 우리는 `feed`라는 쿼리도 날릴 수 있습니다.

```
//request
query {
  feed {
    id
    url
    description
  }
}
```

위의 쿼리에 대한 응답은 아래와 같습니다.

```
//response
{
  "data": {
    "feed": [
      {
        "id": "link-0",
        "url": "www.howtographql.com",
        "description": "Fullstack tutorial for GraphQL"
      }
    ]
  }
}
```

### 쿼리 처리 프로세스(The query resolution process)

이제 어떻게 GraphQL 서버가 쿼리를 수행하는지 알아봅시다. 여러분이 이미 보았듯이 GraphQL 쿼리는 GraphQL 스키마에서 타입정의된 field들로 구성되어있습니다.

다시 위에서 썼던 쿼리를 봅시다.

```
query {
  feed {
    id
    url
    description
  }
}
```

쿼리에 명시된 네개의 field는 `feed`, `id`, `url`, `description`이고 스키마 정의에서도 찾을 수 있습니다. 이제 우리는 스키마 정의에 있는 모든 field가 해당 field에 맞는 하나의 리졸버 함수에서 리턴된다는 것을 배울것입니다.

쿼리 처리 과정이 어떻게 보일지 상상되시나요? 실제로 GraphQL 서버에서 하는 일은 오로지 쿼리로 받은 field들에 대응되는 리졸버함수를 호출하고 패키징해서 쿼리의 모습과 동일하게 응답을 보내는 일이 전부입니다. 즉 쿼리 처리는 단순히 리졸브 함수를 호출하는 지휘 과정인 것이죠.

한가지 요상한 점은 `Link` 타입에 대한 리졸버입니다. 단순하고 쓸모 없어보이죠.

```js
Link: {
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => parent.url,
}
```

첫번째로 모든 GraphQL 리졸버 함수는 실제로 네가지 인풋 아규먼트를 받습니다. 우리의 시나리오에서는 나머지 세가지는 필요 없으므로 지워버릴 수도 있습니다. 걱정마세요. 무슨말인지 곧 알게 될겁니다.

첫번째 아규먼트 `parent`는 이전 리졸버 실행의 결과입니다. 근데 이게 무슨 의미일까요?

여러분이 이미 봤듯이 GraphQL 쿼리는 중첩될 수(can be nested)있습니다. 중첩된 각 단계는 하나의 리졸버 실행 레벨에 해당합니다. 위의 쿼리에서는 두개의 실행 레벨을 갖습니다.

첫번째 레벨에서는 `feed` 리졸버를 호출하고 저장된 `links`란 데이터 전체를 리턴합니다. 두번째 실행레벨에서는 GraphQL 서버는 똑똑하게 `Link`라는 타입을 이해하고 각 요소를 리턴합니다. 즉 `Link`라는 리졸버는 `parent`라는 객체로 `links`라는 리스트의 각 원소를 받는 것이죠(자바스크립트의 프로토타입메소드 map과 비슷합니다).

단순히 객체의 각 프로퍼티만 리턴하는 경우라면 `Link`리졸버는 필요없고 생략가능하며 서버는 그래도 같은 방식으로 동작합니다.

다만 이를테면 `feed.url`을 리턴해줄때 앞에 `https://`를 붙여서 리턴해주고 싶다면, Link라는 리졸버를 사용할 수 있습니다. 다음처럼요.

```js
Link: {
  id: (parent) => parent.id,
  description: (parent) => parent.description,
  url: (parent) => `https://${parent.url}`,
}
```
