import { supabase } from '../../lib/supabase';
import CharacterSheet from '../../components/CharacterSheet';

export async function generateStaticParams() {
    const { data: characters, error } = await supabase.from('Characters').select('id')
    if (error) {
        console.error('Error fetching posts:', error.message);
        return [];
    }
    return characters?.map(({ id }) => ({
        params: { id },
    }));
}

export default async function CharacterPage({ params: { id } }) {
    const { data: character, error } = await supabase.from('Characters').select().match({ id }).single()
    if (error) {
        console.error('Error fetching post:', error.message);
        return <div>Error fetching post</div>;
    }
    if (!character) {
        notFound();
    }

    return (
        <div>
          {character ? <CharacterSheet character={character} /> : <p>Loading...</p>}
        </div>
    );
}