CREATE TABLE `fisa_client`(
    id int(11) not null PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume_client varchar(255) NOT NULL,
    firma varchar(255) NOT NULL,
    cod_fiscal varchar(255) NOT NULL,
    nr_reg_comert varchar(255) NOT NULL,
    adresa_facturare varchar(255) NOT NULL,
    oras_facturare varchar(255) NOT NULL,
    judet_facturare varchar(255) NOT NULL,
    tara_facturare varchar(255) NOT NULL,
    nr_tel varchar(255) NOT NULL,
    logo int(5) NOT NULL,
    status int(5) NOT NULL,
    categorie int(5) NOT NULL,
    sursa varchar(255) NOT NULL,
    admin varchar(255) NOT NULL
)


-- status --

-- prospect
-- cold lead
-- hot lead
-- client
-- closed
-- contract trimis
-- oferta trimis


-- categorie --

-- a - client important
-- b - client mediu
-- c - client neinteresant


CREATE TABLE `websites`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    website_nume varchar(255) NOT NULL,
    website_url varchar(255) NOT NULL,
    website_tip varchar(255) NOT NULL,
    domeniu varchar(255) NOT NULL,
    website_url_admin varchar(255) NOT NULL,
    website_admin_user varchar(255) NOT NULL,
    website_admin_pass varchar(255) NOT NULL
)
CREATE TABLE `email_adresses`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    adresa_email varchar(255) NOT NULL,
    billing_email int(5) NOT NULL
)
CREATE TABLE `client_pers`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    prenume varchar(255) NOT NULL,
    functie varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    telefon varchar(255) NOT NULL,
    este_decident int(5) NOT NULL
)
-- CRM PART 2


CREATE TABLE `social_media_accounts`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    id_cont varchar(255) NOT NULL,
    retea varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    link varchar(255) NOT NULL,
    login_user varchar(255) NOT NULL,
    login_pass varchar(255) NOT NULL,
    personal_account int(5) NOT NULL,
    comentarii text NOT NULL
)

CREATE TABLE `obiective`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    tip int(5) NOT NULL,
    client_obj text NOT NULL,
    social_obj text NOT NULL,
    performance_obj text NOT NULL,
    dezvoltare_online_obj text NOT NULL,
    marketing_obj text NOT NULL,
    perioada_start date NOT NULL,
    perioada_sfarsit date NOT NULL,
    comentarii text NOT NULL
)

CREATE TABLE `setari`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    tip int(5) NOT NULL,
    ownership int(5) NOT NULL,
    retea varchar(255) NOT NULL,
    sub_retea varchar(255) NOT NULL,
    cod text NOT NULL,
    comentarii text NOT NULL
)

CREATE TABLE `media_plan`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    retea varchar(255) NOT NULL,
    
    tip_content varchar(255) NOT NULL,
    frecventa varchar(255) NOT NULL,
    perioada_start date NOT NULL,
    perioada_sfarsit date NOT NULL,
    comentarii text NOT NULL
)

CREATE TABLE `buget`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    tip int(5) NOT NULL,
    retea varchar(255) NOT NULL,
    buget_total varchar(255) NOT NULL,
    buget_pe_zi varchar(255) NOT NULL,
    perioada_start date NOT NULL,
    perioada_sfarsit date NOT NULL,
    comentarii text NOT NULL
)


CREATE TABLE `creatie`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    produse text NOT NULL,
    pachet varchar(255) NOT NULL,
    perioada_start date NOT NULL,
    perioada_sfarsit date NOT NULL,
    comentarii text NOT NULL
)



CREATE TABLE ``(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    data date NOT NULL,
    timp time NOT NULL,
    actiune text NOT NULL,
    concluzie text NOT NULL,
    observatii_concluzie text NOT NULL,
    documente_atasate text NOT NULL,
    todo text NOT NULL,
    status int(5) NOT NULL,
    autor varchar(255) NOT NULL
)

CREATE TABLE `todo`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admin varchar(255) NOT NULL,
    upload_date datetime NOT NULL,
    date_todo date NOT NULL,
    time_todo time NOT NULL,
    action text NOT NULL,
    observatii text NOT NULL,
    mail text NOT NULL,
    telefon varchar(255) NOT NULL,
    status int(5) NOT NULL,
    clientId varchar(255) NOT NULL
)


-- email oferta
-- email contract
-- email proforma, contract
-- email proforma
-- email raport
-- email cerere informatii
-- email raspuns




CREATE TABLE `proforme`(
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    client varchar(255) NOT NULL,
    nr_reg_comert varchar(255) NOT NULL,
    cod_fiscal varchar(255) NOT NULL,
    adresa_facturare varchar(255) NOT NULL,
    oras_facturare varchar(255) NOT NULL,
    judet_facturare varchar(255) NOT NULL,
    tara_facturare varchar(255) NOT NULL,
    data_factura date NOT NULL,
    invoice_number varchar(255) NOT NULL,
    vat int(10) NOT NULL,
    produse text NOT NULL,
    termen_plata date NOT NULL,
    emitor int(5) NOT NULL,
    total_tva varchar(255) NOT NULL,
    total_f_tva varchar(255) NOT NULL,
    total_de_plata varchar(255) NOT NULL,
    invoice_created int(5) NOT NULL,
    created_by varchar(255) NOT NULL
    
)

CREATE TABLE `invoices` (
    `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `client` varchar(255) NOT NULL,
    `nr_reg_comert` varchar(255) NOT NULL,
    `cod_fiscal` varchar(255) NOT NULL,
    `adresa_facturare` varchar(255) NOT NULL,
    `oras_facturare` varchar(255) NOT NULL,
    `judet_facturare` varchar(255) NOT NULL,
    `tara_facturare` varchar(255) NOT NULL,
    `data_factura` date NOT NULL,
    `prefix_serie_factura` varchar(255) NOT NULL,
    `invoice_number` varchar(255) NOT NULL,
    `vat` int(10) NOT NULL,
    `produse` text NOT NULL,
    `termen_plata` date NOT NULL,
    `emitor` int(5) NOT NULL,
    `total_tva` varchar(255) NOT NULL,
    `total_f_tva` varchar(255) NOT NULL,
    `total_de_plata` varchar(255) NOT NULL,
    `created_by` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb

CREATE TABLE `produse` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nume varchar(255) NOT NULL,
    um varchar(255) NOT NULL,
    pret_unitar_fara_tva varchar(255) NOT NULL
)





CREATE TABLE `admin_roles` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    roleId varchar(255) NOT NULL,
    departament varchar(255) NOT NULL,
    role varchar(255) NOT NULL,
    permissions text NOT NULL,
    superuser int(5) NOT NULL,
    users text NOT NULL
)

CREATE TABLE `admin_departments` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unicId varchar(255) NOT NULL,
    nume varchar(255) NOT NULL,
    tip int(5) NOT NULL    
)


CREATE TABLE `invoice_check` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId varchar(255) NOT NULL,
    code text NOT NULL,
    security_code varchar(10) NOT NULL
)


CREATE TABLE `invoice_series` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    userId varchar(255) NOT NULL,
    serie varchar(255) NOT NULL,
    start_number varchar(255) NOT NULL,
    company int(11) NOT NULL
)