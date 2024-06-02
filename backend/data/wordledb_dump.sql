create database wordle;

use database wordle;

create table fiveletter (
	wordid serial primary key,
	words varchar(10)
);

create table fourletter (
	wordid serial primary key,
	words varchar(10)
);

create table sixletter (
	wordid serial primary key,
	words varchar(10)
);