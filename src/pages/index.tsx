import { useState } from 'react';
import PlayerForm from '../components/PlayerForm';
import PlayerList from '../components/PlayerList';
import Filters from '../components/Filters';
import { usePlayerStore } from '../store/playerStore';
import { Player } from '../types';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const addPlayer = usePlayerStore((state) => state.addPlayer);
  const [players, setPlayers] = useState<Player[]>([]);

  const handleAddPlayer = (data: any) => {
    // Check for captain and vice-captain constraints
    const teamPlayers = players.filter(p => p.team === data.team);
    if (data.isCaptain && teamPlayers.some(p => p.isCaptain)) {
      alert('This team already has a captain.');
      return;
    }
    if (data.isViceCaptain && teamPlayers.some(p => p.isViceCaptain)) {
      alert('This team already has a vice-captain.');
      return;
    }

    addPlayer({ ...data, id: uuidv4() });
    setPlayers([...players, { ...data, id: uuidv4() }]);
  };

  return (
    <div>
      <h1>IPL Team Management</h1>
      <PlayerForm onSubmit={handleAddPlayer} />
      <Filters />
      <PlayerList />
    </div>
  );
};

export default Home;
