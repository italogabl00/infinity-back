const db = require('./db');

const Aluno = db.sequelize.define('alunos', {
  nome: {
    type: db.Sequelize.STRING
  },
  cpf: {
    type: db.Sequelize.STRING
  },
  curso: {
    type: db.Sequelize.STRING
  },
  modulo:{
    type: db.Sequelize.TEXT
  },
  turma: {
    type: db.Sequelize.STRING // Altere o tipo de dados para STRING
  },
  data: {
    type: db.Sequelize.DATE
  },
  token: {
    type: db.Sequelize.TEXT
  }
});

const Professor = db.sequelize.define('professores', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: db.Sequelize.STRING
  },
  area:{
    type: db.Sequelize.STRING
  },
  curso: {
    type: db.Sequelize.STRING
  },
  formacao: {
    type: db.Sequelize.STRING
  },
  imgUrl: {
    type: db.Sequelize.STRING
  },
  rede:{
    type: db.Sequelize.STRING
  },
  praca: {
    type: db.Sequelize.STRING
  }
});

// Sincronize os modelos com o banco de dados (cria as tabelas se elas não existirem)
Aluno.sync().then(() => {
  console.log('Tabela de Alunos criada com sucesso');
}).catch(err => {
  console.error('Erro ao sincronizar a tabela de Alunos:', err);
});

Professor.sync().then(() => {
  console.log('Tabela de Professores criada com sucesso');
}).catch(err => {
  console.error('Erro ao sincronizar a tabela de Professores:', err);
});

module.exports = { Aluno, Professor };
