import Button from "components/Button";
import Layout from "components/Layout";
import { ACHIEVEMENTS } from "constants/ACHIEVEMENTS";
import Image from "next/image";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import styles from "./styles.module.css";

export default function Achievements() {
  const [achievements, setAchievements] = useState(null);

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
      title: "Logros reiniciados",
    });
  };

  return (
    <Layout titleHeader="Logros">
      <h3 className={styles.title}>Listado de logros</h3>
      <div className={styles.resetBthContainer}>
        <Button onClick={handleResetAchievements} fitContent addBorder>
          Reiniciar logros
        </Button>
      </div>
      {achievements === null ? (
        "Cargando"
      ) : (
        <ul className={styles.ul}>
          {achievements.map((achievement) => (
            <li key={achievement.id} className={`${styles.item} ${achievement.completed ? styles.completed : ""}`}>
              <Image src={achievement.imageUrl} alt={achievement.name} width={64} height={64} />
              <div className={styles.informationContainer}>
                <h4>{achievement.name}</h4>
                <p>{achievement.description}</p>
                <strong>{achievement.completed ? "Completado" : "Sin completar"}</strong>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
