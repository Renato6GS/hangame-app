import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import styles from './styles.module.css';
import Layout from 'components/Layout';
import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';

export default function Offline() {
  const [keyword, setKeyword] = useState('');
  const [crypto, setCrypto] = useState('');
  const router = useRouter();
  const REG = /^[a-zA-ZÁáÉéÍíÓóÚúñÑ]+$/g;
  const MySwal = withReactContent(Swal);

  const validateCharacters = ({ keyword }) => {
    if (!REG.test(keyword)) {
      MySwal.fire({
        icon: 'error',
        title: 'Palabra inválida',
        text: 'Por favor ingrese una palabra sin espacios, sin números y sin caracteres especiales.',
      });
      return true;
    }
    return false;
  };

  const validateLeng = ({ keyword }) => {
    if (keyword.length <= 14) return false;
    MySwal.fire({
      icon: 'error',
      title: 'Palabra muy larga',
      text: 'Por favor ingrese una palabra menor a 15 caracteres.',
    });
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateLeng({ keyword })) return;
    if (validateCharacters({ keyword })) return;

    router.push(`/Game/O${crypto}`);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const ciphertext = CryptoJS.AES.encrypt(value, 'secret');

    setKeyword(value);
    setCrypto(encodeURIComponent(ciphertext.toString()));
  };

  return (
    <Layout titleHeader='Dos jugadores' href='/TwoPlayers'>
      <h2 className={styles.title}>
        Escriba una palabra. No incluya espacios, ni número ni caracteres especiales, por favor.
      </h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={handleChange}
          type='text'
          name='inputWord'
          id='inputWord'
          placeholder='Ej.: Autopista'
          value={keyword}
        />
        <div className={styles.anchorContainer}>
          <input className={styles.link} type='submit' value='Enviar' />
          <ArrowNarrowRight />
        </div>
      </form>
    </Layout>
  );
}
