# GraphQL React + Apollo Tutorial

## 1. Overview
이번엔 실제 프로젝트를 해보겠습니다.
우리는 Hackernews라는 사이트를 클론해볼겁니다.

여기서 우리가 써볼 기술은 다음과 같습니다.
### 1.1. Frontend
- React : 우리가 잘 아는 프론트엔드 프레임웍입니다.
- Apollo Client 2.1 : 프로덕션-레디 캐싱 기능을 탑재한 GraphQL 클라이언트입니다.
### 1.2. Backend
- graphql-yoga : 쉬운 설치와 퍼포먼스, 좋은 개발자 경험에 포커스를 맞춘 완전한 기능의 GraphQL 서버. 
- Prisma : 데이터베이스와 연결해주는 오픈소스 GraphQL API레이어

우리는 여기서 `create-react-app`으로 프로젝트를 만들겠습니다.

## 2. Why a GraphQL Client?
한마디로 말하자면 GraphQL 클라이언트는 우리의 반복적이고 찾기 어려운 일들을 할필요 없게 해줍니다.
예를들어 Query와 뮤테이션을 하위레벨의 네트워킹 세부사항이나 로컬 캐시를 유지시키는 일 없이 보낼 수 있습니다.
그니까 귀찮은 것들은 알아서 자동화 해놀테니 우리가 프론트에서 쓸 땐 Query문만 쓰면되는 거죠!
이러니 안쓰고 배깁니까(why build it yourself when you can use one of the amazing GraphQL clients out there?)!?

몇가지 사용 가능한 GraphQL 라이브러리가 있습니다. graphql-request 도 충분할지 몰라요. 하지만 우리 애플리케이션이 커지면 우리는 캐싱을 원하게 될테고 최적화된 UI업데이트를 쉽게 구현하고 싶을거에요. 그런면에서 우리는 Apollo Client와 Relay를 선택할 수 있습니다.

## 3. Apollo vs Relay

Realy : 릴레이는 페이스북에서 GraphQL을 2015년에 발표할 때 나란히 발표한 페이스북이 만든 GraphQL 클라이언트에요. 페이스북이 2012년 부터 GraphQL을 써오면서 모은 모든 깨달음들이 녹아있죠. 릴레이는 퍼포먼스의 최적화에 엄청 힘을 주었어요. 그래서 네트워크 트래픽이 좀 줄어들게 했죠. 재밌는 부분은 릴레이 자체는 사실 라우팅 프레임워크로 시작했어요. 결국에는 데이터 로딩 까지 함께 묶여진거죠. 그래서 GraphQL 에이파이를 갖춘 자바스크립트앱에 아주 강력한 매니지먼트 솔루션을 제공합니다.

헌데 릴레이의 퍼포먼스적 이점이 큰 만큼 배우는데 아주 많은 시간이 들어요. 릴레이가 꽤 복잡한 프레임워크거든요. Relay Modern이라고 불리우는 1.0버전이 릴리즈 된 후에는 좀 괜찮아 지긴 했지만 여러분이 바로 GraphQL을 쓰고 싶다면 적절한 선택지는 아닙니다.

Apollo Client 는 커뮤니티가 운영하고 이해하기 쉽게 만들어준 유연한 GraphQL 클라이언트에요. 아폴로는 모든 사람들이 쓰는 웹이나 모바일 앱환경에 맞는 라이브러리를 제작하는 것이 목표입니다. 지금 당장은 자바스크립트 클라이언트에서 리액트, 앵귤러, 엠버, 뷰와 같이 쓰거나 iOS, Android 클라이언트에서 아주 초기버전이 제공되고 있죠. 아폴로는 프로덕션-레디된 클라이언트입니다. 아주 쉬운 캐싱, 최적화 UI, subscription 지원등 많은 기능을 제공하죠.

