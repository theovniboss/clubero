import db from "../config/db.js";

const getAllClubs = async () => {
    const res = await db.query('SELECT * FROM clubs');
    return res.rows;
}

const getClubById = async (id) => {
    const res = await db.query('SELECT * FROM clubs WHERE clubid = $1', [id]);
    return res.rows[0];
}

const insertClub = async (club) => {
    const { name, description, image, country, state, city, founded, active, createdby } = club;
    const query = `
    INSERT INTO clubs (
        name, 
        description, 
        image, 
        country, 
        state, 
        city, 
        founded, 
        active, 
        createdby,
        updatedby
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) RETURNING *`;
    const res = await db.query(query, [name, description, image, country, state, city, founded, active, createdby]);
    return res.rows[0];
}   

const updateClub = async (id, club) => {
    const { name, description, image, country, state, city, founded, active, updatedby  } = club;
    const query = `UPDATE clubs SET
        name = $1,
        description = $2,
        image = $3,
        country = $4,
        state = $5,
        city = $6,
        founded = $7,
        active = $8,
        updatedat = CURRENT_TIMESTAMP,
        updatedby = $9
        WHERE clubid = $10 RETURNING *`;
    const res = await db.query(query, [name, description, image, country, state, city, founded, active, updatedby, id]);
    return res.rows[0];
}

const deleteClub = async (id) => {
    const res = await db.query('DELETE FROM clubs WHERE clubid = $1', [id]);
    return res.rowCount > 0;
}



export default { 
    getAllClubs,
    getClubById,
    insertClub,
    updateClub,
    deleteClub
};