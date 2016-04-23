CREATE DOMAIN role_domain VARCHAR(6) CHECK( VALUE IN ('user','admin') );

CREATE OR REPLACE FUNCTION insert_stock()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO STOCKS (idItem, quantity, lowStock) VALUES (NEW.idItem,0,0);
  RETURN new;
END; $$ LANGUAGE 'plpgsql';

CREATE TRIGGER insert_stock_trigger AFTER INSERT
ON Items
FOR EACH ROW
EXECUTE PROCEDURE insert_stock();

CREATE TABLE Users (
  idUser SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL CONSTRAINT unique_username UNIQUE,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  role role_domain NOT NULL DEFAULT 'user'
);

CREATE TABLE Items (
  idItem SERIAL PRIMARY KEY,
  idCategory INT references Categories(idCategory) ON DELETE CASCADE,
  itemName VARCHAR(50),
  idUser INT references Users(idUser) ON DELETE CASCADE
);

CREATE TABLE Categories (
  idCategory SERIAL PRIMARY KEY,
  categoryName VARCHAR(50),
  idUser INT references Users(idUser) ON DELETE CASCADE
);

CREATE TABLE Lists (
  idList SERIAL PRIMARY KEY,
  listName VARCHAR(60),
  idUser INT references Users(idUser) ON DELETE CASCADE
);

CREATE TABLE Stocks (
  idItem INT references Items(idItem) ON DELETE CASCADE,
  quantity NUMERIC,
  lowStock NUMERIC,
  PRIMARY KEY (idItem)
);

CREATE TABLE ListItems (
  idList INT references Lists(idList) ON DELETE CASCADE,
  idItem INT references Items(idItem) ON DELETE CASCADE,
  PRIMARY KEY (idList, idItem)
);

CREATE TABLE Recipes (
  idRecipe SERIAL PRIMARY KEY,
  recipeName VARCHAR(50),
  idUser INT references Users(idUser) ON DELETE CASCADE
);

CREATE TABLE RecipeItems (
  idRecipe INT references Recipes(idRecipe)ON DELETE CASCADE,
  idItem INT references Items(idItem) ON DELETE CASCADE,
  quantity NUMERIC,
  PRIMARY KEY (idRecipe, idItem)
);
