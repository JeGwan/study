## What is the difference between “git push” and “git push origin master”? 
https://stackoverflow.com/questions/29858663/what-is-the-difference-between-git-push-and-git-push-origin-master
“git push”는 이미 해당 브랜치에 대해 정의된 원격 저장소가 있다고 가정한다.
“git push origin master”는 특정 원격 저장소로 푸시하는 것을 나타내는데 이는 여러 원격저장소를 만든경우에 쓰이게 된다.
하나의 원격저장소에 커밋한다면 위 두가지 커맨드는 차이가 없다.

## Connecting to GitHub with SSH!
### Theoretically
https://help.github.com/en/articles/connecting-to-github-with-ssh
SSH는 HTTP처럼 통신규약의 일종, 그러니까 프로토콜인데
암호화된 키로 정보를 암/복호화 시켜 주고 받는것이다.
우리가 한번쯤 원격으로 터미널에 접속할 때 써보았듯 ssh는 원격 서버 및 서비스에 연결하고 사용자인증을 할 수 있다.
ssh키를 사용하면 유저네임이나 비밀번호를 제공하지 않고도 깃헙에(아마도 커맨드) 연결할 수 있다.
방법은 ssh키를 생성하고 ssh-agent에 추가(ssh-agent에 추가하면 ssh키에 추가보안층(extra layer of secufity)을 가지기 때문에 보다 안전하다) 후 깃헙 계정에 추가하는 것이다.
깃헙은 SAML(일종의 인증 정보를 주고받는 데이터포맷 마컵렝기지)을 사용하는 기관이고 SAML을 사용하는 기관에 SSH키를 이용하여 연결하고 싶을 땐 먼저 등록을 해야한다.
(그리고 깃헙은 1년이상 사용하지 않은 SSH키를 자동으로 지우거나 하는 방법으로 보안을 유지하고자 한다. 컴퓨터 소유자가 다른 사람이 되어버려 그사람이 원격저장소를 들락거릴 수도 있으니.)
### In practical use
이제 실질적 방법을 보자
#### 1. 내 컴퓨터에 이미 SSH키가 있는지 확인하자. 터미널에서 다음을 친다.
```
ls -al ~/.ssh
```
만약 내가 키를 가지고 있다면
```
id_dsa.pub
id_ecdsa.pub
id_ed25519.pub
id_rsa.pub
```
따위의 목록을 볼수 있을 것.  
가지고 있지 않다면 직접 생성해야한다.
#### 2. ssh-agent에 ssh키를 추가해주자.
추가하는 이유는 위에서 말했던것처럼 보안강화)  
2-1. (키가 있다면) 바로 2-3 진행   
2-2. (키가 없다면)
```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

을 터미널에 입력하자. your_email@example.com는 나의 이메일로 바꿔준다.
		> Enter a file in which to save the key (/c/Users/you/.ssh/id_rsa):[Press enter]
가 나오면 키가 저장되는 파일명을 커스터마이징 할 수 있는데 그냥 엔터치면 id_rsa 가 이름이 된다.
		> Enter passphrase (empty for no passphrase): [Type a passphrase]
		> Enter same passphrase again: [Type passphrase again]
여기서 적절히 나만의 암호문(일종의 비밀번호)를 설정해준다.
2-3.
먼저 ssh-agent 가 돌고 있는지 확인하자.
```
ssh-agent
```
를 터미널에 입력하면 돌고 있다면 정보가 뜬다.
돌고있지않다면 수동(manually)으로 시작해줘야하는데
```
eval $(ssh-agent -s)
```
을 입력해주면 
```
> Agent pid 59566
```
와 같이 뜬다.
이제 ssh-agent에 키를 추가해주는데
	ssh-add ~/.ssh/키이름
을 입력해주면 완료된다. (Could not open a connection to your authentication agent.가 뜨면 수동으로 시작해주고 추가하면된다.)
3. 깃헙 계정에 ssh키를 추가해주기.
		clip < ~/.ssh/id_rsa.pub
위의 명령어를 터미널에 치면 클립보드로 ssh키가 복사된다 파일명은 여러분이 정한것으로! 확장자 pub로(공개키!) 된걸 하면된다.
그다음 깃헙 -> settings에 들어가서 SSH and GPG keys 메뉴로 들어간다.
[New SSH key] 또는 [Add SSH key] 버튼을 누른다.
title은 내가 해당 키를 사용하는 컴퓨터를 분간할 수 있게 간단하게 작명하자.
key에 우리가 클립보드에 복사해놓은 공개키를 넣고 초록색의 [Add SSH key] 를 눌러주면 끝이다. (깃헙 계정 비밀번호를 다시 물어보는데 입력해주면된다~)
### Test
깃 배쉬를 열고 다음을 입력하자(깃헙에 ssh연결을 시도)
```
ssh -T git@github.com
```
Hi [UserName]! You've successfully authenticated, but GitHub does not provide shell access. 과 같이 뜬다면 성공한 것이다.

## git push 만을 사용하여 원격저장소에 업로드
1. 로컬에서 git init으로 프로젝트를 만든다.
2. 깃헙에서 레포지터리를 하나 만든다.
3. git remote add origin [remote repository URL] 을 터미널에 입력
4. git push origin master (git push [remote] [branch])
뒤에 오리진과 마스터는 원격저장소 명, 브랜치 명이 되겠다.

## 나는 여기서 origin, master를 빼고 바로 하고 싶은데 이러려면
참고 : Default behavior of “git push” without a branch specified
https://stackoverflow.com/questions/948354/default-behavior-of-git-push-without-a-branch-specified
1. ssh-agent를 켜준다.