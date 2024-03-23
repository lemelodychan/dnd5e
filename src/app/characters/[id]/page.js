import { supabase } from '../../lib/supabase';
import CharacterSheet from '../../components/CharacterSheet';

export async function generateStaticParams() {
    const { data: characters, error } = await supabase.from('Characters').select('id');
    if (error) {
        console.error('Error fetching characters:', error.message);
        return [];
    }
    return characters?.map(({ id }) => ({
        params: { id },
    }));
}

export default async function CharacterPage({ params: { id } }) {
    const { data: character, error: characterError } = await supabase.from('Characters').select().match({ id }).single();
    if (characterError) {
        console.error('Error fetching character:', characterError.message);
        return <div>Error fetching character</div>;
    }
    if (!character) {
        notFound();
    }

    // FETCH CHARACTER CLASS
    const { data: characterClasses, error: classError } = await supabase.from('Class').select().eq('name', character.class);
    if (classError) {
        console.error('Error fetching character class:', classError.message);
        return <div>Error fetching character class</div>;
    }
    if (!characterClasses || characterClasses.length === 0) {
        console.error(`No class found with name "${character.class}"`);
        return <div>No class found with name "{character.class}"</div>;
    }
    if (characterClasses.length > 1) {
        console.error(`Multiple classes found with name "${character.class}"`);
        return <div>Multiple classes found with name "{character.class}"</div>;
    }

    const characterClass = characterClasses[0];
    const classModifier = characterClass.main_modifier;

    return (
        <div>
            {character && characterClass ? (
                <CharacterSheet character={character} characterClass={characterClass} classModifier={classModifier} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}