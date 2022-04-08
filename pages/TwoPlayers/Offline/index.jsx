import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from './styles.module.css';
import Layout from 'components/Layout';
import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';
import { validateCharacters, validateLeng } from 'utils/inputValidations';
import { useI18N } from 'context/i18n';

export default function Offline() {
  const [keyword, setKeyword] = useState('');
  const [crypto, setCrypto] = useState('');
  const router = useRouter();
  const { t } = useI18N();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateLeng({ keyword, title: t('VALIDATE_CHAR_ERROR'), message: t('VALIDATE_LENG_ERROR_MESSAGE') })) return;
    if (validateCharacters({ keyword, title: t('VALIDATE_CHAR_ERROR'), message: t('VALIDATE_CHAR_ERROR_MESSAGE') }))
      return;

    router.push(`/Game/O${crypto}`);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const ciphertext = CryptoJS.AES.encrypt(value, 'secret');

    setKeyword(value);
    setCrypto(encodeURIComponent(ciphertext.toString()));
  };

  return (
    <>
      <Head>
        <title>{t('SEO_TWO_PLAYERS')}</title>
        <meta name='description' content='Hangman game two players offline' />
        <link rel='icon' href='/logo.ico' />
      </Head>
      <Layout titleHeader={t('TWO_PLAYER_MAIN_MENU')} href='/TwoPlayers'>
        <h2 className={styles.title}>{t('INSTRUCTIONS_MULTIPLAYER')}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            onChange={handleChange}
            type='text'
            name='inputWord'
            id='inputWord'
            placeholder={t('EXAMPLE')}
            value={keyword}
            autoComplete='off'
          />
          <button className={styles.button} type='submit'>
            <span className={styles.buttonContent}>{t('START')}</span>
            <ArrowNarrowRight />
          </button>
        </form>
      </Layout>
    </>
  );
}
