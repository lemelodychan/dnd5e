"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

import "../styles/globals.css";
import styles from './Menu.module.scss';

async function fetchCampaignsWithCharacters() {
    const { data: campaigns, error: campaignsError } = await supabase.from('Campaigns').select('*');
    if (campaignsError) {
        console.error('Error fetching campaigns:', campaignsError.message);
        return [];
    }

    const charactersPromises = campaigns.map(async (campaign) => {
        const { data: characters, error: charactersError } = await supabase.from('Characters').select('*').in('id', campaign.characters_id || []);
        if (charactersError) {
            console.error(`Error fetching characters for campaign ${campaign.id}:`, charactersError.message);
            return [];
        }
        return characters;
    });

    const charactersForCampaigns = await Promise.all(charactersPromises);

    return campaigns.map((campaign, index) => ({
        ...campaign,
        characters: charactersForCampaigns[index] || [],
    }));
}

function Menu() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const campaignsWithCharacters = await fetchCampaignsWithCharacters();
            setCampaigns(campaignsWithCharacters);
        }
        fetchData();
    }, []);

    return (
        <div className={styles.menu}>
            {campaigns.length > 0 ? (
                <ul className={styles.allCampaigns}>
                    {campaigns.map((campaign) => (
                        <li key={campaign.id} className={styles.campaignList}>
                            <h2>{campaign.name}</h2>
                            {campaign.characters.length > 0 ? (
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
                                <p>No characters found for this campaign.</p>
                            )}
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