## 4. Getting started
여기서는 Node-GraphQL 튜토리얼에서 만들었던 서버를 쓰겠습니다(위에 있어요!).
여러분이 리액트 애플리케이션을 만들고 나면 백엔드에서도 그에 대응되는 개발이 필요합니다.

### 4.1. Frontend

먼저 프로젝트 폴더를 만들어줍시다

```bash
create-react-app hackernews-react-apollo
# create-react-app CLI 도구가 없다면
# 다음과 같이 설치해주시고 위 명령문을 다시 쳐주세요.
# npm install -g create-react-app
```

프로젝트 폴더로 들어가서 `npm start`를 합시다. 근데 여기까진 다들 써보셨죠~?
여기 튜토리얼을 쓴 분은 `src`폴더 밑에 `components`, `styles` 폴더를 두고 관리했어요. 우리도 마찬가지로 만들어줍시다.

프로젝트 구조는 아래와 같을 겁니다.
```
├── README.md
├── node_modules
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── App.test.js
│   ├── components
│   │   └── App.js
│   ├── index.js
│   ├── logo.svg
│   ├── serviceWorker.js
│   └── styles
│       ├── App.css
│       └── index.css
└── yarn.lock // 이건 yarn으로 깔아서 생기는거니 신경쓰지마세용~
```
스타일링에 시간을 쏟지 않기 위해 여기서는 Tachyons라는 외부 css라이브러리를 가져오는데 안 가져와도 상관없습니다.

```html
<!-- public/index.html -->
<link rel="manifest" href="%PUBLIC_URL%/manifest.json">
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
<link rel="stylesheet" href="https://unpkg.com/tachyons@4.2.1/css/tachyons.min.css"/>
```
커스텀 css도 만드는데 별 중요한건 아닙니다.
```css
body {
  margin: 0;
  padding: 0;
  font-family: Verdana, Geneva, sans-serif;
}

input {
  max-width: 500px;
}

.gray {
  color: #828282;
}

.orange {
  background-color: #ff6600;
}

.background-gray {
  background-color: rgb(246,246,239);
}

.f11 {
  font-size: 11px;
}

.w85 {
  width: 85%;
}

.button {
  font-family: monospace;
  font-size: 10pt;
  color: black;
  background-color: buttonface;
  text-align: center;
  padding: 2px 6px 3px;
  border-width: 2px;
  border-style: outset;
  border-color: buttonface;
  cursor: pointer;
  max-width: 250px;
}
```

### 4.2. 아폴로 클라이언트 설치
터미널에서 다음과 같이 써줍시다
```bash
npm install apollo-boost react-apollo graphql
```

- `apollo-boost`는 아폴로 클라이언트를 쓸 때 유용한 몇가지 패키지들을 모아놓은 패키지입니다. 기능은 다음과 같습니다.
    - `apollo-client` : 모든 마법이 이루어지는 곳입니다.(이거 원작자가 제대로 설명을 안해놔요... 여튼 이렇게 써있어요!)
    - `apollo-cache-inmemory` : 우리가 추천하는 캐시입니다!
    - `apollo-link-http`: 원격 데이터를 가져올 때 쓰는 아폴로 링크입니다.
    - `apollo-link-error`: 에러 핸들링할 때 쓰는 아폴로 링크입니다.
    - `apollo-link-state`: 로컬 state 매니지먼트를 위한 아폴로 링크입니다.
    - `graphql-tag`: 우리의 Query와 뮤테이션을 gql함수로 바꿔주는 역할 입니다.
- `react-apollo` : 아폴로 클라이언트와 리액트를 연결해주는 녀석입니다.
- `graphql` : GraphQL 작동법을 페이스북 레퍼런스로 포함하고 있습니다. 아폴로 클라이언트는 이것의 몇가지 기능을 사용하기도 합니다.

이제 코딩하러 갑시다! 😄🚀

