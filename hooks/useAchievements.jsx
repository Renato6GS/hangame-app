import confetti from "canvas-confetti";
import { ACHIEVEMENTS } from "constants/ACHIEVEMENTS";
import { useEffect } from "react";
import Swal from "sweetalert2";

export const useAchievements = () => {
  useEffect(() => {
    async function fetchData() {
      // achievements
      if (localStorage.getItem("achievements") === null) {
        localStorage.setItem("achievements", JSON.stringify(ACHIEVEMENTS));
        localStorage.setItem("wins", 0);
        localStorage.setItem("loses", 0);
      } else {
        const achievements = JSON.parse(localStorage.getItem("achievements"));

        for (let i = 0; i < achievements.length; i++) {
          if (achievements[i].completed === true && achievements[i].disabled === false) {
            confetti();
            await Swal.fire({
              title: achievements[i].name,
              text: achievements[i].text,
              imageUrl: achievements[i].imageUrl,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: "Custom image",
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
