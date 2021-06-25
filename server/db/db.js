const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres:@localhost:5432/final"
);

module.exports.registerUser = (first, last, email, password) => {
    const q = `
    INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const params = [first, last, email, password];
    return db.query(q, params);
};

module.exports.isUser = (email) => {
    const q = `SELECT password, id FROM users WHERE email = $1;`;
    const params = [email];
    return db.query(q, params);
};

module.exports.getFlatPreview = () => {
    return db.query(`
    SELECT renter, headline, starting, till, image_1, image_2, image_3
    FROM flats
    `);
};

module.exports.getFlatPage = (id) => {
    const q = `
    SELECT renter, headline, description, starting, till, image_1, image_2, image_3, image_4, image_5
    FROM flats
    WHERE id=$1
    `;
    const params = [id];
    return db.query(q, params);
};
