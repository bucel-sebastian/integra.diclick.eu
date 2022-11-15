CREATE TABLE `research`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    agentie_implementare varchar(255) NOT NULL,
    companie varchar(255) NOT NULL,
    brand varchar(255) NOT NULL,
    tip_promotie varchar(255) NOT NULL,
    premii text NOT NULL,
    valoare_premii varchar(255) NOT NULL,
    tip_premiere text NOT NULL,
    promovare text NOT NULL,
    categorie varchar(255) NOT NULL,
    subcategorie varchar(255) NOT NULL,
    denumire_promotie text NOT NULL,
    slogan text NOT NULL,
    data_start date NOT NULL,
    data_sfarsit date NOT NULL,
    mecanism text NOT NULL,
    fisiere_atasate text NOT NULL,
    comentarii text NOT NULL

)

CREATE TABLE `research_companies`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nume varchar(255) NOT NULL,
    firma varchar(255) NOT NULL
)
CREATE TABLE `research_brands`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nume varchar(255) NOT NULL,
    firma varchar(255) NOT NULL
)