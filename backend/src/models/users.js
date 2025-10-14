import db from "../config/db.js";

const getAllUsers = async () => {
    const res = await db.query('SELECT * FROM users');
    return res.rows;
}

const getUserById = async (id) => {
    const res = await db.query('SELECT * FROM users WHERE userid = $1', [id]);
    return res.rows[0];
}

const getUserByIdentityProvider = async (identifyproviderid) => {
	const res = await db.query('SELECT * FROM users WHERE identifyproviderid = $1', [identifyproviderid]);
	return res.rows[0];
}

const insertUser = async (user) => {
    const { email, password, firstname, lastname, dateofbirth, identifyproviderid  } = user;
    const query = `
    INSERT INTO users (
        email, 
        password, 
        firstname, 
        lastname, 
        dateofbirth, 
        identifyproviderid
    ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const res = await db.query(query, [email, password, firstname, lastname, dateofbirth, identifyproviderid]);
    return res.rows[0];
}   

const updateUser = async (id, user) => {
    const { email, password, firstname, lastname, dateofbirth, identifyproviderid  } = user;
    const query = `UPDATE users SET
        email = $1,
        password = $2,
        firstname = $3,
        lastname = $4,
        dateofbirth = $5,
        identifyproviderid = $6,
        updatedat = CURRENT_TIMESTAMP
        WHERE userid = $7 RETURNING *`;
    const res = await db.query(query, [email, password, firstname, lastname, dateofbirth, identifyproviderid, id]);
    return res.rows[0];
}

const deleteUser = async (id) => {
    const res = await db.query('DELETE FROM users WHERE userid = $1', [id]);
    return res.rowCount > 0;
}



export default { 
    getAllUsers,
    getUserById,
	getUserByIdentityProvider,
    insertUser,
    updateUser,
    deleteUser
};