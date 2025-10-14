import db from "../config/db.js";

const getAllSports = async () => {
    const res = await db.query('SELECT * FROM sports');
    return res.rows;
}

const getSportById = async (id) => {
    const res = await db.query('SELECT * FROM sports WHERE sportid = $1', [id]);
    return res.rows[0];
}

const insertSport = async (sport) => {
    const { name, image } = sport;
    const query = `
        INSERT INTO sports (
            name, 
            image
        ) VALUES ($1, $2) RETURNING *`;
    const res = await db.query(query, [name, image]);
    return res.rows[0];
}

const updateSport = async (id, sport) => {
    const { name, image } = sport;
    const query = `UPDATE sports SET
        name = $1,
        image = $2  
        WHERE sportid = $3 RETURNING *`;
    const res = await db.query(query, [name, image, id]);
    return res.rows[0];
}

const deleteSport = async (id) => {
    const res = await db.query('DELETE FROM sports WHERE sportid = $1', [id]);
    return res.rowCount > 0;
}

export default { 
    getAllSports,
    getSportById,
    insertSport,
    updateSport,
    deleteSport
}; 