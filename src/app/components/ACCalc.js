import React from 'react';
import { supabase } from '../lib/supabase';
import AttrCalc from './AttributeCalc';

async function fetchArmour() {
    const { data, error } = await supabase.from('Armour').select();
    if (error) {
        console.error('Error fetching Armour:', error.message);
        return [];
    }
    return data || [];
}

const ACCalc = ({ character, asiBonuses, calculateAttribute }) => {
    const calculateTotalAC = async () => {
        try {
            const armourData = await fetchArmour();
            const equippedArmor = character.armour || '';
            const armour = armourData.find(item => item.name === equippedArmor);
            if (!armour) {
                throw new Error(`Armour "${equippedArmor}" not found.`);
            }

            let totalAC = armour.base_AC;

            // Calculate Dexterity modifier using AttrCalc
            const dexAttribute = calculateAttribute('Dexterity', character.dex, character);
            const dexModifier = dexAttribute.modifier;

            // Add Dexterity modifier if dex_bonus is true
            if (armour.dex_bonus) {
                totalAC += dexModifier;
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
                totalAC += 2;
            }

            // Calculate total AC
            totalAC += asiBonusToAC;

            return totalAC;
        } catch (error) {
            console.error('Error calculating total AC:', error.message);
            return 10; // Return default value
        }
    };

    return (
        <div>
            <h3>Armor Class:</h3>
            {calculateTotalAC()}
        </div>
    );
}

export default AttrCalc(ACCalc);