const express = require ('express');
const session = require ('express-session');
const bcrypt = require ('bcrypt');
const db = require ('./db');
const app = express();


app.use (express.json());
app.use (express.urlencoded ({extended: true }));

app.use (session({
    secret: 'sound-player-secret',
    resave: false, 
    saveUninitialized: false
}))

app.get ('/', (req, res) => {
    res.send ('API do Sound Player está funcionando!');
});

app.post ('/cadastro', async (req, res) => {
    const { usuario, email, senha} = req.body;
    
    if(!usuario || !email || !senha){
        return res.status(400).send("Preencha todos os campos.");
    }

    try {
        //verificação de email
        const verifica = await db.query ('SELEC * FROM usuarios WHERE email = $1', [email]);
        if (verifica.rows.length > 0) {
            return res.status(400).send("Email já cadastrado.");
        } 
    
    //criptografa a senha
    const hash = await bcrypt.hash(senha, 10);

    //inserção do db
    await db.query(
        'INSERT INTO usuarios (user, email, senha) VALUES ($1, $2, $3)',
        [usuario, email, hash]
    );

    res.status(201).send("Cadastro realizado com sucesso!");
    }   catch (error) {
        console.error ("Erro no cadastro:", error);
        res.status(500).send("Erro interno dno servidor.");
    }
})

//iniciação do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}');
});


