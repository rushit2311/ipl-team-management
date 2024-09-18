import type { NextApiRequest, NextApiResponse } from 'next';
import { Player } from '../../types';

let players: Player[] = []; // Replace with a database in a real application

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(players);
  } else if (req.method === 'POST') {
    const newPlayer: Player = req.body;
    players.push(newPlayer);
    res.status(201).json(newPlayer);
  } else if (req.method === 'PUT') {
    const updatedPlayer: Player = req.body;
    players = players.map(p => p.id === updatedPlayer.id ? updatedPlayer : p);
    res.status(200).json(updatedPlayer);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    players = players.filter(p => p.id !== id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
