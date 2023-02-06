import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Howl } from "howler";
import {
  firstLose,
  firstWin,
  roadToHero,
  secretAchievement404,
  sumLose,
  sumWin,
  threeLosesInARow,
  threeWinsInARow,
} from "./handleAchievements";

export const showModal = async ({ type = "success", title = "Emtpy title", message = "Empty message" }) => {
  const MySwal = withReactContent(Swal);
  return await MySwal.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export const showModalAndRedirect = ({ type = "success", title = "Emtpy title", message = "Empty message" }) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export const footerResponse = (t, word) => {
  let denounceButton = "";
  const showDenounceButton = localStorage.getItem("showDenounceButton") === "true";

  if (showDenounceButton) {
    const localeSelected = localStorage.getItem("localeSelected");
    const locale = localeSelected === "en" ? localeSelected : localeSelected;
    denounceButton = `<a style="color: #0099ff" href="/DenounceWord/${word}?locale=${locale}">${t(
      "DENOUNCE_WORD"
    )}</a>`;
  }

  return `<div style="display: flex; flex-direction: column; width: fit-content; justify-content: center; text-align: center"><strong>
    ${t("ANSWER")}: ${word}</strong>${denounceButton}</div>`;
};

export const showWinModal = (t, router, word) => {
  word = word.join("").replaceAll("_", " ");
  firstWin();
  sumWin();
  threeWinsInARow();
  roadToHero();
  secretAchievement404({ word });
  confetti();
  const sound = new Howl({ src: "/sounds/you-win-monkey-island.mp3", volume: 0.8 });
  sound.play();
  Swal.fire({
    icon: "success",
    title: t("YOU_WON"),
    text: t("CONGRATULATIONS"),
    footer: footerResponse(t, word),
  }).then(() => {
    sound.stop();
    router.push("/");
  });
};

export const showLoseModal = (t, router, word) => {
  firstLose();
  sumLose();
  threeLosesInARow();

  word = word.join("").replaceAll("_", " ");
  const MySwal = withReactContent(Swal);
  const sound = new Howl({ src: "/sounds/you-lost.mp3", volume: 0.3 });
  sound.play();
  MySwal.fire({
    icon: "error",
    title: t("GAME_OVER"),
    text: t("BETTER_LUCK"),
    footer: footerResponse(t, word),
  }).then(() => {
    sound.stop();
    router.push("/");
  });
};
