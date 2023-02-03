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
  return `<div style="display: flex; flex-direction: column; width: fit-content; justify-content: center; text-align: center"><span>
    ${t("ANSWER")}: ${word.join("")}
  </span><a href="/DenounceWord">${t("DENOUNCE_WORD")}</a></div>`;
};

export const showWinModal = (t, router, word) => {
  confetti();
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: "success",
    title: t("YOU_WON"),
    text: t("CONGRATULATIONS"),
    footer: footerResponse(t, router, word),
  }).then(() => {
    router.push("/");
  });
};

export const showLoseModal = (t, router, word) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: "error",
    title: t("GAME_OVER"),
    text: t("BETTER_LUCK"),
    footer: `${t("ANSWER")}: ${word.join("")}`,
  }).then(() => {
    router.push("/");
  });
};
