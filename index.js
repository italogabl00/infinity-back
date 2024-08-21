const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const alunosRoutes = require('./routes/alunoRoutes');
const professoresRoutes = require('./routes/professoresRoutes');
const path = require('path'); // Importe o módulo path

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.use('/alunos', alunosRoutes);
app.use('/professores', professoresRoutes);

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public/img')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

