CREATE TABLE products
(
    name    VARCHAR(255)   NOT NULL,
    cost    DECIMAL(10, 2) NOT NULL,
    revenue_percentage DECIMAL(5, 2)  NOT NULL,
    tax_percentage     DECIMAL(5, 2)  NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (name)
);