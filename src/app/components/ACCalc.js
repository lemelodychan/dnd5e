// ACCalc.js
import React from 'react';
import AttrCalc from './AttributeCalc';

function ACCalc({ character, calculateAttribute }) {
    const equippedArmor = character.armour || '';
    const armorACMap = {
        'Studded leather armour': 12,
    };
    const baseAC = armorACMap[equippedArmor] || 10;
    const dexModifier = calculateAttribute('Dexterity', character.dex, character).modifier;
    const totalAC = baseAC + dexModifier;

    return (
        <div>
            <h3>Armor Class:</h3>
            <p>{totalAC}</p>
        </div>
    );
}

export default AttrCalc(ACCalc);