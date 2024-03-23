import React from 'react';

function generateModifierWithProficiency(modifier, isProficient, proficiencyBonus) {
    const modifiedModifier = modifier + (isProficient ? proficiencyBonus : 0);
    return modifiedModifier >= 0 ? `+${modifiedModifier}` : modifiedModifier.toString();
}

function SkillRow({ skillName, modifier, isProficient, proficiencyBonus }) {
    const modifiedModifier = generateModifierWithProficiency(parseInt(modifier), isProficient, proficiencyBonus); // Parse modifier as an integer

    return (
        <p>
            <input type="radio" checked={isProficient} readOnly /> {/* Render checked radio button if proficient */}
            {skillName}: {modifiedModifier}
        </p>
    );
}

export default SkillRow;