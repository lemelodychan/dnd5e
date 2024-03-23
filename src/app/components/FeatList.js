"use client"
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const FeatsList = ({ character }) => {
    const [featsInfo, setFeatsInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatsInfo = async () => {
            const { feats } = character;
            try {
                if (feats && feats.length > 0) {
                    const featsInfoPromises = feats.map(async featName => {
                        const { data: featInfo, error } = await supabase
                            .from('Feats')
                            .select('*')
                            .eq('name', featName)
                            .single();

                        if (error) {
                            throw new Error(error.message);
                        }

                        return featInfo;
                    });

                    const fetchedFeatsInfo = await Promise.all(featsInfoPromises);
                    setFeatsInfo(fetchedFeatsInfo);
                } else {
                    setFeatsInfo([]);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching feats info:', error.message);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchFeatsInfo();
    }, [character]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (featsInfo.length === 0) {
        return <div>No feats found for this character.</div>;
    }

    return (
        <div>
            <h2>Feats:</h2>
            <ul>
                {featsInfo.map(feat => (
                    <li key={feat.name}>
                        <strong>{feat.name}</strong>
                        <ul>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FeatsList;