import Image from 'next/image'
import { supabase } from '../lib/supabase';

import "../styles/globals.css";
import styles from "./CharacterSheet.module.scss"

import calculateAbilityScore from './CalcASI';
import HPCalc from './HPCalc';
import ACCalc from './ACCalc';
import AttributeCalc from './AttributeCalc';
import SkillRow from './SkillInformation';
import FeatsList from './FeatList';

function calculateModifierScore(totalAttributeValue) {
  const modifier = Math.floor(((10 - totalAttributeValue) / 2) * -1);
  return modifier;
}
function calculateModifier(totalAttributeValue) {
  const modifier = Math.floor(((10 - totalAttributeValue) / 2) * -1);
  return modifier >= 0 ? `${modifier}` : modifier.toString();
}

const MaxHP = AttributeCalc(HPCalc);

export default function CharacterSheet({ character, characterClass, classModifier, asiBonuses, skills }) {

  const strength = calculateAbilityScore('Strength', character.str, character);
  const constitution = calculateAbilityScore('Constitution', character.con, character);
  const dexterity = calculateAbilityScore('Dexterity', character.dex, character);
  const intelligence = calculateAbilityScore('Intelligence', character.int, character);
  const wisdom = calculateAbilityScore('Wisdom', character.wis, character);
  const charisma = calculateAbilityScore('Charisma', character.cha, character);

  const strengthModifier = calculateModifier(strength);
  const constitutionModifier = calculateModifier(constitution);
  const dexterityModifier = calculateModifier(dexterity);
  const intelligenceModifier = calculateModifier(intelligence);
  const wisdomModifier = calculateModifier(wisdom);
  const charismaModifier = calculateModifier(charisma);

  function calculateProficiencyBonus(level) {
      if (level >= 1 && level <= 4) {
          return 2;
      }
      if (level >= 5 && level <= 20) {
          return Math.floor((level - 1) / 4) + 2;
      }
      return 0;
  }
  const level = character.level;
  const proficiencyBonus = calculateProficiencyBonus(level);

  const strSavingThrow = calculateModifierScore(character.str) + (character.proficiency.includes('Strength Saving Throw') ? proficiencyBonus : 0);

  const passiveInsight = 10 + calculateModifierScore(character.wis) + (character.proficiency.includes('Insight') ? proficiencyBonus : 0);
  const passivePerception = 10 + calculateModifierScore(character.wis) + (character.proficiency.includes('Perception') ? proficiencyBonus : 0);

    return (
      <div>
        <Image
          src={character.image}
          alt={character.fullname}
          width={200}
          height={200}
          className={styles.portrait}
        />
        <h1>{character.name}</h1>
        <p>{character.fullname}</p>
        <p>Level {character.level}</p>
        <p>{character.alignment}</p>
        <p>{character.race_2 ? `${character.race_1}, ${character.race_2}` : character.race_1}</p>
        <p>{character.class}, {character.subclass}</p>
        <p>{character.background}</p>
        
        <div>
          <FeatsList character={character} feats={character && character.feats ? character.feats : []} />
        </div>
        
        <h2>Ability Scores</h2>
        <div>
          Proficiency bonus: +{proficiencyBonus}
          <p>Passive insight: {passiveInsight}</p>
          <p>Passive perception: {passivePerception}</p>
        </div>
        <div className={styles.ASI}>
          <div>
            Strength score: {strength}
            <br />Modifier: {strengthModifier}
            <SkillRow 
              skillName="Strength Saving Throw" 
              modifier={strengthModifier} 
              isProficient={character.proficiency.includes('Strength Saving Throw')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Athletics" 
              modifier={strengthModifier} 
              isProficient={character.proficiency.includes('Athletics')} 
              proficiencyBonus={proficiencyBonus} 
            />
          </div>
          <div>
            Constitution score: {constitution}
            <br />Modifier: {constitutionModifier}
            <SkillRow 
              skillName="Constitution Saving Throw" 
              modifier={constitutionModifier} 
              isProficient={character.proficiency.includes('Constitution Saving Throw')} 
              proficiencyBonus={proficiencyBonus} 
            />
          </div>
          <div>
            Dexterity score: {dexterity}
            <br />Modifier: {dexterityModifier}
            <SkillRow 
              skillName="Dexterity Saving Throw" 
              modifier={dexterityModifier} 
              isProficient={character.proficiency.includes('Dexterity Saving Throw')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Acrobatics" 
              modifier={dexterityModifier} 
              isProficient={character.proficiency.includes('Acrobatics')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Sleight of Hand" 
              modifier={dexterityModifier} 
              isProficient={character.proficiency.includes('Sleight of Hand')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Stealth" 
              modifier={dexterityModifier} 
              isProficient={character.proficiency.includes('Stealth')} 
              proficiencyBonus={proficiencyBonus} 
            />
          </div>
          <div>
            Intelligence score: {intelligence}
            <br />Modifier: {intelligenceModifier}
            <SkillRow 
              skillName="Intelligence Saving Throw" 
              modifier={intelligenceModifier} 
              isProficient={character.proficiency.includes('Intelligence Saving Throw')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Arcana" 
              modifier={intelligenceModifier} 
              isProficient={character.proficiency.includes('Arcana')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="History" 
              modifier={intelligenceModifier} 
              isProficient={character.proficiency.includes('History')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Investigation" 
              modifier={intelligenceModifier} 
              isProficient={character.proficiency.includes('Investigation')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Nature" 
              modifier={intelligenceModifier} 
              isProficient={character.proficiency.includes('Nature')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Religion" 
              modifier={intelligenceModifier} 
              isProficient={character.proficiency.includes('Religion')} 
              proficiencyBonus={proficiencyBonus} 
            />
          </div>
          <div>
            Wisdom score: {wisdom}
            <br />Modifier: {wisdomModifier}
            <SkillRow 
              skillName="Wisdom Saving Throw" 
              modifier={wisdomModifier} 
              isProficient={character.proficiency.includes('Wisdom Saving Throw')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Animal Handling" 
              modifier={wisdomModifier} 
              isProficient={character.proficiency.includes('Animal Handling')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Insight" 
              modifier={wisdomModifier} 
              isProficient={character.proficiency.includes('Insight')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Medicine" 
              modifier={wisdomModifier} 
              isProficient={character.proficiency.includes('Medicine')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Perception" 
              modifier={wisdomModifier} 
              isProficient={character.proficiency.includes('Perception')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Survival" 
              modifier={wisdomModifier} 
              isProficient={character.proficiency.includes('Survival')} 
              proficiencyBonus={proficiencyBonus} 
            />
          </div>
          <div>
            Charisma score: {charisma}
            <br />Modifier: {charismaModifier}
            <SkillRow 
              skillName="Charisma Saving Throw" 
              modifier={charismaModifier} 
              isProficient={character.proficiency.includes('Charisma Saving Throw')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Deception" 
              modifier={charismaModifier} 
              isProficient={character.proficiency.includes('Deception')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Intimidation" 
              modifier={charismaModifier} 
              isProficient={character.proficiency.includes('Intimidation')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Performance" 
              modifier={charismaModifier} 
              isProficient={character.proficiency.includes('Performance')} 
              proficiencyBonus={proficiencyBonus} 
            />
            <SkillRow 
              skillName="Persuasion" 
              modifier={charismaModifier} 
              isProficient={character.proficiency.includes('Persuasion')} 
              proficiencyBonus={proficiencyBonus} 
            />
          </div>
        </div>
        <div>
          <div>
            <h3>Current HP:</h3>
            {character.current_HP}
            <MaxHP character={character} classModifier={classModifier} />
          </div>
          <ACCalc character={character} classModifier="Dexterity" asiBonuses={asiBonuses} />
        </div>
        <div>
          class features
        </div>
        <div>
          spells
        </div>
      </div>
    );
}