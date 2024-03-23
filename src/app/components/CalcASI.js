import React from 'react';

function calculateAbilityScore(attributeName, baseValue, character) {
    let totalAttributeValue = baseValue;

    const processBonuses = (bonuses) => {
        if (bonuses) {
            Object.values(bonuses).forEach(bonusArray => {
                bonusArray.forEach(bonus => {
                    if (bonus.ASI_ability_1 === attributeName) {
                        totalAttributeValue += parseInt(bonus.ASI_bonus_1);
                    } else if (bonus.ASI_ability_2 === attributeName) {
                        totalAttributeValue += parseInt(bonus.ASI_bonus_2);
                    }
                });
            });
        }
    };

    processBonuses(character.ASI_bonuses);

    return totalAttributeValue;
}

export default calculateAbilityScore;