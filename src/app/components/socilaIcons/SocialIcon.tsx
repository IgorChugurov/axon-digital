import styles from "./styles.module.css";
import Image from "next/image";
interface Props {
  name: string;
  size?: number;
}

export default function SocialIcon({ name, size }: Props) {
  // Получение данных на сервере

  return (
    <div
      className={`${styles.imageContainer} ${size === 40 ? styles.size40 : ""}`}
    >
      <Image
        src={`/images/social/${name}.png`}
        alt={`${name} icon`}
        className={styles.image}
        fill
        sizes="100%"
      />
    </div>
  );
}