### 4.3. 아폴로 클라이언트 설정
아폴로는 모든 하위레벨의 네트워킹 로직을 추상화하고 GraphQL 서버를 위한 나이스한 인터페이스를 제공합니다. REST API와 달리 우리는 HTTP requests들을 더이상 만들고 다룰 필요가 없다는 거죠. 대신에 여러분은 아주 단순히 뮤테이션과 Query를 아폴로클라이언트 인스턴스를 통해 보내면됩니다. 

첫번째로 우리가 할것은 아폴로 클라이언트 인스턴스를 설정하는 거에요. 왜냐하면 GraphQL API의 엔드포인트가 어디인지 지정해주어야 하거든요.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker';

// 1 설치된 패키지에서 필요한 디펜던시들을 불러옶니다.
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'


// 2 여기서는 GraphQL API의 엔드포인트를 지정해줍니다.
const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

// 3 이제 httpLink 인스턴스와 메모리 캐싱을 담당하는 녀석의 인스턴스를 집어넣어줌으로써 아폴로클라이언트 인스턴스를 만들어줍니다.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

// 4 마지막으로 리액트의 루트컴포넌트를 Higher-Order Component인 아폴로 프로바이더로 감싸주고 client를 넣어줍니다.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.unregister();
```
됐습니다! 이걸로 우리의 앱에 데이터를 가져올 준비를 마쳤어요! 😎

### 4.4. Backend
여기서는 우리가 [GraphQL-Node Tutorial](https://www.howtographql.com/graphql-js/0-introduction)에서 만들었던 백엔드 서버를 쓸 거에요. 우리의 프로젝트 폴더에서 다음과 같이 터미널에 입력 하여 서버 프로젝트를 다운 받읍시다.

```bash
curl https://codeload.github.com/howtographql/react-apollo/tar.gz/starter | tar -xz --strip=1 react-apollo-starter/server
```

우리의 프로젝트에 server 라는 폴더가 생기고 그 밑에 백엔드 서버를 만들었던 파일을 가져왔어요.(윈도우이신 분들은 curl 같은 커맨드를 위해 깃 배쉬를 이용하세요!)

서버를 시작하기 전에 빠르게 메인 컴포넌트들을 이해하고 넘어갑시다.

- `prisma` : 프리즈마 셋업에 관련된 파일을 모아 놓은 디렉토리에요. 프리즈마 클라이언트는 GraphQL 리졸버에서 데이터베이스를 엑세스할 때 사용됩니다.

    - `prisma.yml` : 프리즈마 프로젝트의 루트 설정 파일이에요.
    - `datamodel.prisma` : SDL을 써서 우리의 데이터모델을 정의합니다. 프리즈마를 쓸 때 데이터모델은 데이터베이스 스키마를 describe하는데 쓰입니다.

- `src` : 이 디렉토리는 GraphQL의 서버를 위한 소스파일들을 가지고 있어요.

    - `schema.graphql` : 이것은 어플리케이션의 스키마를 가지고 있어요. 한마디로 어떤 API 동작이 가능한지 정의해주는 거에요.

    - `generated/prisma-client` : 자동생성되는 프리즈마 클라이언트(type-safe 데이터베이스 엑세스 라이브러리, ORM과 비슷하다고 보시면 됩니다)가 있어요. 
    - `resolvers` : 애플리케이션 스키마에 정의된 API동작들을 위한 리졸버함수들로 이루어져 있습니다.
    - `index.js` : GraphQL 서버의 엔트리포인트입니다.

언급된 파일들중 오로지 애플리케이션 스키마가 정의된 `server/src/schema.graphql`만이 프론트엔드 개발을 하는 우리와 관련이 있는 파일입니다. 이 파일은 GraphQL 스키마를 가지고 있습니다. 우리가 프론트엔드 엡에서 보낼 수 있는 모든 API 동작이 정의되어 있죠.

다음과 같이 보입니다.

```graphql
type Query {
  feed(filter: String, skip: Int, first: Int, orderBy: LinkOrderByInput): Feed!
}

type Feed {
  links: [Link!]!
  count: Int!
}

