CREATE TABLE `projects` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    descriere text NOT NULL,
    tip varchar(255) NOT NULL,
    start_date date NOT NULL,
    end_date_intern date NOT NULL,
    end_date_client date NOT NULL,
    prioritar varchar(10) NOT NULL,
    files text NOT NULL
)engine=INNODB default charset=utf8mb4


CREATE TABLE `project_types` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    descriere text NOT NULL,
    tasks text NOT NULL
)engine=INNODB default charset=utf8mb4

CREATE TABLE `tasks_types` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    departament varchar(255) NOT NULL,
    descriere varchar(255) NOT NULL
)engine=INNODB default charset=utf8mb4


CREATE TABLE `tasks` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    client varchar(255) NOT NULL,
    project varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    descriere text NOT NULL,
    departament varchar(255) NOT NULL,
    tip varchar(255) NOT NULL,
    end_date_intern date NOT NULL,
    end_date_client date NOT NULL,
    files text NOT NULL,
    admin varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    comments text NOT NULL
)engine=INNODB default charset=utf8mb4

