import React from 'react';

import "../styles/globals.css";
import styles from "./SkillInformation.module.scss"

function generateModifierWithProficiency(modifier, isProficient, proficiencyBonus) {
    const modifiedModifier = modifier + (isProficient ? proficiencyBonus : 0);
    return modifiedModifier >= 0 ? `+${modifiedModifier}` : modifiedModifier.toString();
}

function SkillRow({ skillName, modifier, isProficient, proficiencyBonus }) {
    const modifiedModifier = generateModifierWithProficiency(parseInt(modifier), isProficient, proficiencyBonus); // Parse modifier as an integer

    return (
        <p className={styles.skillLine}>
            <input type="radio" checked={isProficient} readOnly /> {/* Render checked radio button if proficient */}
            <strong>{skillName}</strong>
            <span>{modifiedModifier}</span>
        </p>
    );
}

export default SkillRow;