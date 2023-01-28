import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const showModal = ({ type = "Success", title = "Emtpy title", message = "Empty message" }) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export const showModalAndRedirect = ({ type = "Success", title = "Emtpy title", message = "Empty message" }) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export const showWinModal = (t, router, word) => {
  confetti();
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: "success",
    title: t("YOU_WON"),
    text: t("CONGRATULATIONS"),
    footer: `${t("ANSWER")}: ${word.join("")}`,
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