type Mutation {
  post(url: String!, description: String!): Link!
  signup(email: String!, password: String!, name: String!): AuthPayload
  login(email: String!, password: String!): AuthPayload
  vote(linkId: ID!): Vote
}

type AuthPayload {
  token: String
  user: User
}

type User {
  id: ID!
  name: String!
  email: String!
}

type Subscription {
  newLink: LinkSubscriptionPayload
  newVote: VoteSubscriptionPayload
}
```

이 스키마는 다음과 같은 동작을 가능케 합니다.

- Queries : 
    - feed : 백엔드에서 모든 링크를 가져옵니다. 여기에 필터, 소팅, 페이지네이션을 위한 매개변수가 있다는 것을 기억해두세요.

- Mutations : 
    - post : 인증이 된 유저에게 새로운 링크를 만들 수 있게 해줍니다.
    - signup : 새로운 계정을 만들 수 있게 합니다.
    - login : 기존 유저가 로그인 할 수 있게 합니다.
    - vote : 인증된 유저가 존재하는 링크에 투표할 수 있게합니다.

- Subscriptions :
    - newLink : 링크가 생성될 때 실시간 업데이트를 받을 수 있게합니다.
    - newVote : 투표가 되면 실시간으로 업데이트를 받스빈다.

예를 들어 다음과 같은 `feed` Query를 통해 처음 10개의 링크를 서버로부터 가져올 수 있습니다.

```graphql
{
  feed(skip: 0, first: 10) {
    links {
      description
      url
      postedBy {
        name
      }
    }
  }
}
```

아니면 새로운 유저 생성을 위해 `signup` 뮤테이션을 쓸 수도 있습니다.

```graphql
mutation {
  signup(
    name: "Sarah",
    email: "sarah@graph.cool",
    password: "graphql"
  ) {
    token
    user {
      id
    }
  }
}
```

### 4.5. 프리즈마 데이터베이스 서비스 디플로이 하기
이제 여러분의 서버를 키고 Query나 뮤테이션을 보내는 일이 남았습니다. 프리즈마 프로젝트가 디플로이되어서 GraphQL 서버가 여기에 접근할 수 있게 해야합니다.

서비스를 배포하기 위해서 여러분이 해야할 모든 것은 서버의 디펜던시들을 설치하고 `server` 디렉토리 안에서 `prisma deploy` 커맨드를 호출하는 것입니다.

우리 터미널에서 `server`디렉토리로 이동해서 다음과 같은 커맨드를 쳐줍시다.
```bash
cd server
yarn install
yarn prisma deploy
```
만약 프리즈마를 글로벌로 설치해놓으셨다면 마지막줄을 단순히 `prisma depoly` 라고 하셔도 됩니다.

그럼 우리한테 프리즈마서버를 어떻게 열건지 물어보게되는데 기존에 있던 DB와도 연결하는 옵션이 있어요. 일단 이 튜토리얼에서 하라는대로 [Demo server + MySQL database], [github authenticate], [us region으로 데모 서버 선택] 해줘서 프리즈마가 제공하는 데모서버로 시험해보아요.

### 4.6. 서버 탐험하기
프리즈마의 엔드포인트를 통해 우리는 이제 서버를 탐험해볼 수 있습니다.
`server`디렉토리로 가서 `yarn start`를 해줍시다. 우리가 실행한 스크립트는 `package.json`에 `start`라는 이름으로 있습니다. 그냥 `node src/index.js`를 실행한 것이죠. 이것은 GraphQL 플레이그라운드를 띄워주었습니다. 우리가 API를 탐험해주게하는 일종의 포스트맨 같은 API를 실험하기 위한 GraphQL IDE라고 보시면 됩니다. 자동 추천과, 신택스 하이라이팅, 그리고 DOCS, SCHEMA등을 볼 수 있게 해줍니다. GraphQL API를 만들고 테스트하기 위한 좋은 도구이죠.

가운데 플레이 버튼을 누르면 여러분이 왼쪽에 쓰신 Query를 서버로 보내게 되고 응답은 오른쪽 패널에 뜨게됩니다.

플레이그라운드에 다음 뮤테이션 Query를 입력해봅시다. 우리가 다음에서 두가지 뮤테이션을 한꺼번에 썼으므로 뮤테이션들은 이름을 가져야합니다. 이 경우엔 `CreatePrismaLink` 과  `CreateApolloLink`이죠. 그리고 실행 버튼을 누르면 둘중하나를 선택해서 실행할 수 있습니다. 차례대로 실행해봅시다!

```graphql
mutation CreatePrismaLink {
  post(
    description: "Prisma turns your database into a GraphQL API 😎",
    url: "https://www.prismagraphql.com"
  ) {
    id
  }
}

