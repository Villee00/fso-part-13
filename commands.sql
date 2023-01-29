CREATE TABLE blogs (
	id SERIAL PRIMARY KEY,
	author text,
	url text NOT NULL,
	title text NOT NULL,
	likes numeric DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES ('Janne', 'http://www.example.com/', 'Testit');
INSERT INTO blogs (author, url, title) VALUES ('Pekka', 'http://www.example.com/', 'Pekan seikkailut');
INSERT INTO blogs (author, url, title) VALUES ('Jari', 'http://www.example.com/', 'Jarin matkat');