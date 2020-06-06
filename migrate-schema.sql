CREATE TABLE IF NOT EXISTS property (
    id int NOT NULL,
    propertyId varchar NOT NULL,
    url varchar NOT NULL,
    title varchar NOT NULL,
    keywords varchar NOT NULL, 
    summary varchar, 
    price int NOT NULL, 
    bedrooms int NOT NULL,
    domain varchar NOT NULL, 
    lat int,
    lon int,
    region varchar NOT NULL,
    PRIMARY KEY (id)
); 