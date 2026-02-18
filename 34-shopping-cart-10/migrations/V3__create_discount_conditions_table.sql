CREATE TABLE discount_conditions
(
    code VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL DEFAULT 'MIN_REQUIRED_AMOUNT',
    data JSON        NOT NULL DEFAULT '{
      "value": 0
    }',
    CONSTRAINT allowed_types CHECK (type IN ('MIN_REQUIRED_AMOUNT')),
    FOREIGN KEY (code) REFERENCES discounts (code)
);