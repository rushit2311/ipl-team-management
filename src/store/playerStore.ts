import { create } from 'zustand';
import { Player } from '../types';  // Ensure the 'Player' type is correctly defined in this file

interface PlayerState {
  players: Player[];
  addPlayer: (player: Player) => void;
  editPlayer: (updatedPlayer: Player) => void;
  setFilteredPlayers: (filteredPlayers: Player[]) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: [],

  // Add a new player
  addPlayer: (player: Player) => set((state) => ({
    players: [...state.players, player]
  })),

  // Edit an existing player
  editPlayer: (updatedPlayer: Player) => set((state) => ({
    players: state.players.map((p) =>
      p.id === updatedPlayer.id ? updatedPlayer : p
    ),
  })),

  // Set filtered players
  setFilteredPlayers: (filteredPlayers: Player[]) => set(() => ({
    players: filteredPlayers,
  })),
}));
