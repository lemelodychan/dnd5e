import React from 'react';

function calculateAttribute(attributeName, baseValue, character) {
    let totalAttributeValue = baseValue;

    if (character.ASI_bonuses) {
        Object.values(character.ASI_bonuses).forEach(bonusCategory => {
            bonusCategory.forEach(bonus => {
                if (bonus.ASI_ability_1 === attributeName) {
                    totalAttributeValue += parseInt(bonus.ASI_bonus_1);
                }
                if (bonus.ASI_ability_2 === attributeName) {
                    totalAttributeValue += parseInt(bonus.ASI_bonus_2);
                }
            });
        });
    }
    return {
        totalValue: totalAttributeValue,
        modifier: Math.floor(((10 - totalAttributeValue) / 2) * -1)
    };
}
function AttrCalc(WrappedComponent) {
    return function WithAttributeCalc(props) {
        return <WrappedComponent {...props} calculateAttribute={calculateAttribute} />;
    };
}

export default AttrCalc;