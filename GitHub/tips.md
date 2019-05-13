##What is the difference between “git push” and “git push origin master”? 
“git push”는 이미 해당 브랜치에 대해 정의된 원격 저장소가 있다고 가정한다.
“git push origin master”는 특정 원격 저장소로 푸시하는 것을 나타내는데 이는 여러 원격저장소를 만든경우에 쓰이게 된다.
하나의 원격저장소에 커밋한다면 위 두가지 커맨드는 차이가 없다.

##Connecting to GitHub with SSH!
SSH는 HTTP처럼 통신규약의 일종, 그러니까 프로토콜인데
암호화된 키로 정보를 암/복호화 시켜 주고 받는것이다.
우리가 한번쯤 원격으로 터미널에 접속할 때 써보았듯 ssh는 원격 서버 및 서비스에 연결하고 사용자인증을 할 수 있다.
ssh키를 사용하면 유저네임이나 비밀번호를 제공하지 않고도 깃헙에(아마도 커맨드) 연결할 수 있다.
방법은 ssh키를 생성하고 ssh-agent에 추가(ssh-agent에 추가하면 ssh키에 추가보안층(extra layer of secufity)을 가지기 때문에 보다 안전하다) 후 깃헙 계정에 추가하는 것이다.

https://help.github.com/en/articles/connecting-to-github-with-ssh
1. 
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
