import { supabase } from '../lib/supabase';

export async function fetchCharacter(id) {
  try {
    const { data, error } = await supabase
      .from('Characters')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error('Error fetching character:', error.message);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error fetching character:', error.message);
    return null;
  }
}

export async function getCharacterProps({ params }) {
    const { id } = params;
    const character = await fetchCharacter(id);
    return {
      props: {
        character,
      },
    };
  }
