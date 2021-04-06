const express = require('express');
const app = express();
const port = 4000;

app.use(express.static('public'));

app.listen(port, () => console.log(`Sensor data app listening on port ${port}`));

require('dotenv').config();

const { Pool } = require('pg');
//coinnect to db
const pool = new Pool({
    connectionString: process.env.TIMESCALE_SERVER
});


app.get('/device/:device/humidity', async (req, res) => {
    const device = req.params.device;
    const query = `SELECT time_bucket('10 second', recorded_at) as recorded_at, avg(reading) as humidity
                    FROM sensor_data
                    WHERE measurement = 'humidity'
                    AND device = $1
                    GROUP BY 1`;
    const params = [device];
    console.log(query, params);

    try {
        const results = await pool.query(query, params);
        console.log(`returning ${results.rowCount} rows`);
        res.send(results.rows);
    } catch(err) {
        console.log(err.stack);
        res.status(400).send('server error');
    }
});