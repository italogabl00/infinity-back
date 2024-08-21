const express = require('express');
const bodyParser = require('body-parser');
const { Professor } = require('../models/Post');
const router = express.Router();
const path = require('path');
const PORT = process.env.PORT || 3000;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Rota para adicionar um novo professor
router.post('/adicionar', (req, res) => {
    console.log('Recebido POST em /professores');

    const { nome, areaOption,pracaOption, curso, formacao, img, github, instagram, linkedin } = req.body;

    console.log('Dados recebidos:', req.body); // Verificar todos os dados recebidos

    const redesSociais = [github, instagram, linkedin].filter(Boolean).join(', ');


    // Crie o professor com a URL da imagem
    Professor.create({
        nome: nome,
        area: areaOption,
        curso: curso,
        formacao: formacao,
        imgUrl: img,
        rede: redesSociais,
        praca:pracaOption
    })
    .then(() => {
        console.log('Professor adicionado com sucesso.');
        res.status(200).send(`<script>alert("Professor ${nome} foi adicionado com sucesso."); window.history.back();</script>`);
    })
    .catch(err => {
        console.error('Erro ao adicionar registro:', err);
        res.status(500).send('Erro interno do servidor.');
    });
});


// Rota para listar todos os professores
router.get('/listar', (req, res) => {
    Professor.findAll()
        .then(professores => {
            res.status(200).json(professores);
        })
        .catch(err => {
            console.error('Erro ao buscar professores:', err);
            res.status(500).send('Erro interno do servidor ao buscar professores.');
        });
});

// Rota para servir a página deletarProfessores.html
router.get('/deletarProfessores.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/deletarProfessores.html'));
});

// Rota para deletar um professor pelo ID
router.post('/delete', (req, res) => {
    const { id } = req.body;
    Professor.findByPk(id)
        .then(professor => {
            if (!professor) {
                return res.status(404).send('Professor não encontrado.');
            }
            const nomeProfessor = professor.nome;
            Professor.destroy({ where: { id: id } })
                .then(() => {
                    console.log('Professor deletado com sucesso.');
                    res.status(200).send(`<script>alert("Professor ${nomeProfessor} foi deletado com sucesso."); window.history.back();</script>`);
                })
                .catch(err => {
                    console.error('Erro ao deletar professor:', err);
                    res.status(500).send('Erro interno do servidor ao deletar professor.');
                });
        })
        .catch(err => {
            console.error('Erro ao encontrar professor:', err);
            res.status(500).send('Erro interno do servidor ao encontrar professor.');
        });
});

// Rota para editar um professor pelo ID
router.put('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, area, curso, formacao, img, github, instagram, linkedin } = req.body;

    const redesSociais = [github, instagram, linkedin].filter(Boolean).join(', ');

    Professor.findByPk(id)
        .then(professor => {
            if (!professor) {
                return res.status(404).send('Professor não encontrado.');
            }

            professor.nome = nome || professor.nome;
            professor.area = area || professor.area;
            professor.curso = curso || professor.curso;
            professor.formacao = formacao || professor.formacao;
            professor.imgUrl = img || professor.imgUrl;
            professor.rede = redesSociais || professor.rede;

            return professor.save();
        })
        .then(() => {
            console.log('Professor atualizado com sucesso.');
            res.status(200).send(`<script>alert("Professor atualizado com sucesso."); window.history.back();</script>`);
        })
        .catch(err => {
            console.error('Erro ao atualizar professor:', err);
            res.status(500).send('Erro interno do servidor ao atualizar professor.');
        });
});

module.exports = router;














// const express = require('express');
// const bodyParser = require('body-parser');
// const { Professor } = require('../models/Post');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const PORT = process.env.PORT || 3000;

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());

// // Configuração do Multer para lidar com o upload de arquivos
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, 'public/img'); // Define a pasta de destino como 'public'
//         },
//         filename: function (req, file, cb) {
//             cb(null, file.originalname); // Mantém o nome original do arquivo
//         }
//     });

//     const upload = multer({ storage: storage, limits: { fileSize: 20 * 1024 * 1024 } });

// // Rota para servir arquivos estáticos (como imagens)
//     router.use(express.static(path.join(__dirname, 'public/img')));

// // Rota para adicionar um novo professor
//     router.post('/add', upload.single('imgs'), (req, res) => {
//         console.log('Recebido POST em /professores');
        
//         // Verifique se o arquivo foi recebido corretamente
//             // if (!req.file) {
//             //     console.log('Nenhum arquivo recebido.');
//             //     return res.status(400).send('Nenhum arquivo enviado.');
//             // }

//         const { nome, area, curso, formacao,github,instagram,linkedin } = req.body;
//         const imgUrl = req.file.filename; // Use o nome do arquivo como caminho da imagem
//         const redeslista = [ github,instagram,linkedin]
//         console.log('Dados recebidos:', nome,area, curso, formacao, imgUrl);
//         const redesSociais = redeslista.join(', ')
//         // Construa a URL completa da imagem
//         const urlDoServidor = `http://54.207.245.84:3000${PORT}`; // Substitua pelo endereço do seu servidor
//         const urlCompleta = `${urlDoServidor}/${imgUrl}`;

//         // Crie o professor com a URL da imagem
//         Professor.create({
//             nome: nome,
//             area: area,
//             curso: curso,
//             formacao: formacao,
//             imgUrl: urlCompleta,
//             rede: redesSociais
//         })
//         .then(() => {
//             console.log('Professor adicionado com sucesso.');
//             res.status(200).send(`<script>alert("Professor ${nome} foi adicionado com sucesso."); window.history.back();</script>`);
//         })
//         .catch(err => {
//             console.error('Erro ao adicionar registro:', err);
//             res.status(500).send('Erro interno do servidor.');
//         });
//     });

// // Rota para listar todos os professores
//     router.get('/listar', (req, res) => {
//         Professor.findAll()
//             .then(professores => {
//                 res.status(200).json(professores);
//             })
//             .catch(err => {
//                 console.error('Erro ao buscar professores:', err);
//                 res.status(500).send('Erro interno do servidor ao buscar professores.');
//             });
//     });
    
// // Rota para servir a página deletarProfessores.html
//     router.get('/deletarProfessores.html', (req, res) => {
//         res.sendFile(path.join(__dirname, '../views/deletarProfessores.html'));
//     });
// // Rota para deletar um professor pelo ID
// router.post('/delete', (req, res) => {
//     const { id } = req.body;
//     Professor.findByPk(id)
//         .then(professor => {
//             if (!professor) {
//                 return res.status(404).send('Professor não encontrado.');
//             }
//             const nomeProfessor = professor.nome;
//             Professor.destroy({ where: { id: id } })
//                 .then(() => {
//                     console.log('Professor deletado com sucesso.');
//                     res.status(200).send(`<script>alert("Professor ${nomeProfessor} foi deletado com sucesso."); window.history.back();</script>`);
//                 })
//                 .catch(err => {
//                     console.error('Erro ao deletar professor:', err);
//                     res.status(500).send('Erro interno do servidor ao deletar professor.');
//                 });
//         })
//         .catch(err => {
//             console.error('Erro ao encontrar professor:', err);
//             res.status(500).send('Erro interno do servidor ao encontrar professor.');
//         });
// });


// module.exports = router;