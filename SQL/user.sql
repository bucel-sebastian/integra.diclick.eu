CREATE TABLE `users`(
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    unicId varchar(255) not null,
    name varchar(255) not null,
    username varchar(255) not null,
    email varchar(255) not null,
    telefon varchar(255) not null,
    password varchar(255) not null,
    company varchar(255) not null,
    function varchar(255) not null,
    role varchar(255) not null,
    clientAt varchar(255) not null,
    language int(11) NOt NULL,
    image text not null,
    last_log_in datetime,
    create_date datetime not null
)engine=INNODB default charset=utf8mb4

CREATE TABLE `delegated_persons` (
	id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    prenume varchar(255) NOT NULL,
    cnp varchar(255) NOT NULL,
    serie_ci varchar(5) NOT NULL,
    nr_ci varchar(255) NOT NULL,
    implicit_company varchar(5) NOT NULL
)engine=INNODB default charset=utf8mb4


CREATE TABLE `clients` (
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    status varchar(255) NOT NULL
)

CREATE TABLE `leads` (
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    unicId varchar(255) NOT NULL,
)


CREATE TABLE `companies` (
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    firma varchar(255) NOT NULL,
    status varchar(255) NOT NULL
    
)

CREATE TABLE `reset_password_tokens`(
    id int(11) NOT NULL,
    unicId varchar(255) NOT NULL,
    token varchar(255) NOT NULL,
    create_date datetime NOT NULL
)engine=INNODB default charset=utf8mb4

CREATE TABLE `admin_users`(
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    prenume varchar(255) NOT NULL,
    username varchar(255) not null,
    email varchar(255) NOT NULL,
    telefon varchar(255) NOT NULL,
    functie varchar(255) NOT NULL,
    permissions_roles text NOT NULL,
    create_date datetime NOT NULL,
    last_log_in datetime,
    password varchar(255) NOT NULL
)engine=INNODB default charset=utf8mb4

CREATE TABLE `admin_notifications`(
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    date datetime not null,
    text text not null,
    client varchar(255) not null,
    status int(11) not null
)engine=INNODB default charset=utf8mb4

CREATE TABLE `user_notifications`(
    id int(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
    date datetime not null,
    text text not null,
    status int(11) not null
)engine=INNODB default charset=utf8mb4

Owner password - $2a$10$.RBYtU0DM0azRGA2oMxUiumjctinHWOld4tJrpgNOK327xbFaAnsa

-- uniq client id


INSERT INTO ``(`name`, `image`, `function`, `company`, `email`, `telefon`, `gds`, `fbds`) VALUES ('','','','','','','','','')

CREATE Table ``(
    id int(11) not null PRIMARY KEY AUTO_INCREMENT,
    date date not null,
    description text not null,
    file varchar(255) not null
)engine=INNODB default charset=utf8mb4

INSERT INTO ``( `date`, `description`, `file`) VALUES ('','','')

-- Table for media plan schedule

CREATE TABLE ``(
    id int(11) not null PRIMARY KEY AUTO_INCREMENT,
    scheduleUnicId varchar(255) not null,
    file text not null,
    title text not null,
    text text not null,
    platforms varchar(255) not null,
    date date not null,
    time time not null,
    status varchar(40) not null,
    comments text not null
)engine=INNODB default charset=utf8mb4

INSERT INTO ``(`scheduleUnicId`,`file`,`title`,`text`,`platforms`,`date`,`status`,`comments`) VALUES ('','','','','','','','')

-- Update media plan schedule

UPDATE `` SET `platforms`='', `status`='', `comments`='' WHERE `scheduleUnicId`=''


-- Table for tasks

create table `Owner` (
    id int(11) NOT NULL,
    unicId varchar(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
	name text NOT NULL,
    description text NOT NULL,
    client varchar(255) NOT NULL,
    asigned_by varchar(255) NOT NULL
)engine=INNODB default charset=utf8mb4

-- Table for projects

CREATE TABLE ``(
    id int(11) not null AUTO_INCREMENT PRIMARY KEY,
    taskId varchar(255) not null,
    name varchar(255) not null,
    description text not null,
    icon varchar(255) not null,
    files varchar(255) not null,
    status int(11) not null,
    comments text not null,
    startDate date not null,
    endDate date not null
)engine=INNODB default charset=utf8mb4

https://clients.diclick.eu/admin/


÷ - pentru spacing




CREATE TABLE `user_notifications` (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user varchar(255) NOT NULL,
    type int(11) NOT NULL,
    project varchar(255) NOT NULL,
    task varchar(255) NOT NULL,
    social_platform varchar(255) NOT NULL,
    date datetime NOT NULL
)engine=INNODB default charset=utf8mb4




-- TASK
titlu task , descriere , fisiere, deadline
-- TAsk end




CREATE TABLE `events` (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type varchar(255) NOT NULL,
    client varchar(255) NOT NULL,
    revicer text NOT NULL
)engine=INNODB default charset=utf8mb4