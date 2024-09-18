import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Player } from '../types';

const playerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['Batsman', 'Bowler', 'All Rounder', 'WK']),
  isCaptain: z.boolean(),
  isViceCaptain: z.boolean(),
  team: z.string().min(1, 'Team is required'),
  photoUrl: z.string().optional().refine((value) => {
    if (!value) return true; // Optional field can be empty
    try {
      new URL(value);
      return true;
    } catch (e) {
      return false;
    }
  }, 'Invalid URL format'),
}).refine(data => !(data.isCaptain && data.isViceCaptain), {
  message: 'A player cannot be both captain and vice-captain',
  path: ['isCaptain', 'isViceCaptain'],
});


type PlayerFormData = z.infer<typeof playerSchema>;

const PlayerForm = ({ onSubmit }: { onSubmit: (data: PlayerFormData) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <span>{errors.name.message}</span>}

      <select {...register('role')}>
        <option value="Batsman">Batsman</option>
        <option value="Bowler">Bowler</option>
        <option value="All Rounder">All Rounder</option>
        <option value="WK">WK</option>
      </select>

      <label>
        <input type="checkbox" {...register('isCaptain')} />
        Captain
      </label>

      <label>
        <input type="checkbox" {...register('isViceCaptain')} />
        Vice-Captain
      </label>

      <input {...register('team')} placeholder="Team" />
      {errors.team && <span>{errors.team.message}</span>}

      <input {...register('photoUrl')} placeholder="Photo URL" />

      <button type="submit">Submit</button>
    </form>
  );
};

export default PlayerForm;
