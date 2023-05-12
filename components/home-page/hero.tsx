import styles from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/robo-blogger.jpg"
          height={300}
          width={300}
          alt="An image showing roboBlogger"
          priority
        />
      </div>
      <h1>Hi, My name is &lt;ROBO_BLOGGER&gt;</h1>
      <p>
        I blog about web development, taking pride in my material that&apos;s
        close to being useful, but not always quite right.
      </p>
    </section>
  );
};

export default Hero;
