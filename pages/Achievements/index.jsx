import Button from "components/Button";
import Layout from "components/Layout";
import { ACHIEVEMENTS } from "constants/ACHIEVEMENTS";
import { useI18N } from "context/i18n";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

export default function Achievements() {
  const [achievements, setAchievements] = useState(null);
  const { t } = useI18N();

  useEffect(() => {
    const achievements = JSON.parse(localStorage.getItem("achievements"));
    setAchievements(achievements);
  }, []);

  const handleResetAchievements = () => {
    localStorage.removeItem("achievements");
    localStorage.removeItem("wins");
    localStorage.removeItem("loses");
    localStorage.removeItem("roadToHero");
    setAchievements(ACHIEVEMENTS);
    Swal.fire({
      icon: "success",
      title: t("RESET_ACHIEVEMENTS_SUCCESS"),
    });
  };

  return (
    <Layout titleHeader={t("ACHIEVEMENTS")}>
      <h3 className={styles.title}>{t("LIST_ACHIEVEMENTS")}</h3>
      <div className={styles.resetBthContainer}>
        <Button onClick={handleResetAchievements} fitContent addBorder>
          {t("RESET_ACHIEVEMENTS")}
        </Button>
      </div>
      {achievements === null ? (
        <>{t("LOADING")}</>
      ) : (
        <ul className={styles.ul}>
          {achievements.map((achievement) => (
            <li key={achievement.id} className={`${styles.item} ${achievement.completed ? styles.completed : ""}`}>
              <Image src={achievement.imageUrl} alt={achievement.name[t("LOCALE")]} width={64} height={64} />
              <div className={styles.informationContainer}>
                <h4>{achievement.name[t("LOCALE")]}</h4>
                <p>{achievement.description[t("LOCALE")]}</p>
                <strong>{achievement.completed ? t("COMPLETED") : t("INCOMPLETED")}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
