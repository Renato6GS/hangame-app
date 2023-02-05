import Layout from "components/Layout";
import Link from "next/link";
import { sendDenounce } from "services/sendDenounce";
import { showModal } from "utils/modals";
import { useRouter } from "next/router";

import styles from "./styles.module.css";
import { useI18N } from "context/i18n";
import HeadSEO from "components/HeadSEO";

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
        title: t("DENOUNCE_SENT"),
        message: t("DENOUNCE_SENT_DESCRIPTION"),
      }).then(() => router.push("/"));
    } else {
      showModal({
        type: "error",
        title: t("ERROR"),
        message: t("DENOUNCE_ERROR_DESCRIPTION"),
      });
    }
  };

  return (
    <>
      <HeadSEO title="DENOUNCE_WORD" description={"DENOUNCE_WORD_SEO"} />
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
              <input type="radio" name="category" id="typo" value="typo" required />
              <label htmlFor="typo">{t("DENOUNCE_TYPO")}</label>
            </div>
            <div>
              <input type="radio" name="category" id="offensive" value="offensive" required />
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
    </>
  );
}

export async function getServerSideProps(context) {
  const { id: word } = context.params;
  const { locale } = context.query;

  if (word.length === 0) {
    return {
      notFound: true,
    };
  }

  if (locale === "es") {
    return {
      redirect: {
        destination: `/es/DenounceWord/${word}`,
        permanent: false,
      },
    };
  }

  return {
    props: { word },
  };
}
