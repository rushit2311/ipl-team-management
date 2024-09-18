import { usePlayerStore } from '../store/playerStore';
import { Player } from '../types';

const PlayerList = () => {
  const players = usePlayerStore((state) => state.players);

  return (
    <div>
      {players.map((player: Player) => (
        <div key={player.id}>
          {player.photoUrl && <img src={player.photoUrl} alt={player.name} />}
          <h2>{player.name}</h2>
          <p>Role: {player.role}</p>
          <p>Captain: {player.isCaptain ? 'Yes' : 'No'}</p>
          <p>Vice-Captain: {player.isViceCaptain ? 'Yes' : 'No'}</p>
          <p>Team: {player.team}</p>
        </div>
      ))}
    </div>
  );
};

export default PlayerList;
