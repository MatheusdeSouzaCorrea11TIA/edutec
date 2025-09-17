import { getPoints } from '../js/server.js';


export default async function handler(req, res) {
    try {
        const rows = await getPoints();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar ranking' });
    }
}