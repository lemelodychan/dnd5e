import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import CharacterSheet from '../../components/CharacterSheet';

export default function CharacterPage() {
  const router = useRouter();
  const { id } = router.query;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        const { data, error } = await supabase
          .from('Characters')
          .select('*')
          .eq('id', id)
          .single();
        if (error) {
          throw error;
        }
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character:', error.message);
      }
    }

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  return (
    <div>
      {character ? <CharacterSheet character={character} /> : <p>Loading...</p>}
    </div>
  );
}
