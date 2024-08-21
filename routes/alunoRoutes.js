const express = require('express');
const bodyParser = require('body-parser');
const SHA256 = require('crypto-js/sha256');
const { Aluno } = require('../models/Post');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Rota para adicionar os alunos no banco
router.post('/add', async (req, res) => {
    const { NOME, CPF, CURSO, MODULO, TURMA, DATA } = req.body;

    try {
        // Gerar token único concatenando o timestamp atual com o CPF do aluno
        const timestamp = Date.now().toString();
        const novoToken = SHA256(timestamp + CPF).toString().substring(0, 20);

        // Adicionar o aluno com o novo token
        await Aluno.create({
            nome: NOME,
            cpf: CPF,
            curso: CURSO,
            modulo: MODULO.join(),
            turma: TURMA,
            data: DATA,
            token: novoToken
        });

        res.status(201).send('Registro adicionado com sucesso.');
    } catch (err) {
        console.error('Erro ao adicionar registro:', err);
        res.status(500).send('Erro interno do servidor.');
    }
});


// Rota para listar todos os alunos
router.get('/listar', (req, res) => {
    Aluno.findAll()
        .then(alunos => {
            res.status(200).json(alunos);
        })
        .catch(err => {
            console.error('Erro ao buscar alunos:', err);
            res.status(500).send('Erro interno do servidor ao buscar alunos.');
        });
});

// Rota para atualizar um registro
router.put('/atualizar/:cpf', (req, res) => {
    const { NOME, CPF, CURSO, MODULO, TURMA, DATA } = req.body;
    Aluno.update({
        nome: NOME,
        cpf: CPF,
        curso: CURSO,
        modulo: MODULO.join(),
        turma: TURMA,
        data: DATA
    }, {
        where: { cpf: req.params.cpf }
    }).then(result => {
        if (result[0] === 1) {
            res.status(200).send('Registro atualizado com sucesso.');
        } else {
            res.status(404).send('Registro não encontrado.');
        }
    }).catch(err => {
        console.error('Erro ao atualizar registro:', err);
        res.status(500).send('Erro interno do servidor.');
    });
});

module.exports = router;
