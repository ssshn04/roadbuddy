import styles from './index.module.css';
import { Card, CardContent, CardTitle, CardDescription } from '../components/card/Card'; // шлях підкоригуй, де у тебе Card.tsx
import Link from 'next/link';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

// Іконки (можна замінити на свої SVG або з бібліотеки)
const StepIcon = ({ number }: { number: number }) => (
  <div className={styles.stepIcon}>
    {number}
  </div>
);

export default function Home() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>RoadBuddy</h1>
          <p className={styles.subtitle}>
            Платформа для управління чергами на кордонах та пошуку заправних станцій
          </p>
          <Link href="/register" className={styles.ctaButton}>
            Почати користуватись
          </Link>
        </section>

        <section className={styles.features}>
          <h2 className={styles.featuresTitle}>Що ми пропонуємо</h2>
          <div className={styles.featureList}>
            <Card className={styles.featureItem}>
              <CardContent>
                <CardTitle>Управління чергами</CardTitle>
                <CardDescription>
                  Оптимізуйте час очікування на кордоні через попереднє бронювання та моніторинг завантаженості.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={styles.featureItem}>
              <CardContent>
                <CardTitle>Пошук заправок</CardTitle>
                <CardDescription>
                  Знаходьте заправки з актуальними цінами, фільтруйте за послугами, плануйте зручний маршрут.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className={styles.featureItem}>
              <CardContent>
                <CardTitle>Планування маршрутів</CardTitle>
                <CardDescription>
                  Поєднуємо дані про черги та пальне для найоптимальніших маршрутів і швидких поїздок.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Нова секція "Як це працює" */}
        <section className={styles.howItWorks}>
          <h2 className={styles.featuresTitle}>Як це працює</h2>
          <div className={styles.stepsContainer}>
            {[{
              number: 1,
              title: 'Реєстрація',
              description: 'Створіть акаунт, щоб почати користуватись платформою.'
            }, {
              number: 2,
              title: 'Бронювання черг',
              description: 'Оберіть потрібний пункт пропуску та забронюйте чергу онлайн.'
            }, {
              number: 3,
              title: 'Пошук заправок',
              description: 'Знайдіть найближчі заправки з актуальними цінами та послугами.'
            }, {
              number: 4,
              title: 'Планування маршруту',
              description: 'Отримайте оптимальний маршрут з урахуванням черг та пального.'
            }].map(({ number, title, description }) => (
              <Card key={number} className={styles.stepCard}>
                <CardContent>
                  <StepIcon number={number} />
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
