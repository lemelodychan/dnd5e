// CharacterSheet.js
import Image from 'next/image'
import styles from "./CharacterSheet.module.scss"

import ModifierCalc from './ModifierCalc';
import HPCalc from './HPCalc';
import ACCalc from './ACCalc';
import AttributeCalc from './AttributeCalc';

const Modifier = AttributeCalc(ModifierCalc);
const MaxHP = AttributeCalc(HPCalc);

export default function CharacterSheet({ character, characterClass, classModifier }) {
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
        <p>{character.race_1}, {character.race_2}</p>
        <p>{character.class}, {character.subclass}</p>
        <div>
          <Modifier attributeName="Strength" baseValue={character.str} character={character} />
          <Modifier attributeName="Constitution" baseValue={character.con} character={character} />
          <Modifier attributeName="Dexterity" baseValue={character.dex} character={character} />
          <Modifier attributeName="Intelligence" baseValue={character.int} character={character} />
          <Modifier attributeName="Wisdom" baseValue={character.wis} character={character} />
          <Modifier attributeName="Charisma" baseValue={character.cha} character={character} />
        </div>
        <div>
          <MaxHP character={character} classModifier={classModifier} />
          <ACCalc character={character} classModifier="Dexterity" />
        </div>
      </div>
    );
}