// HPCalc.js
import React from 'react';

function HPCalc({ character, classModifier, calculateAttribute }) {
    const baseHP = character.rolled_HP || 0;

    const mainModifier = classModifier;
    const classModifierAttribute = calculateAttribute(mainModifier, 0, character);
    const modifier = classModifierAttribute.modifier;

    const maxHP = baseHP + ((modifier * -1) * character.level);

    return (
        <>
            {maxHP}
        </>
    );
}

export default HPCalc;