import styles from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/matt.webp"
          height={300}
          width={300}
          alt="An image showing Matt"
        />
      </div>
      <h1>Hi, My name is Matt</h1>
      <p>I blog about web development, mostly frontend.</p>
    </section>
  );
};

export default Hero;
