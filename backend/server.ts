import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env' });

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
    user: process.env.POSTGRES_USERNAME,
    host: process.env.POSTGRES_HOST_NAME,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
});

async function query(text: string, params: any[]) {
    const client = await pool.connect();
    
    try {
        const result = await client.query(text, params);
        return result;
    } catch (error) {
        console.error('error executing query: ', error);
        throw error;
    } finally {
        client.release();
    }
}

async function fetchData(wordType: any) {
    try {
        const result = await query (
            `select words from ${wordType};`, []);
        return result.rows;
    } catch (error) {
        console.error('error fetching data: ', error);
        throw error;
    }
}

app.use(express.static(path.join(__dirname, '../build')));

app.get('/api/getWords', async (req, res) => {
    const wordType = req.query.wordSize;

    try {
        const data = await fetchData(wordType);
        res.header('Content-Type', 'application/json');
        res.status(200).json(data);
        console.log('data fetched and sent (from getAll)');
    } catch (error) {
        console.error('error fetching data: ', error);
        res.status(500).json({ error: 'failed to fetch data ' });
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});