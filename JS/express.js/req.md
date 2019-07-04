req.params :
	/users/:id
	sub domain 의 ? 키와 값을 가지고 있다.
req.param(key) :
	?name=A
	query string 의 키를 입력하면 해당 값을 불러온다.
	없는 키라면 undefined 반환
req.body :
	post 키와 값
req.query :
	query string 의 키와 값