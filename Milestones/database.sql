-- Remove the old tables to clear them
DROP TABLE FoodTable;
DROP TABLE EventTable;
DROP TABLE IntrestTable;
DROP TABLE FoodTransTable;
DROP TABLE IntrestTransTable;
DROP TABLE UserTable;

CREATE TABLE UserTable
(
 UserID             int NOT NULL ,
 UserEmail          text NOT NULL ,
 ExpectedGraduation text NOT NULL ,
 UserPhotoURL       text NOT NULL ,
 Displayname        text NOT NULL ,
 Description        text NOT NULL ,
 Verified           bit NOT NULL ,
 Password           text NOT NULL ,
 Role               text NOT NULL ,

 PRIMARY KEY (UserID)
);

INSERT INTO UserTable (UserID, UserEmail, ExpectedGraduation, UserPhotoURL, Displayname, Description, Verified, Password, Role)
VALUES (123, 'Stian', 'May 2019', 'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png', 'StianRules', 'Nothing INteresting',
    TRUE, 'irock', 'Student');

INSERT INTO UserTable (UserID, UserEmail, ExpectedGraduation, UserPhotoURL, Displayname, Description, Verified, Password, Role)
VALUES (124, 'Emily', 'May 2021', 'https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png', 'EmilyM', 'Go buffs!', TRUE, 'emilymill', 'Student');


CREATE TABLE InterestTransTable
(
 InterestID int NOT NULL ,
 Interest   text NOT NULL ,

 PRIMARY KEY (IntrestID)
);

INSERT INTO InterestTransTable (InterestID, Interest)
VALUES (20, 'Computer Science');

INSERT INTO InterestTransTable (InterestID, Interest)
VALUES (21, 'Physics');

CREATE TABLE FoodTransTable
(
 FoodID      int NOT NULL ,
 Name        text NOT NULL ,
 Description text NULL ,

 PRIMARY KEY (FoodID)
);

INSERT INTO FoodTransTable (FoodID, Name, Description)
VALUES (10, 'Pizza', 'Pepperoni');

INSERT INTO FoodTransTable (FoodID, Name, Description)
VALUES (11, 'Pizza', 'Cheese');

CREATE TABLE InterestTable
(
 UserID    int NOT NULL ,
 InterestID int NOT NULL ,


 FOREIGN KEY (UserID)  REFERENCES UserTable(UserID),
 FOREIGN KEY (InterestID)  REFERENCES InterestTransTable(InterestID)
);

INSERT INTO InterestTable(UserID, InterestID)
VALUES (123, 21);

INSERT INTO InterestTable(UserID, InterestID)
VALUES (124, 20);

CREATE TABLE EventTable
(
 EventID          int NOT NULL ,
 Date             timestamp NOT NULL ,
 Building         text NOT NULL ,
 RoomNumber       text NOT NULL ,
 EventDisplayName text NOT NULL ,
 Description      text NOT NULL ,
 EventType        text NOT NULL ,
 UserID           int NOT NULL ,

 PRIMARY KEY (EventID),
 FOREIGN KEY (UserID)  REFERENCES UserTable(UserID)
);

INSERT INTO EventTable(EventID, Date, Building, RoomNumber, EventDisplayName. Description, EventType, UserID)
VALUES (245, 2018-12-6 12:00:00, 'Norlin', 'Lobby', 'Speaker: Joe Biden', 'Come join the Arts and Sciences Department to hear Joe Biden speak!',
    'Presentation', 123);

INSERT INTO EventTable(EventID, Date, Building, RoomNumber, EventDisplayName. Description, EventType, UserID)
VALUES (246, 2018-12-10 10:30:00, 'ECCR', '104', 'Math Club Meeting', 'The CU Math Club will be having its weekly meeting, with a focus placed on Calculus 2 help', 
    'Lecture', 124);

CREATE TABLE FoodTable
(
 EventID int NOT NULL ,
 FoodID  int NOT NULL ,

 FOREIGN KEY (EventID)  REFERENCES EventTable(EventID),
 FOREIGN KEY (FoodID)  REFERENCES FoodTransTable(FoodID)
);

INSERT INTO FoodTable (EventID, FoodID)
VALUES (245, 10);

INSERT INTO FoodTable (EventID, FoodID)
VALUES (246, 11);