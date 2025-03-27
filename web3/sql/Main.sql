BEGIN;

CREATE TABLE web3.public.result (
    id SERIAL PRIMARY KEY,
    x FLOAT NOT NULL,
    y FLOAT NOT NULL,
    result BOOLEAN NOT NULL,
    created_at TIME NOT NULL,
    execution_time BIGINT NOT NULL
);

COMMIT