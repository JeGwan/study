한개의 서버, 2개의 domain, 2개의 node앱을 다중호스트화
1. 다른 웹서버에서 프록시 연결
2. node-http-proxy 미들웨어?
3. vhost 미들웨어 사용 >> connect 이게 제일 맘에 들음.
	connect()
		.use(connect.vhost('foo.com', fooApp))
		.use(connect.vhost('bar.com', barApp))
		.use(connect.vhost('*.com', mainApp))
이런식으로 쓸수가 있음... 해당 도메인에 따라 연결해주는 nodeApp이 다름.
  