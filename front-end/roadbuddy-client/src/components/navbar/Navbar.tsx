import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>RoadBuddy</div>
      <div>
        <Link href="/login">
          <button className={styles.loginButton}>Ввійти</button>
        </Link>
      </div>
    </nav>
  );
}
