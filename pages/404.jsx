import HeadSEO from "components/HeadSEO";
import Layout from "components/Layout";
import Link from "next/link";

import styles from "./404.module.css";

export default function Custom404() {
  //
  // U2FsdGVkX1%2BNalzWcwgvZco%2FrSkkDLU%2FvR6VlYV57pA%3D

  return (
    <>
      <HeadSEO title="Hange - 404" description={"Página no encontrada"} />
      <Layout titleHeader="404">
        <main className={styles.mainContainer}>
          <h1>404 - Page Not Found</h1>
          <p>Parece ser que la palabra no es la única perdida 😋</p>
          <p>Siento mucho que tengas que haber visitado esta página.</p>
          <p>Como compensación, ¿Qué te parece si le das al siguiente botón? ¿Quizás sea un helado de vainilla 🍨?</p>
          <section className={styles.buttonsContainer}>
            <Link href={"/Game/CU2FsdGVkX1%2F6%2Ft1I6e%2FrMxvahiG6Tx5EH%2BPt1XPVdec%3D"}>
              <a>Sí, pero, ¿sólo uno 😢? 🍦🍧🍨</a>
            </Link>
            <Link href={"/"}>
              <a>No, suélteme del brazo señor 💀</a>
            </Link>
          </section>
        </main>
      </Layout>
    </>
  );
}
