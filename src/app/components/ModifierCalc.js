import React from 'react';

function calculateModifier(baseValue) {
    const totalValue = baseValue;
    return Math.floor(((10 - totalValue) / 2) * -1);
}

function ModifierCalc({ attributeName, baseValue }) {
    const modifier = calculateModifier(baseValue);
    const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

    return (
        <div>
            <h3>{attributeName} Modifier:</h3>
            <p>{modifierString}</p>
        </div>
    );
}

export default ModifierCalc;
