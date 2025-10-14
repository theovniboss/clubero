import db from "../config/db.js";

const getAllTeams = async () => {
    const res = await db.query('SELECT * FROM teams');
    return res.rows;
}

const getTeamById = async (id) => {
    const res = await db.query('SELECT * FROM teams WHERE teamid = $1', [id]);
    return res.rows[0];
}   

const insertTeam = async (team) => {
    const { clubid, sportid, name, description, image, gender, category, active, createdby } = team;
    const query = `
    INSERT INTO teams (
        clubid,
        sportid,
        name, 
        description,
        image, 
        gender, 
        category,
        active, 
        createdby,
        updatedby
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $9) RETURNING *`;
    const res = await db.query(query, [clubid, sportid, name, description, image, gender, category, active, createdby]);
    return res.rows[0];
}

const updateTeam = async (id, team) => {
    const { clubid, sportid, name, description, image, gender, category, active, updatedby  } = team;
    const query = `UPDATE teams SET
        clubid = $1,
        sportid = $2,
        name = $3,
        description = $4,
        image = $5,
        gender = $6,
        category = $7,
        active = $8,
        updatedat = CURRENT_TIMESTAMP,
        updatedby = $9
        WHERE teamid = $10 RETURNING *`;
    const res = await db.query(query, [clubid, sportid, name, description, image, gender, category, active, updatedby, id]);
    return res.rows[0];
}

const deleteTeam = async (id) => {
    const res = await db.query('DELETE FROM teams WHERE teamid = $1', [id]);
    return res.rowCount > 0;
}

export default { 
    getAllTeams,
    getTeamById,
    insertTeam,
    updateTeam,
    deleteTeam
};
