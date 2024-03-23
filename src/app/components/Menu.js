import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

import "../styles/globals.css";
import styles from './Menu.module.scss'

async function fetchCampaigns() {
    const { data, error } = await supabase.from('Campaigns').select('*');
    if (error) {
        console.error('Error fetching campaigns:', error.message);
        return [];
    }
    return data || [];
}

async function fetchCharactersForCampaign(campaign) {
    const characterIds = campaign.characters_id || [];
    const characters = [];

    for (const characterId of characterIds) {
        try {
            const { data, error } = await supabase.from('Characters').select('*').eq('id', characterId);
            if (error) {
                console.error(`Error fetching character with ID ${characterId}:`, error.message);
                continue;
            }
            if (data && data.length > 0) {
                characters.push(data[0]);
            }
        } catch (error) {
            console.error(`Error fetching character with ID ${characterId}:`, error.message);
        }
    }

    return characters;
}

function Menu() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const campaigns = await fetchCampaigns();
            setCampaigns(campaigns);
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchCharacterData() {
            const updatedCampaigns = await Promise.all(
                campaigns.map(async (campaign) => {
                    const characters = await fetchCharactersForCampaign(campaign);
                    return { ...campaign, characters };
                })
            );
            setCampaigns(updatedCampaigns);
        }
        fetchCharacterData();
    }, [campaigns]); // Trigger when campaigns change

    return (
        <div className={styles.menu}>
            {campaigns.length > 0 ? (
                <ul className={styles.allCampaigns}>
                    {campaigns.map((campaign) => (
                        <li key={campaign.id} className={styles.campaignList}>
                            <h2>{campaign.name}</h2>
                            {campaign.characters ? (
                                <ul>
                                    {campaign.characters.map((character) => (
                                        <li key={character.id} className={styles.characterLink}>
                                            <Link href={`/characters/${character.id}`}>
                                                {character.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>skeleton</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>skeleton</p>
            )}
        </div>
    );
}

export default Menu;