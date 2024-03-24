import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import CharacterSheet from '@/app/components/CharacterSheet';
import styles from './[id].module.scss';
import { supabase } from '@/app/lib/supabase';

export async function getServerSideProps({ params }) {
    try {
        const { id } = params;
        const { data: character, error: characterError } = await supabase
            .from('Characters')
            .select()
            .match({ id })
            .single();

        if (characterError || !character) {
            return {
                notFound: true,
            };
        }

        const { data: characterClasses, error: classError } = await supabase
            .from('Class')
            .select()
            .eq('name', character.class);

        if (classError || !characterClasses || characterClasses.length === 0) {
            return {
                notFound: true,
            };
        }

        const characterClass = characterClasses[0];
        const classModifier = characterClass.main_modifier;
        const asiBonuses = character.ASI_bonuses;

        return {
            props: {
                character,
                classModifier,
                asiBonuses,
            },
        };
    } catch (error) {
        console.error('Error fetching character:', error.message);
        return {
            notFound: true,
        };
    }
}

export default function CharacterPage({ character: initialCharacter, classModifier, asiBonuses }) {
    const router = useRouter();
    const [character, setCharacter] = useState(initialCharacter);

    useEffect(() => {
        async function fetchCharacter() {
            try {
                const { data: fetchedCharacter, error } = await supabase
                    .from('Characters')
                    .select()
                    .match({ id: router.query.id })
                    .single();

                if (error || !fetchedCharacter) {
                    console.error('Error fetching character:', error?.message || 'Character not found');
                    router.push('/404'); // Redirect to 404 page if character not found
                    return;
                }

                setCharacter(fetchedCharacter);
            } catch (error) {
                console.error('Error fetching character:', error.message);
            }
        }

        if (!character || character.id !== router.query.id) {
            fetchCharacter();
        }
    }, [router.query.id]);

    return (
        <div className={styles.charaSheet}>
            <div className={styles.charaTop}>
                {character && (
                    <Image
                        src={character.image}
                        alt={character.fullname}
                        width={200}
                        height={200}
                        className={styles.portrait}
                    />
                )}
                <div className={styles.charaInfo}>
                    {character && (
                        <>
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
                                <span>
                                    {character.race_2 ? `${character.race_1}, ${character.race_2}` : character.race_1}
                                </span>
                            </p>
                            <p className={styles.classBlock}>
                                <strong>Class</strong>
                                <span>
                                    {character.class}, {character.subclass}
                                </span>
                            </p>
                            <p className={styles.bgBlock}>
                                <strong>Background</strong>
                                <span>{character.background}</span>
                            </p>
                        </>
                    )}
                </div>
            </div>
            {character && (
                <CharacterSheet character={character} classModifier={classModifier} asiBonuses={asiBonuses} />
            )}
        </div>
    );
}