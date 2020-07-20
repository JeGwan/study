## php. json_encode 시 한글 깨지는문제
json_encode(행렬또는객체,JSON_UNESCAPED_UNICODE);

## php. real escape 이스케이프 문
$id = mysqli_real_escape_string($conn,$_POST["id"]);

## wamp.bitnami. html, php 수정파일 바로 업뎃 안 될 때
php.ini 가서 opcache.enable 을 1에서 0으로 바꾼다.

## php. trim(string,charlist)
string으로 들어온 문자의 앞 뒤 화이트스페이스 제거하고 반환(화이트 스페이스에 \n도 포함됨.)
또 charlist에 옵션으로 뭘 넣어주면 해당하는 글자도 삭제
```php
trim("h123hh45","h"); // return 12345
```

## php. array_key_exists(찾을 값,어레이)
어레이에서 찾을 값의 키가 있으면 true 반환 없으면 false반환

## php. 문자열 찾기
strpos($str, $needle);
$str에서 $needle이 처음 나타나는 위치 반환.
만약 없을 땐 false를 반환.

## php. implode explode
explode : 문자열을 특정 구분 기호를 통해 배열로 바꿈 == js의 split
implode : 배열을 특정 구분기호를 삽입해서 문자여롤 바꿈 == js의 join

## php 에러메시지 보이기/보이지않기
보이기
```php
error_reporting(E_ALL);
ini_set("display_errors", 1);
```
보이지 않기
```php
ini_set("display_errors",0);
```
## php. strtotime
strtotime ( 출력옵션 , 시간 );
시간을 넣지 않으면 현재시간에 대한 출력옵션 값으로 출력함.
예를 들어 2017년 10월 24일을 ymd로 표시하면
```php
strtotime("ymd","2017-10-24");
```
이고 출력옵션에 몇 주전, 몇 달전 등을 표시할 수 있음.

## php DB 연결 실패했을 때 catch
```php
$link = mysql_connect('mysql_host', 'mysql_user', 'mysql_password');
if(!is_resource($link)) {
  echo "서버 접속 실패\n";
} else {
  ...
}
```
따위로 할 수 있다. 즉, $link를 is_resource를 통해 연결 됐는지 여부를 파악가능