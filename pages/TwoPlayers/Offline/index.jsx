import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';

import styles from './styles.module.css';
import Layout from 'components/Layout';
import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';
import { validateCharacters, validateLeng } from 'utils/inputValidations';

export default function Offline() {
  const [keyword, setKeyword] = useState('');
  const [crypto, setCrypto] = useState('');
  const router = useRouter();

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
          autoComplete='off'
        />
        <button className={styles.button} type='submit'>
          <span className={styles.buttonContent}>Empezar</span>
          <ArrowNarrowRight />
        </button>
      </form>
    </Layout>
  );
}
