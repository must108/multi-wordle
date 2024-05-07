create database wordle;

use database wordle;

create table fiveletter (
	wordid int serial primary key,
	words varchar(10)
);

create table fourletter (
	wordid int serial primary key,
	words varchar(10)
);

create table sixletter (
	wordid int serial primary key,
	words varchar(10)
);