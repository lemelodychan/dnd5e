import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

async function fetchCharacters() {    
    let { data, error } = await supabase.from('Characters').select('*')
    if (error) {
        return [];
    }
    return data || [];
}

function Menu() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const characters = await fetchCharacters();
            setCharacters(characters);
        }
        fetchData();
    }, []);

    return (
        <div>
            <h1>Character Menu</h1>
            {characters.length > 0 ? (
            <ul>
                {characters.map(character => (
                <li key={character.id}>
                    <Link href={`/characters/${character.id}`}>
                    {character.name}
                    </Link>
                </li>
                ))}
            </ul>
            ) : (
            <p>Loading...</p>
            )}
        </div>
    );
}

export default Menu;