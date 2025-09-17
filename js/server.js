const mysql = require("mysql2/promise");

async function getPoints(nome) {
    const connection = mysql.createConnection({
        host: 'benserverplex.ddns.net',
        user: 'alunos',
        password: 'senhaAlunos',
        database: 'pontuacao_zahoot'
    })
    
    const [rows] = await connection.execute(
        'SELECT * FROM pontucacao WHERE nome',
        [nome]
    );
    await connection.end();
    return rows
}

async function setPoints(nome, pontos) {
    const connection = mysql.createConnection({
        host: 'benserverplex.ddns.net',
        user: 'alunos',
        password: 'senhaAlunos',
        database: 'pontuacao_zahoot'
    })
    
    try {
        
        const [rows] = (await connection).execute(
            'SELECT * FROM pontucacao WHERE nome = ?',
            [nome]
        )

        if (rows.length > 0) {
            
            (await connection).execute(
                'UPDATE pontucacao SET ponto = ? WHERE nome = ?',
                [pontos, nome]
            )
            console.log(`Pontuação de ${nome} atualizada para ${pontos}`)
        } else {
            (await connection).execute(
                'INSERT INTO pontucacao (nome, ponto) VALUES (?,?)',
                [nome, pontos]
            )
            console.log(`Usuário ${nome} criado com ${pontos} pontos`)
        }
        
    } finally {
        (await connection).end()
    }
}

function debug() {
    const db = mysql.createConnection({
        host: 'benserverplex.ddns.net',
        user: 'alunos',
        password: 'senhaAlunos',
        database: 'pontuacao_zahoot'
    })
    
    db.connect(err => {
        if (err) {
            console.log('Erro ao conectar:', err);
        } else {
            console.log('Conectado ao MySQL');
        }
    });
    
    db.query('SELECT * FROM pontucacao', (err, results) => {
        console.log(results)
    })
}

module.exports = { getPoints, setPoints }