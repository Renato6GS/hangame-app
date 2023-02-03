import Layout from "components/Layout";
import Link from "next/link";
import { sendDenounce } from "services/sendDenounce";
import { showModal } from "utils/modals";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import { useI18N } from "context/i18n";

export default function DenounceWord({ word }) {
  const router = useRouter();
  const { t } = useI18N();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const category = data.category;
    const commentary = data.commentary.trim();

    const res = await sendDenounce({ category, commentary, word });

    if (res.status || res) {
      showModal({
        title: "Denuncia realizada",
        message: "Gracias por tu denuncia, la revisaremos y tomaremos las medidas necesarias.",
      }).then(() => router.push("/"));
    } else {
      showModal({
        type: "error",
        title: "Error",
        message: "Ha ocurrido un error, por favor intenta de nuevo más tarde.",
      });
    }
  };

  return (
    <Layout>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Link href="/">
          <a className={styles.return}>{t("RETURN_MAIN_MENU")}</a>
        </Link>
        <h1>
          {t("DENOUNCE_WORD")}: &quot;{word}&quot;
        </h1>
        <p>{t("DENOUNCE_DESCRIPTION_1")}</p>
        <p>{t("DENOUNCE_DESCRIPTION_2", word)}</p>
        <h3>{t("CATEGORIES")}</h3>
        <div className={styles.categoriesContainer}>
          <div>
            <input type="radio" name="category" id="typo" required />
            <label htmlFor="typo">{t("DENOUNCE_TYPO")}</label>
          </div>
          <div>
            <input type="radio" name="category" id="offensive" required />
            <label htmlFor="offensive">{t("DENOUNCE_INAPROPRIATE")}</label>
          </div>
        </div>
        <h3>{t("COMMENTS")}</h3>
        <textarea
          placeholder={t("COMMENTS_PLACEHOLDER")}
          cols="30"
          rows="6"
          name="commentary"
          maxLength={200}
          required></textarea>
        <button type="submit">{t("SEND")}</button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id: word } = context.params;

  if (word.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: { word },
  };
}
