import Image from 'next/image'
import { supabase } from '../lib/supabase';

import "../styles/globals.css";
import styles from "./CharacterSheet.module.scss"

import { GiStrong, GiHearts, GiHand, GiBrain, GiEyeTarget, GiLips } from "react-icons/gi";

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

  const strengthModifier = `${Math.floor(((10 - strength) / 2) * -1) >= 0 ? '+' : ''}${Math.floor(((10 - strength) / 2) * -1)}`;
  const constitutionModifier = `${Math.floor(((10 - constitution) / 2) * -1) >= 0 ? '+' : ''}${Math.floor(((10 - constitution) / 2) * -1)}`;
  const dexterityModifier = `${Math.floor(((10 - dexterity) / 2) * -1) >= 0 ? '+' : ''}${Math.floor(((10 - dexterity) / 2) * -1)}`;
  const intelligenceModifier = `${Math.floor(((10 - intelligence) / 2) * -1) >= 0 ? '+' : ''}${Math.floor(((10 - intelligence) / 2) * -1)}`;
  const wisdomModifier = `${Math.floor(((10 - wisdom) / 2) * -1) >= 0 ? '+' : ''}${Math.floor(((10 - wisdom) / 2) * -1)}`;
  const charismaModifier = `${Math.floor(((10 - charisma) / 2) * -1) >= 0 ? '+' : ''}${Math.floor(((10 - charisma) / 2) * -1)}`;

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
  
  const passiveInsight = 10 + calculateModifierScore(character.wis) + (character.proficiency.includes('Insight') ? proficiencyBonus : 0);
  const passivePerception = 10 + calculateModifierScore(character.wis) + (character.proficiency.includes('Perception') ? proficiencyBonus : 0);

    return (
      <div>
        <div className={styles.charaTop}>
          <Image
            src={character.image}
            alt={character.fullname}
            width={200}
            height={200}
            className={styles.portrait}
          />
          <div className={styles.charaInfo}>
            <h1>{character.name}</h1>
            <p>{character.fullname}</p>
            <p>Level {character.level}</p>
            <p>{character.alignment}</p>
            <p>{character.race_2 ? `${character.race_1}, ${character.race_2}` : character.race_1}</p>
            <p>{character.class}, {character.subclass}</p>
            <p>{character.background}</p>
          </div>
        </div>
        
        <div>
          <FeatsList character={character} feats={character && character.feats ? character.feats : []} />
        </div>
        
        <div className={styles.ASIblock}>
          <h2>Ability Scores</h2>
          <div className={styles.otherScore}>
            <p><span>+{proficiencyBonus}</span><strong>Proficiency Bonus</strong></p>
            <p><span>{passiveInsight}</span><strong>Passive insight</strong></p>
            <p><span>{passivePerception}</span><strong>Passive perception</strong></p>
            <p><span>{character.current_HP}/<MaxHP character={character} classModifier={classModifier} /></span><strong>HP</strong></p>
            <p><span><ACCalc character={character} classModifier="Dexterity" asiBonuses={asiBonuses} /></span><strong>Armour Class</strong></p>
            <p><span>{character.level}d8</span><strong>Hit Dice</strong></p>
          </div>
          <div className={styles.ASI}>
            <div>
              <GiStrong size={24} />
              <div className={styles.scoreInfo}>
                <h3>Strength</h3>
                <span className={styles.numberScore}>{strength}</span>
                <span className={styles.numberModifier}>{strengthModifier}</span>
              </div>
              <div className={styles.skillsList}>
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
            </div>
            <div>
              <GiHearts size={24} />
              <div className={styles.scoreInfo}>
                <h3>Constitution</h3>
                <span className={styles.numberScore}>{constitution}</span>
                <span className={styles.numberModifier}>{constitutionModifier}</span>
              </div>
              <div className={styles.skillsList}>
                <SkillRow 
                  skillName="Constitution Saving Throw" 
                  modifier={constitutionModifier} 
                  isProficient={character.proficiency.includes('Constitution Saving Throw')} 
                  proficiencyBonus={proficiencyBonus} 
                />
              </div>
            </div>
            <div>
              <GiHand size={24} />
              <div className={styles.scoreInfo}>
                <h3>Dexterity</h3>
                <span className={styles.numberScore}>{dexterity}</span>
                <span className={styles.numberModifier}>{dexterityModifier}</span>
              </div>
              <div className={styles.skillsList}>
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
            </div>
            <div>
              <GiBrain size={24} />
              <div className={styles.scoreInfo}>
                <h3>Intelligence</h3>
                <span className={styles.numberScore}>{intelligence}</span>
                <span className={styles.numberModifier}>{intelligenceModifier}</span>
              </div>
              <div className={styles.skillsList}>
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
            </div>
            <div>
              <GiEyeTarget size={24} />
              <div className={styles.scoreInfo}>
                <h3>Wisdom</h3>
                <span className={styles.numberScore}>{wisdom}</span>
                <span className={styles.numberModifier}>{wisdomModifier}</span>
              </div>
              <div className={styles.skillsList}>
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
            </div>
            <div>
              <GiLips size={24} />
              <div className={styles.scoreInfo}>
                <h3>Charisma</h3>
                <span className={styles.numberScore}>{charisma}</span>
                <span className={styles.numberModifier}>{charismaModifier}</span>
              </div>
              <div className={styles.skillsList}>
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
          </div>
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