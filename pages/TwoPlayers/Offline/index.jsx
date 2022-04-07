import React, { useState } from 'react';

import styles from './styles.module.css';
import Layout from 'components/Layout';
import LinkToPage from 'components/LinkToPage';
import LayoutButton from 'components/LayoutButton';

export default function Offline() {
  const [keyword, setKeyword] = useState('second');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setKeyword(value);

    // QUEDARÍA ENCRIPTAR Y DESCRIPTAR LA PALABRA PASADA POR URL
    // AGREGAR VALIDACIONES AL INPUT, QUE NO ACEPTE ESPACIOS, NI NÚMEROS NI DIGITOS RAROS SOLO LETRAS
  };

  return (
    <Layout titleHeader='Dos jugadores' href='/'>
      <h2 className={styles.title}>Escriba una palabra. No incluya espacios.</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          onChange={handleChange}
          type='text'
          name='inputWord'
          id='inputWord'
          placeholder='Ej.: Autopista'
        />
        <LayoutButton>
          <LinkToPage contain='Empezar' href={`/Game/O${keyword}`} center={false} />
        </LayoutButton>
      </form>
    </Layout>
  );
}
