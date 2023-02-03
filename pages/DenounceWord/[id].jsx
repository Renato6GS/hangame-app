import Layout from "components/Layout";
import Link from "next/link";
import { sendDenounce } from "services/sendDenounce";
import { showModal } from "utils/modals";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

export default function DenounceWord({ word }) {
  const router = useRouter();

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
          <a className={styles.return}>Volver al menú principal</a>
        </Link>
        <h1>DenounceWord: {word}</h1>
        <p>
          Como principal desarrollador de esta web (hangame.app) toma parte del disfrute y entretenimiento al utilizar
          una inteligencia artificial (desarrollada por co:here) como base fundamental del juego para la generación de
          palabras, soy consciente de que en ocasiones puede generar palabras inadecuadas o incorrectas.
        </p>
        <p>
          Es por ello, que agradezco que tome su tiempo para denunciar esta palabra <strong>{word}</strong> y así poder
          tomar las medidas correctivas.
        </p>
        <h3>Categorías</h3>
        <div className={styles.categoriesContainer}>
          <div>
            <input type="radio" name="category" id="typo" required />
            <label htmlFor="typo">La palabra está mal escrita</label>
          </div>
          <div>
            <input type="radio" name="category" id="offensive" required />
            <label htmlFor="offensive">La palabra es inapropiada</label>
          </div>
        </div>
        <h3>Comentarios</h3>
        <textarea
          placeholder="Agradezco si me da una breve explicación de la denuncia para entender mejor"
          cols="30"
          rows="6"
          name="commentary"
          maxLength={200}
          required></textarea>
        <button type="submit">Enviar</button>
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
