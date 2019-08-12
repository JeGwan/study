# GraphQL-node Tutorial

여기서는 다음과 같은 기술을 쓰게 된다.

## 쓸 도구들

- graphql-yoga : 쉬운 설치 / 퍼포먼스 / 좋은 개발 경험에 포커스를 맞춘 Fully-featured Graphql server 이다. Express, apollo-server, graphql-js 등 위에서 동작한다.

- prisma : Prisma 는 전통적인 ORM을 대체한다. 프리즈마 클라이언트는 GraphQL resolvers를 선언하거나 데이터베이스 액세스를 단순화 시켜주는 역할을 한다.

- GraphQL Playground : 이것은 GraphQL IDE로 GraphQL API에서 쿼리를 보내걱나 변화를 주는 등의 기능을 인터랙티브하게 사용할 수 있게 테스트하고 탐험해줄 수 있게 한다. 한마디로 GraphQL의 Postman이다. 다만 GraphQL Playground가 다른 점은
  - 사용가능한 모든 API 동작에 대해 포괄적인 문서를 자동생성해준다.
  - 자동완성과 Syntax 하이라이팅이 지원되는 쿼리, mutations, subscription 을 쓸 수 있는 에디터를 제공한다.
  - 쉽게 API oreration을 공유할 수 있게 해준다.

## 기대할 수 있는 것들!

여기서는 해커뉴스를 클론하는 API를 만든다. 이를 통해

- GraphQL schema를 정의하고 그에 대응되는 resolver function을 만드는 것으로부터 GraphQL 서버가 기본적으로 어떻게 동작하는지 배운다. 이 시점까지는 데이터는 메모리(아마도 RAM)에 저장되기 때문에 영구적이지 않다.

- 누구도 데이터를 계속 저장하지 못하는 서버를 원하지 않기 때문에 우리는 데이터베이스 레이어를 추가할 겁니다. 데이터베이스 레이어는 Prisma를 통해 구동되며 우리의 GraphQL server 와 Prisma client를 통해 연결됩니다.

- 한번 우리가 데이터베이스를 연결 시키면, 우리는 보다 진보된 기능을 API에 추가할 수 있습니다.

- signup/login 등 유저의 인증 API를 통해 시작할 것입니다. 이를 통해 어떤 유저에게 어떠한 API 동작을 줄지 권한을 체크할 수 있을 것입니다.
- 그 다음 파트는 실시간 기능을 우리의 API에 추가해볼 겁니다. 바로 GraphQL subscriptions 을 이용해서요.

- 마지막으로, API 사용자의 API에서 검색 한 항목의 목록을 필터링 및 페이지네이션 기능을 추가하여 제한할 수 있습니다.

## Getting Started

이번 섹션에서는 우리의 GraphQL서버를 위한 프로젝트를 준비하고 첫번째 GraphQL 쿼리를 선언해 볼 것입니다. 마지막에는 이론을 조금 설명하고 GraphQL schema에 대해 배워볼 겁니다.

## 프로젝트 만들기

이 튜토리얼은 우리에게 어떻게 GraphQL서버를 처음부터 빌드하는지 알려줍니다. 먼저 디렉토리 하나를 만듭시다.

```bashß
mkdir hackernews-node
cd hackernews-node
yarn init -y
# 또는
npm init -y
```

## 하나의 GraphQL server 만들기

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

## graphql-yoga 의 기능

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
    info: () => `This is the API of a Hackernews Clone`
  }
};

// 3
const server = new GraphQLServer({
  typeDefs,
  resolvers
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
    info: () => null
  }
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

## GraphQL schema

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

## A Simple Query

이번에는 해커뉴스의 기능을 본딴 API를 만들어 볼겁니다. 바로 유저들이 올린 포스트의 링크들로 이루어진 피드를 쿼리로 날리는 것입니다.

## 스키마 정의 확장하기(Extending the schema definition)

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

## resolver 함수 가동하기(Implement resolver functions)

cf. resolve는 어떤 일을 풀거나 끝내다라는 뜻을 가지는데 resolver인경우 그냥 **'처리기'**라고 생각하면 편할것 같습니다. 우리가 스키마 를 정의 할 때 API에서 몇가지 동적을 할건지, 리턴타입이 어떤건지 정했다면, 그 정의에 따른 API역할을 해줄녀석을 resolver에 써주는 것이죠. 그니까 **처리기**가 맞습니다.

다음 스텝은 `feed` 쿼리에 대한 리졸브 함수를 작성하는 것입니다. 그리고 아직까지 언급되지 않은 사실이 있는데 root field 뿐만아니라 GraphQL 스키마에 정의된 모든 field들에 대해서 리졸버함수가 필요하다는 것입니다. 그래서 여러분은 `Link`타입의 `id`, `description`, `url`에대한 리졸버도 역시 만들어주어야 합니다.

```js
// 1 : 우리가 DB와 연결을 아직 안했기때문에 단순히 임의의 데이터를 써놓은 것입니다.
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2 : feed라는 root field에 대한 리졸버로 links를 바로 리턴해주는 함수를 작성했습니다.
    feed: () => links
  },
  // 3 : 여기서 root field가 아닌, 타입으로 쓰인 객체의 field들도 리졸버를 만들었습니다. parent에 대해선 나중에 다루겠습니다.
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
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

## 쿼리 처리 프로세스(The query resolution process)

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
