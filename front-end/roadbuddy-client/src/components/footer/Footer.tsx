import { FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.item}>
        <FaPhone className={styles.icon} />
        Телефон: +380 99 123 45 67
      </div>
      <div className={styles.item}>
        <FaEnvelope className={styles.icon} />
        Підтримка: support@roadbuddy.com
      </div>
    </footer>
  );
}
