## Article on setting project goals
먼저 생각하고 고민하고 기획한 다음 툴을 쓰자.
달성하고 싶은 것
1. 돈을 번다
2. 사람들을 즐겁게 한다
3. 사람들이 노는 모든 행위를 주선, 참여, 공유할 수 있게 한다.

## What software do I need to build a website?
1. 웹페이지 생성 편집 (에디더 vscode)
2. 웹서버에 파일 업로드
	1. 어떤 호스팅 업체에게 서버의 공간을 산다.  
	2. FTP 접근 정보를 받는다.  
	3. 보통은 filezilla 로 업로드한다.
3. 웹페이지 보기(브라우저 chrome)

## Introduction to the server side
http request로 데이터를 전달하는 방법
1. url, method
2. query string
3. post data
4. cookie
	
Web frameworks
프레임워크가 하는일
1. URL핸들러로 라우팅  
	- httpRequest 와 httpResponse 객체로 직접 통신  
	- 메소드 별 처리
2. 데이터베이스와 상호작용 : Object-relational mapping 객체관계형 매퍼를 통해 DB에 들어갈 데이터의 형식을 올바른 타입인지, 악의적인 방식이 아닌지 체크 한다.
3. 유저 인증과 세션 지원
4. 출력형식(예: HTML, JSON, XML) : 템플릿 렌더링을 지원한다.
5. 웹공격에 대처하기 위한 보안강화
https://developer.mozilla.org/ko/docs/Learn/Server-side/First_steps/Web_frameworks

Express_Nodejs/Introduction
Express_Nodejs/development_environment
Node app 자체가 웹서버이면서 웹어플리케이션 역할을 동시 수행한다.
이미지 축소 패키지 : shrink images 로 검색
VHOST 패키지 : connect 패키지로 domain, app 을 연결
로그남기는 패키지 : morgan
ORM(데이터베이스를 자바스크립트 객체화) 패키지 : orm 으로 검색.... 이를테면 MongoDB가 Mongoose로
	
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/
