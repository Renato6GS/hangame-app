import Layout from "components/Layout";
import styles from "../styles/Home.module.css";

import LayoutButton from "components/LayoutButton";
import LinkToPage from "components/LinkToPage";
import { useI18N } from "context/i18n";
import HeadSEO from "components/HeadSEO";
import { useAchievements } from "hooks/useAchievements";

export default function Home() {
  const { t } = useI18N();
  useAchievements();

  return (
    <div className={styles.container}>
      <HeadSEO title={"SEO_MAIN_MENU"} description="The best Hangman game" />
      <Layout isMainMenu={true} footer={true}>
        <section className={styles.mainMenuContainer}>
          <h1 className={styles.title}>Hangame</h1>
          <p className={styles.instructions}>{t("TITLE_MAIN_MENU")}</p>

          <LayoutButton>
            <LinkToPage contain={t("ONE_PLAYER_MAIN_MENU")} href="/OnePlayer" />
            <LinkToPage contain={t("CREATE_WORD")} href="/CreateWord" />
            <LinkToPage contain={t("ACHIEVEMENTS")} href="/Achievements" />
            <LinkToPage contain={t("CHANGE_LANGUAGE")} href="/ChangeLanguage" />
          </LayoutButton>
        </section>
      </Layout>
    </div>
  );
}
