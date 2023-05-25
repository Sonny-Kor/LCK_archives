
CREATE DATABASE LCKArcive 
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;


USE LCKArcive;


-- 팀(Team) 테이블
CREATE TABLE team (
  team_id INT PRIMARY KEY AUTO_INCREMENT,
  team_name VARCHAR(255) NOT NULL,
  team_logo VARCHAR(255)
);

-- 선수(Player) 테이블
CREATE TABLE player (
  player_id INT PRIMARY KEY AUTO_INCREMENT,
  player_name VARCHAR(255) NOT NULL,
  player_nickname VARCHAR(255) NOT NULL,
  player_img VARCHAR(255),
  position VARCHAR(255),
  team_id INT,
  FOREIGN KEY (team_id) REFERENCES team(team_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- 스케줄(match) 테이블
CREATE TABLE `match` (
  match_id INT PRIMARY KEY AUTO_INCREMENT,
  match_date DATETIME NOT NULL,
  team1_id INT,
  team1_score INT,
  team2_id INT,
  team2_score INT,
  FOREIGN KEY (team1_id) REFERENCES team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (team2_id) REFERENCES team(team_id) ON DELETE CASCADE ON UPDATE CASCADE
);