mutation CreateApolloLink {
  post(
    description: "The best GraphQL client for React",
    url: "https://www.apollographql.com/docs/react/"
  ) {
    id
  }
}
```

이것은 두개의 새로운 `Link` 레코드를 데이터베이스에 생성합니다. 여러분은 다음의 커리로 이것이 잘 작동했는지 확인해볼 수 있습니다.

모든 것이 잘 진행 됐다면 응답은 다음과 같을 것입니다. ID는 당연히 다를겁니다. 프리즈마에서 생성한 ID는 전역적으로 유일하거든요.
```graphql
{
  "data": {
    "feed": {
      "links": [
        {
          "id": "cjcnfwjeif1rx012483nh6utk",
          "description": "The best GraphQL client",
          "url": "https://www.apollographql.com/docs/react/"
        },
        {
          "id": "cjcnfznzff1w601247iili50x",
          "description": "Prisma turns your database into a GraphQL API 😎",
          "url": "https://www.prismagraphql.com"
        }
      ]
    }
  }
}
```
판타스틱하게 여러분의 서버가 작동하고 있습니다! 👏

백엔드에서 프리즈마는 2개의 GraphQL API를 위한 레이어를 가지고 있는데요.
하나는 database와 직접 연결되어 ORM과 CRUD를 해주는 녀석이고, 다른 하나는 frontend에서 보내는 Query를 응답할 때 쓰는 녀석이에요. 후자에 우리가 타입데피니션이나 리졸버 함수를 달아서 열죠. 플레이그라운드도 후자녀석이 열어 놓은 애플리케이션 서버구요.

## 5. Query들 : 링크 불러오기

### 5.1. 리액트 컴포넌츠를 준비하기 😆
첫번째 기능으로 우리는 `Link`요소를 불러오고 보여주는 녀석을 만들어볼 거에요. 먼저 하나의 링크를 렌더링 해주는 녀석을 만들어봅시다.

여기서 튜토리얼 작성자는 클래스형 컴포넌트를 썼는데 저는 함수형 컴포넌트가 더 깔끔할 것 같아 다음과 같이 바꾸었습니다.

```js
import React from "react";

