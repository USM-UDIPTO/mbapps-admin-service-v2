CREATE TABLE IF NOT EXISTS admin (
	id serial4 NOT null,
	user_name varchar(50) NOT NULL,
	CONSTRAINT admin_pk PRIMARY KEY (id)
);