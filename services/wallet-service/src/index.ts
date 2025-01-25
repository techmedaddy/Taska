import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis();

app.get('/', (req, res) => {
    res.send('Wallet Service is running');
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
    console.log(`Wallet Service running on port ${PORT}`);
});
