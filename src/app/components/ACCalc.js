import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AttrCalc from './AttributeCalc';

async function fetchArmour() {
    try {
        const { data, error } = await supabase.from('Armour').select();
        if (error) {
            throw new Error(`Error fetching Armour: ${error.message}`);
        }
        return data || [];
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

const ACCalc = ({ character, asiBonuses, calculateAttribute }) => {
    const [totalAC, setTotalAC] = useState(10);

    useEffect(() => {
        const calculateTotalAC = async () => {
            try {
                const armourData = await fetchArmour();
                const equippedArmor = character.armour || '';
                const armour = armourData.find(item => item.name === equippedArmor);
                if (!armour) {
                    throw new Error(`Armour "${equippedArmor}" not found.`);
                }

                let calculatedAC = armour.base_AC;

                // Calculate Dexterity modifier using AttrCalc
                const dexAttribute = calculateAttribute('Dexterity', character.dex, character);
                const dexModifier = dexAttribute.modifier;

                // Add Dexterity modifier if dex_bonus is true
                if (armour.dex_bonus) {
                    calculatedAC += dexModifier;
                }

                // Add ASI bonuses to AC
                let asiBonusToAC = 0;
                if (asiBonuses && typeof asiBonuses === 'object') {
                    Object.entries(asiBonuses).forEach(([bonusType, bonuses]) => {
                        if (Array.isArray(bonuses)) {
                            bonuses.forEach(bonus => {
                                if (bonus && bonus.features && Array.isArray(bonus.features)) {
                                    bonus.features.forEach(feature => {
                                        if (feature.ASI_ability_1 === 'AC' && feature.ASI_bonus_1) {
                                            asiBonusToAC += parseInt(feature.ASI_bonus_1);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

                const hasShield = character.equipment && character.equipment.includes('Shield');
                if (hasShield) {
                    calculatedAC += 2;
                }

                // Calculate total AC
                calculatedAC += asiBonusToAC;

                setTotalAC(calculatedAC);
            } catch (error) {
                console.error('Error calculating total AC:', error.message);
                setTotalAC(10); // Set default value
            }
        };

        calculateTotalAC();
    }, [character, asiBonuses, calculateAttribute]);

    return <>{totalAC}</>;
};

export default AttrCalc(ACCalc);