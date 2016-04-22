CREATE TABLE Users (
  idUser SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL CONSTRAINT unique_username UNIQUE,
  password TEXT NOT NULL,
  salt TEXT NOT NULL
);

CREATE TABLE Items (
  idItem SERIAL PRIMARY KEY,
  idCategory INT references Categories(idCategory),
  itemName VARCHAR(50),
  idUser INT references Users(idUser)
);

CREATE TABLE Categories (
  idCategory SERIAL PRIMARY KEY,
  categoryName VARCHAR(50),
  idUser INT references Users(idUser)
);

CREATE TABLE Lists (
  idList SERIAL PRIMARY KEY,
  idUser INT references Users(idUser)
);

CREATE TABLE Stocks (
  idItem INT references Items(idItem),
  quantity NUMERIC,
  PRIMARY KEY (idItem)
);

CREATE TABLE ListItems (
  idListe INT references Lists(idList),
  idItem INT references Items(idItem),
  PRIMARY KEY (idListe, idItem)
);

CREATE TABLE Recipes (
  idRecipe SERIAL PRIMARY KEY,
  recipeName VARCHAR(50),
  idUser INT references Users(idUser)
);

CREATE TABLE RecipeItems (
  idRecipe INT references Recipes(idRecipe),
  idItem INT references Items(idItem),
  quantity NUMERIC,
  PRIMARY KEY (idRecipe, idItem)
);
