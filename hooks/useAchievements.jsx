import confetti from "canvas-confetti";
import { ACHIEVEMENTS } from "constants/ACHIEVEMENTS";
import { useI18N } from "context/i18n";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const useAchievements = () => {
  const { t } = useI18N();

  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("achievements") === null) {
        // load achievements
        localStorage.setItem("achievements", JSON.stringify(ACHIEVEMENTS));
        localStorage.setItem("wins", 0);
        localStorage.setItem("loses", 0);
      } else {
        const achievements = JSON.parse(localStorage.getItem("achievements"));

        for (let i = 0; i < achievements.length; i++) {
          if (achievements[i].completed === true && achievements[i].disabled === false) {
            confetti();
            await Swal.fire({
              title: achievements[i].name[t("LOCALE")],
              text: achievements[i].text[t("LOCALE")],
              imageUrl: achievements[i].imageUrl,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: achievements[i].text[t("LOCALE")],
            }).then(() => {
              achievements[i].disabled = true;
              localStorage.setItem("achievements", JSON.stringify(achievements));
            });
          }
        }

        // Esto no funcionó, pero el for sí xD
        // achievements.forEach(async (achievement) => {
        //   console.log(achievement.completed);
        //   if (achievement.completed === true) {
        //     await Swal.fire({
        //       title: achievement.name,
        //       text: achievement.text,
        //       imageUrl: achievement.imageUrl,
        //       imageWidth: 400,
        //       imageHeight: 200,
        //       imageAlt: "Custom image",
        //     }).then(() => {});
        //   }
        // });
      }
    }
    fetchData();
  });
};
