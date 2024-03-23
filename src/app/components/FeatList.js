"use client"

import "../styles/globals.css";
import styles from './FeatList.module.scss'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function FeatsList({ character }) {
    const feats = character && character.feats ? character.feats : [];
    const [featsInfo, setFeatsInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState({});

    async function fetchFeatsInfo() {
        try {
            const featsInfoPromises = feats.map(async featName => {
                const { data: featInfo } = await supabase
                    .from('Feats')
                    .select('*')
                    .eq('name', featName)
                    .single();

                return featInfo;
            });

            const fetchedFeatsInfo = await Promise.all(featsInfoPromises);
            setFeatsInfo(fetchedFeatsInfo);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching feats info:', error.message);
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFeatsInfo();
    }, []);

    return (
        <div className={styles.featsBlock}>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!loading && !error && (
                <>
                    <h2>Feats</h2>
                    {featsInfo.length === 0 ? (
                        <p>No feats found for this character.</p>
                    ) : (
                        <ul className={styles.featsList}>
                            {featsInfo.map((feat, index) => (
                                <li key={feat?.name} className={styles.featItem}>
                                    <button onClick={() => setExpanded(prevState => ({ ...prevState, [index]: !prevState[index] }))}>
                                        <strong>{feat?.name}</strong>
                                        {expanded[index] ? <IoChevronUp /> : <IoChevronDown />}
                                    </button>
                                    {expanded[index] && (
                                        <ul className={styles.featInfo}>
                                            {feat.ASI_bonus && (
                                                <li>
                                                    Add a bonus of {feat.ASI_bonus} to one ability of your choice between{' '}
                                                    {feat.ASI_choice && <strong>{feat.ASI_choice.join(', ')}</strong>}.
                                                </li>
                                            )}
                                            {feat.skill_1 && (
                                                <li>
                                                    You learn <strong>{feat.skill_1}</strong>.
                                                </li>
                                            )}
                                            {feat.skill_2 && (
                                                <li>
                                                    You learn <strong>{feat.skill_2}</strong> {feat.skill_2_desc}.
                                                </li>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}

export default FeatsList;