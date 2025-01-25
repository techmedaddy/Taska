import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Explorer Service is running');
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
    console.log(`Explorer Service running on port ${PORT}`);
});
