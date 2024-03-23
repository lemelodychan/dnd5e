import React from 'react';

const calculateSkillModifier = (character, skills) => {
    const skillModifiers = {};

    skills.forEach(skill => {
        const abilityModifier = character[skill.ability.toLowerCase()];
        const proficiency = character.proficiency[skill.name.toLowerCase()] || 0;
        const modifier = Math.floor(((abilityModifier - 10) / 2) + proficiency);

        skillModifiers[skill.name] = modifier;
    });

    return skillModifiers;
};

const SkillModifiers = ({ character, skills }) => {
    const skillModifiers = calculateSkillModifier(character, skills);

    return (
        <div>
            {/* Render skill modifiers */}
            {Object.entries(skillModifiers).map(([skillName, modifier]) => (
                <p key={skillName}>{skillName}: {modifier >= 0 ? `+${modifier}` : modifier}</p>
            ))}
        </div>
    );
}

export default SkillModifiers;