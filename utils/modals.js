import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  confetti();
  Swal.fire({
    icon: "success",
    title: t("YOU_WON"),
    text: t("CONGRATULATIONS"),
    footer: footerResponse(t, word),
  }).then(() => {
    router.push("/");
  });
};

export const showLoseModal = (t, router, word) => {
  word = word.join("").replaceAll("_", " ");
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: "error",
    title: t("GAME_OVER"),
    text: t("BETTER_LUCK"),
    footer: footerResponse(t, word),
  }).then(() => {
    router.push("/");
  });
};
