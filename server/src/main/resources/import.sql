INSERT INTO MEMBER (MEMBER_ID, ACTIVATED, EMAIL, NAME, PASSWORD) VALUES (1, 1, "khs@google.com", "khs", "abcd");

INSERT INTO AUTHORITY (AUTHORITY_NAME) values ('ROLE_USER');
INSERT INTO AUTHORITY (AUTHORITY_NAME) values ('ROLE_ADMIN');

INSERT INTO MEMBER_AUTHORITY (MEMBER_ID, AUTHORITY_NAME) values (1, 'ROLE_USER');
INSERT INTO MEMBER_AUTHORITY (MEMBER_ID, AUTHORITY_NAME) values (1, 'ROLE_ADMIN');
