CREATE table IF NOT EXISTS admin_v2 (
	id serial4 not null primary key,
	user_name varchar(255) DEFAULT null,
	password varchar(100) NOT NULL,
	full_name varchar(255) DEFAULT NULL,
	email varchar(255) DEFAULT NULL,
	role_name varchar(255) DEFAULT NULL
);