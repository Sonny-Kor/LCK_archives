-- 비밀번호 변경법
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'workspace!';

-- host user password 확인
use mysql;
select host, user, authentication_string from user;


-- user 읽기 권한 설정
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'workspace!';
GRANT SELECT ON lckarcive.* TO 'new_user'@'localhost';
FLUSH PRIVILEGES;
