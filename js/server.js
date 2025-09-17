const mysql = require("mysql2/promise");

async function getPoints(nome) {
    const connection = await mysql.createConnection({
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
    const connection = await mysql.createConnection({
        host: 'benserverplex.ddns.net',
        user: 'alunos',
        password: 'senhaAlunos',
        database: 'pontuacao_zahoot'
    })
    
    try {
        
        const [rows] = await connection.execute(
            'SELECT * FROM pontucacao WHERE nome = ?',
            [nome]
        )

        if (rows.length > 0) {
            
            await connection.execute(
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
        await connection.end()
    }
}

async function remove(nome) {
    const connection = await mysql.createConnection({
        host: 'benserverplex.ddns.net',
        user: 'alunos',
        password: 'senhaAlunos',
        database: 'pontuacao_zahoot'
    })
    
    try {
        const [rows] = await connection.execute(
            'SELECT * FROM pontucacao WHERE nome = ?',
            [nome]
        )

        if (rows.length > 0) {
            connection.execute("DELETE FROM pontucacao WHERE nome = ?", [nome])
            console.log("Nome removido com sucesso!")
        } else {
            console.log("Nome não existe!")
        }
    } finally {
        await connection.end()
    }
}

async function debug() {
    const db = await mysql.createConnection({
        host: 'benserverplex.ddns.net',
        user: 'alunos',
        password: 'senhaAlunos',
        database: 'pontuacao_zahoot'
    })
    
    try {
        const [results] = await db.execute('SELECT * FROM pontucacao');
        console.log(results);
    } catch (err) {
        console.log('Erro ao conectar ou consultar:', err);
    } finally {
        await db.end();
    }
}

module.exports = { getPoints, setPoints, startServer }