DROP DATABASE IF EXISTS footwear_dev;
CREATE DATABASE footwear_dev;

\c footwear_dev;

CREATE TABLE footwears (
    id SERIAL PRIMARY KEY,
    image TEXT NOT NULL,
    name TEXT NOT NULL,
    cost DECIMAL,
    category TEXT,
    url TEXT,
    is_trending BOOLEAN
);

