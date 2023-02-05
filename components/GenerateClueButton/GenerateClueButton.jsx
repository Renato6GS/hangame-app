import Button from "components/Button";
import { useI18N } from "context/i18n";
import Swal from "sweetalert2";

export default function GenerateClueButton({ clueLoading, clue }) {
  const { t } = useI18N();

  const generateClue = async () => {
    Swal.fire({
      icon: "question",
      title: t("CLUE"),
      html: `${clueLoading ? t("LOADING_CLUE") : `<strong>${t("ANSWER")}</strong>: ${clue}`}`,
    });
  };

  return (
    <Button onClick={() => generateClue(clueLoading, clue)} addBorder fitContent>
      {t("GENERATE_CLUE")}
    </Button>
  );
}
