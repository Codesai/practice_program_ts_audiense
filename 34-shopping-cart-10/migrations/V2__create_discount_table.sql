CREATE TABLE discounts
(
    code  VARCHAR(50) PRIMARY KEY,
    type  VARCHAR(30) NOT NULL,
    value DECIMAL(12, 2) NOT NULL DEFAULT 0,
    CONSTRAINT allowed_types CHECK (type IN ('FIXED', 'PERCENTAGE'))
);