export default function Link({
  link: { description = "no description!", url = "no url!" }
}) {
  return (
    <div>
      <div>{description}</div>
      <div>{url}</div>
    </div>
  );
}
```

ES6 문법인 Destructuring assignment를 활용해서 오는 값을 `this.props.link.description`따위로 쓰지 않고 바로 `description`으로 썼어요. 동시에 값이 없을 경우를 대비해서 기본 값도 할당해 주었어요.

혹시 Destructuring assignment을 모르시는 분들을 위해 아래 예시를 만들어놓았어요.
```js
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
```

이제 우리가 만든 `Link` 컴포넌트를 이용해 모든 리스트를 디스플레이 해봅시다. 먼저 `LinkList`라는 컴포넌트를 만들어봅시다.
```js
// src/components/LinkList.js
import React from "react";
import Link from "./Link";
export default function LinkList() {
  const linksToRender = [
    {
      id: "1",
      description: "Prisma turns your database into a GraphQL API 😎",
      url: "https://www.prismagraphql.com"
    },
    {
      id: "2",
      description: "The best GraphQL client",
      url: "https://www.apollographql.com/docs/react/"
    }
  ];

  return (
    <div>
      {linksToRender.map(link => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
}
```

여기서는 컴포넌트에 적절한 값을 전달하기 위해 로컬 mock data(모조 데이터)를 썼어요. 곧 실제 서버에서 데이터를 가져오는 것으로 대체할 예정이니 조금만 기다리세요. patience, young Padawan!👐

이제 실제 `App.js`에 해당하는 컴포넌트를 붙여줍시다.
```js
// src/components/App.js
import React from 'react';
import '../styles/App.css';
import LinkList from './LinkList'
function App() {
  return (
    <LinkList/>
  );
}

export default App;
```
이제 `npm start`로 리액트 개발서버를 켜서 실제로 잘 적용이 돼었나 확인해주세요.

### 5.2. GraphQL Query 쓰기
다음으로 우리는 실제 데이터베이스에 저장된 링크들을 불러올 거에요. 먼저 할일은 API로 보낼 GraphQL query를 작성해보는 겁니다.

다음과 같이 작성해주세요.
```
{
  feed {
    links {
      id
      createdAt
      description
      url
    }
  }
}
```
플레이그라운드를 이용하면 쉽게 이 Query를 실험해볼 수 있어요.

그런데 자바스크립트 코드에서는 어떻게 쓰면 될까요?

### 5.3. Queries with Apollo Client
아폴로를 사용할 때 쿼리를 보내는 방법은 두가지가 있어요.

첫번째, `ApolloClient`를 이용해 바로 쿼리를 보내는 방법이에요. 이 방법은 바로 데이터를 가져오고 여러분에게 응답을 프라미스(Promise)로 받을 수 있게 해줘요.

예를 들어 이렇게 짜여집니다.
```js
client.query({
  query: gql`
    {
      feed {
        links {
          id
        }
      }
    }
  `
}).then(response => console.log(response.data.allLinks))
```
하지만 리액트를 사용할 때 보다 선언적 방법은 아폴로에서 제공해주는 render prop API(데이터를 페칭하고 렌더링해주는 컴포넌트)를 이용해서 가져오는 방법이에요.

이렇게 하면 우리가 할 것은 그냥 쿼리를 짜고 그 쿼리를 `<Query/>`라는 컴포넌트에 props로 건내어주기만 하면돼요. 컴포넌트는 라이프사이클에 맞게 알아서 데이터를 페칭해주고, 컴포넌트의 render prop function에서 사용할 수 있어요.

이러한 방식에서 여러분이 데이터를 가져오는 로직은 매번 거의 비슷할 겁니다.

1. `gql`파서 함수를 이용해 자바스크립트 상수(constant)로 쿼리문을 만듭니다.
2. `<Query />`컴포넌트를 사용하여 prop으로 쿼리문을 건냅니다.
3. 쿼리의 결과는 컴포넌트의 `render prop function`안에서 접근하고 사용하게 됩니다.

아직은 잘 감이 안오니까 눈으로 직접 확인해볼까요~? 👀

```js
// src/components/LinkList.js
import React from "react";
// 1. 먼저 `Query`컴포넌트와 `gql`파서 함수를 불러옵시다.
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";
// 2. gql 파서 함수를 이용하여 다음 쿼리를 const 변수에 넣어줍시다.
// functionName`...` 이런 문법이 익숙치 않으신가요?
// ES6의 Tagged template literal이에요. 요건 아래에서 설명해드릴테니
// 일단 넘어갑시다!
const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default function LinkList() {
  const linksToRender = [
    {
      id: '1',
      description: 'Prisma turns your database into a GraphQL API 😎',
      url: 'https://www.prismagraphql.com',
    },
    {
      id: '2',
      description: 'The best GraphQL client',
      url: 'https://www.apollographql.com/docs/react/',
    },
  ]
  // 3. 리턴하는 JSX를 Query 컴포넌트로 대체하고 query라는 props에 위에서 선언한 쿼리문을 넣어줍시다.
  return (
    <Query query={FEED_QUERY}>
      {() => linksToRender.map(link => <Link key={link.id} link={link} />)}
    </Query>
  );
}
```
이로써 데이터를 가져오는 코드를 짰어요! 하지만 서버에서 가져온 데이터를 디스플레이 하지는 않고 기존에 만들어놓은 모조 데이터를 렌더링하고 있어요. 이제 `Query` 컴포넌트를 이용해 가져온 데이터를 이용하는 방법을 알려드릴게요.

**잠깐 ! Tagged template listerals에 관해**
```js
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
```

이제 진짜 서버에서 가져온 데이터를 이용해봅시다!
```js
// src/components/LinkList.js
import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "./Link";

const FEED_QUERY = gql`
  {
    feed {
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

export default function LinkList() {
  return (
    <Query query={FEED_QUERY}>
      {
        ({loading, error, data})=>{
          if(loading) return <div>Fetching...</div>
          if(error) return <div>error!</div>
          const {links} = data.feed;
          return (
            <div>
              {links.map(link=><Link key={link.id} link={link}/>)}
            </div>
          )
        }
      }
    </Query>
  );
}
```

`Query` 컴포넌트의 `render prop function`을 통해 가져오는 식으로 바꾸었습니다. 쿼리 안에 단일 child로 넣은 저 녀석이 `render prop function`(이제 짧게 rpf라 칭하겠습니다)입니다. 아폴로는 쿼리 컴포넌트를 쓸 때 차일드로 들어온 rpf에게 세가지 props를 전달합니다. 이 props 들은 네트워크 리퀘스트의 상태에 대한 정보를 제공해줍니다.
하나 하나 봅시다.

1. `loading` : 응답이 도착하기 전까지는 계속 `true`입니다.
2. `error` : 요청이 실패할 경우 이 필드는 무엇이 잘못되었는지를 쥐고 있습니다.
3. `data` : 이 필드가 실제로 서버에서 받은 데이터입니다. 여기서는 `links`라는 프로퍼티를 가지고 있고 `Link`라는 요소로 이루어진 리스트입니다.

사실 주입된 props는 더 많은 기능을 쥐고 있습니다. [API Docs](https://www.apollographql.com/docs/react/essentials/queries/#render-prop)에서 확인하실 수 있어요.

## 6. Mutations : Link 만들기
이번에는 아폴로를 통해 어떻게 Mutation을 보내는지 알아볼 거에요. 사실 이전에 했던 쿼리랑 별 다른건 없어요. 마지막 두단계가 살짝 다를 뿐이죠.

1. `gql` 파서 함수로 자바스크립트 상수로서 mutation문을 써줍니다.
2. `<Mutation />` 컴포넌트에 mutation문과 변수들을 props 로 넣어줍니다.
3. `render prop function`에 뮤테이션 함수를 넣어 사용합니다.

### 6.1. 리액트 컴포넌트 준비
이전처럼 먼저 리액트 컴포넌트 부터 만듭시다.

`src/components/CreateLink.js`를 만들어주세요.
```js
import React, { Component } from 'react'

class CreateLink extends Component {
  state = {
    description: '',
    url: '',
  }

  render() {
    const { description, url } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({ description: e.target.value })}
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={e => this.setState({ url: e.target.value })}
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button onClick={`... you'll implement this 🔜`}>Submit</button>
      </div>
    )
  }
}

export default CreateLink
```
여기서는 유저가 `url`, `description` 두가지 인풋 값으로 `Link`를 만들게 했습니다. 이데이터는 해당 컴포넌트의 `state`에 저장되고 뮤테이션이 보내질 때 쓰입니다.

### 6.2. 뮤테이션 쓰기

먼저 mutation을 자바스크립트 코드로 써봅시다. 


```js
// src/components/CreateLink.js
const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`
```