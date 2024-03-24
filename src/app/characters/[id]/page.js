import { supabase } from '../../lib/supabase';
import Image from 'next/image';
import CharacterSheet from '../../components/CharacterSheet';

import styles from './page.module.scss'

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
        return <div>Error fetching character</div>;
    }
    if (!character) {
        notFound();
    }

    // FETCH CHARACTER CLASS
    const { data: characterClasses, error: classError } = await supabase.from('Class').select().eq('name', character.class);
    if (classError) {
        return <div>Error fetching character class</div>;
    }
    if (!characterClasses || characterClasses.length === 0) {
        return <div>No class found with name {character.class}</div>;
    }
    if (characterClasses.length > 1) {
        return <div>Multiple classes found with name {character.class}</div>;
    }

    const characterClass = characterClasses[0];
    const classModifier = characterClass.main_modifier;

    // FETCH ASI BONUSES
    const asiBonuses = character.ASI_bonuses;

    console.log("current HP",character.current_HP);
    console.log("alignment",character.alignment);

    return (
        <div className={styles.charaSheet}>
            <div className={styles.charaTop}>
                <Image
                    src={character.image}
                    alt={character.fullname}
                    width={200}
                    height={200}
                    className={styles.portrait}
                />
                <div className={styles.charaInfo}>
                    <h1>
                    {character.name}
                    <span>{character.fullname}</span>
                    </h1>
                    <p className={styles.charaTags}>
                    <span>Level {character.level}</span>
                    <span>{character.alignment}</span>
                    </p>
                    <p className={styles.raceBlock}>
                    <strong>Race</strong>
                    <span>{character.race_2 ? `${character.race_1}, ${character.race_2}` : character.race_1}</span>
                    </p>
                    <p className={styles.classBlock}>
                    <strong>Class</strong>
                    <span>{character.class}, {character.subclass}</span>
                    </p>
                    <p className={styles.bgBlock}>
                    <strong>Background</strong>
                    <span>{character.background}</span>
                    </p>
                </div>
            </div>
        
            <CharacterSheet 
                character={character} 
                classModifier={classModifier}
                asiBonuses={asiBonuses}
            />
        </div>
    );
}