import { ArrowClockwise, House } from "@phosphor-icons/react";
import styles from './Nav.module.css'

type Type = {
  onClick: () => void,
}

function Nav({ onClick }: Type) {

  return (
    <nav className="navbar">
      <a className={ styles.house} href="https://danilobertolini.github.io/DB-Games/">
        <House size={32} color="#025DB9" />
      </a>
      <button
      onClick={ onClick }
      className={ styles.button }
      >
        <ArrowClockwise size={32} color="#025DB9" />
      </button>
    </ nav>
  )
}

export default Nav;