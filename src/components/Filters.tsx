import { usePlayerStore } from '../store/playerStore';

const Filters = () => {
  const { players, setFilteredPlayers } = usePlayerStore((state) => ({
    players: state.players,
    setFilteredPlayers: state.setFilteredPlayers,
  }));

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value;
    if (role === 'All') {
      setFilteredPlayers(players);
    } else {
      setFilteredPlayers(players.filter(player => player.role === role));
    }
  };

  return (
    <select onChange={handleFilter}>
      <option value="All">All Roles</option>
      <option value="Batsman">Batsman</option>
      <option value="Bowler">Bowler</option>
      <option value="All Rounder">All Rounder</option>
      <option value="WK">WK</option>
    </select>
  );
};

export default Filters;
