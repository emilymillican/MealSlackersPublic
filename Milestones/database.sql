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


CREATE TABLE IntrestTransTable
(
 IntrestID int NOT NULL ,
 Intrest   text NOT NULL ,

 PRIMARY KEY (IntrestID)
);


CREATE TABLE FoodTransTable
(
 FoodID      int NOT NULL ,
 Name        text NOT NULL ,
 Description text NULL ,

 PRIMARY KEY (FoodID)
);

CREATE TABLE IntrestTable
(
 UserID    int NOT NULL ,
 IntrestID int NOT NULL ,


 FOREIGN KEY (UserID)  REFERENCES UserTable(UserID),
 FOREIGN KEY (IntrestID)  REFERENCES IntrestTransTable(IntrestID)
);

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

CREATE TABLE FoodTable
(
 EventID int NOT NULL ,
 FoodID  int NOT NULL ,

 FOREIGN KEY (EventID)  REFERENCES EventTable(EventID),
 FOREIGN KEY (FoodID)  REFERENCES FoodTransTable(FoodID)
);