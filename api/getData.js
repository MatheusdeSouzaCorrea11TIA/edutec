import { getPoints } from '../js/server.js';

export default async function handler(req, res) {
    try {
        const { nome } = req.query

        if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' })

        const usuario = await getPoints(nome);
        res.status(200).json(usuario);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar ranking' });
    }
}