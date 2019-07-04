### mysql. 해당 테이블에 대한 댓글 개수 쉽게 가져오는 쿼리
select board.*,(select count(*) from my_reply where table_number=board.number) as reply from my_board AS board where id=? order by board.number desc;

### 숫자 데이터 타입
3자리(255까지) > tinyint(3) : 1byte;

5자리(6만까지) > smallint(5) : 2byte;

8자리(1677만까지) > mediumint(8) : 3byte;

10자리(42억9496만까지) > int(10) : 4byte;

20자리(조이상) > bicint : 8byte;
