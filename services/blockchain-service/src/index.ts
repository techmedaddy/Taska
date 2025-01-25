import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Blockchain Service is running');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Blockchain Service running on port ${PORT}`);
});
