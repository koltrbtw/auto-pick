import mysql from 'mysql2/promise';

interface Options {
    query: string;
    values?: any[];
}

const pool = mysql.createPool({
    host: '80.76.43.211',
    user: 'root',
    password: '17412100',
    database: 'auto-pick',
});

export const sql = async ( { query, values }: Options) => {
    console.debug("QUERY: " + query);
    const [rows] = await pool.query(query, values);

    return rows;
}