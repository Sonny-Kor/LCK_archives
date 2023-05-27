

CREATE DATABASE LCKArchive 
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;


USE LCKArchive;


-- 팀(Team) 테이블
CREATE TABLE team (
  team_id INT PRIMARY KEY AUTO_INCREMENT,
  team_name VARCHAR(255) NOT NULL,
  team_logo VARCHAR(255)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 선수(Player) 테이블
CREATE TABLE player (
  player_id INT PRIMARY KEY AUTO_INCREMENT,
  player_name VARCHAR(255) NOT NULL,
  player_nickname VARCHAR(255) NOT NULL,
  player_img VARCHAR(255),
  player_position VARCHAR(255),
  team_id INT,
  FOREIGN KEY (team_id) REFERENCES team(team_id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 경기(match) 테이블
CREATE TABLE _match (
  match_id INT PRIMARY KEY AUTO_INCREMENT,
  match_date DATE NOT NULL,
  team1_id INT,
  team1_score INT,
  team2_id INT,
  team2_score INT,
  youtube_link VARCHAR(255),

  FOREIGN KEY (team1_id) REFERENCES team(team_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (team2_id) REFERENCES team(team_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

CREATE TABLE administer (
  a_id INT PRIMARY KEY NOT NULL,
  a_pw VARCHAR(255) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

DESC team;
DESC player;
DESC _match;

DESC administer;