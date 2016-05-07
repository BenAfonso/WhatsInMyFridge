CREATE DOMAIN role_domain VARCHAR(6) CHECK( VALUE IN ('user','admin') );


----------------
------- TABLES
----------------

CREATE TABLE Users (
  idUser SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL CONSTRAINT unique_username UNIQUE,
  password TEXT NOT NULL,
  salt TEXT NOT NULL,
  role role_domain NOT NULL DEFAULT 'user'
);

CREATE TABLE Categories (
  idCategory SERIAL PRIMARY KEY,
  categoryName VARCHAR(50),
  idUser INT references Users(idUser) ON DELETE CASCADE
);

CREATE TABLE Products (
  idProduct SERIAL PRIMARY KEY,
  idCategory INT references Categories(idCategory) ON DELETE CASCADE,
  productName VARCHAR(50),
  img TEXT,
  idUser INT references Users(idUser) ON DELETE CASCADE
);


CREATE TABLE Items (
  idItem SERIAL PRIMARY KEY,
  idProduct INT references Products(idProduct) ON DELETE CASCADE,
  idUser INT references Users(idUser) ON DELETE CASCADE,
  quantity NUMERIC NOT NULL DEFAULT 0,
  unit VARCHAR(15) NOT NULL,
  max NUMERIC,
  created_at DATE DEFAULT CURRENT_DATE
);

CREATE TABLE Recipes (
  idRecipe SERIAL PRIMARY KEY,
  recipeName VARCHAR(50),
  idUser INT references Users(idUser) ON DELETE CASCADE
);

CREATE TABLE Ingredients (
  idRecipe INT references Recipes(idRecipe) ON DELETE CASCADE,
  idProduct INT references Products(idProduct) ON DELETE CASCADE,
  quantity NUMERIC,
  PRIMARY KEY (idRecipe, idProduct)
);

----------------
------- TRIGGERS
----------------

-- Verifier si la quantité est supérieure au maximum,
-- si oui, remplacer le maximum par la nouvelle quantité
CREATE TRIGGER check_max_stock AFTER UPDATE
ON Items
FOR EACH ROW
EXECUTE PROCEDURE set_max_stock();

-- Verifier si le produit et la recette concernent le même utilisateur
-- lors d'une insertion dans Ingredients
CREATE TRIGGER check_user_on_insert BEFORE INSERT
ON Ingredients
FOR EACH ROW
EXECUTE PROCEDURE proc_check_user_on_insert();

-- Verifier si un produit possède un seul item associé, renvoie une erreur sinon
-- Ou augmente la quantité de l'item déjà créé (TODO réflechir ^^')
CREATE TRIGGER check_unicity_of_item_per_product BEFORE INSERT
ON Items
FOR EACH ROW
EXECUTE PROCEDURE proc_check_unicity_item_product();
