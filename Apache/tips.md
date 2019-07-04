### apache. ssl. centos. https 인증서 위치와 컨피그 파일
위치 : /opt/apache/conf/ssl
컨피그 파일 : /opt/apache/conf/httpd.conf

### apache. php. 확장자 .php 주소에서 없애기
`nano /opt/apache/conf/extra/httpd-vhosts.conf`로 터미널에서 수정

httpd.conf 에서 다음과 같이 dirctory 태그를 추가한다.
```
<VirtualHost *:80>
    ServerAdmin my-email-id
    ServerName abc.com
    DocumentRoot /var/www/sites/foo/
    <Directory /var/www/sites/foo/>
        Options +FollowSymLinks +MultiViews +Indexes
        DirectoryIndex index.php
        AddType application/x-httpd-php .php
    </Directory>
</VirtualHost>
```
그리고 해당 디렉토리에서 .htaccess 파일을 만들고
```
Options +MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^([^\.]+)$ $1.php [NC,L]
```
을 써준다!
`service httpd restart`를 입력하면 적용된다.