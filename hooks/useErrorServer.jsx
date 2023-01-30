import { useEffect } from "react";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useI18N } from "context/i18n";

export const useErrorServer = ({ word }) => {
  const router = useRouter();
  const { t } = useI18N();

  useEffect(() => {
    if (word.length === 0) {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        icon: "error",
        title: t("SERVER_ERROR_MODAL"),
        text: t("TEXT_ERROR_MODAL"),
      }).then(() => {
        router.push("/");
      });
    }
  }, []);
};
