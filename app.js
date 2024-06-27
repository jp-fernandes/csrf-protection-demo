const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Adicionar cabeçalho X-XSS-Protection manualmente
// app.use((req, res, next) => {
//     res.setHeader('X-XSS-Protection', '1; mode=block');
//     next();
// });

// Configurar o body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar a sessão
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Deve ser true em produção com HTTPS
}));

// Configurar CSRF Protection
const csrfProtection = csrf();
app.use(csrfProtection);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/form', (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', (req, res) => {
//   res.send('Formulário recebido com sucesso! e autenticado');
  res.json('Formulário recebido com sucesso! e autenticado');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
