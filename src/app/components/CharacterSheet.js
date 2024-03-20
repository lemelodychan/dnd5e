import Image from 'next/image'
import styles from "./CharacterSheet.module.scss"

import ModifierCalc from "./ModifierCalc"

export default function Character({ character }) {
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
          <ModifierCalc attributeName="Strength" baseValue={character.str} character={character} />
          <ModifierCalc attributeName="Constitution" baseValue={character.con} character={character} />
          <ModifierCalc attributeName="Dexterity" baseValue={character.dex} character={character} />
          <ModifierCalc attributeName="Intelligence" baseValue={character.int} character={character} />
          <ModifierCalc attributeName="Wisdom" baseValue={character.wis} character={character} />
          <ModifierCalc attributeName="Charisma" baseValue={character.cha} character={character} />
        </div>
      </div>
    );
  }