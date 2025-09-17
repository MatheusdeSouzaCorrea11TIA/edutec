import { setPoints } from '../js/server.js';


export default async function handler(req, res) {
    try {
        const { nome, pontos } = req.body;

        if (!nome || pontos === undefined) {
            return res.status(400).json({ error: 'Nome e pontos são obrigatórios'})
        }

        await setPoints(nome, pontos);
        res.status(200).json({ mensagem: 'Pontos salvos com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar ranking' });
    }
}