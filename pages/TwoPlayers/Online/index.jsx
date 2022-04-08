import React, { useState } from 'react';
import Head from 'next/head';

import styles from './styles.module.css';
import { validateCharacters, validateLeng } from 'utils/inputValidations';
import Layout from 'components/Layout';
import ArrowNarrowRight from 'components/icons/ArrowNarrowRight';
import CopyIcon from 'components/icons/CopyIcon';
import Loader from 'components/Loader';
import { useI18N } from 'context/i18n';

export default function Online({ API, CREATE_ROOM }) {
  const [keyword, setKeyword] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [generateLink, setGenerateLink] = useState('empy');
  const [showLink, setShowLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useI18N();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateLeng({ keyword })) return;
    if (validateCharacters({ keyword })) return;
    setLoading(true);

    try {
      const response = await fetch(`${API}${CREATE_ROOM}${keyword}`);
      const { id } = await response.json();

      setGenerateLink(`https://hangame-app.vercel.app/Game/N${id}`);
      setShowLink(true);
    } catch (error) {
      console.log('Hubo el siguiente error creando la sala:');
      console.error(error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setKeyword(value);
  };

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const handleCopyClick = () => {
    copyTextToClipboard(generateLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>{t('SEO_TWO_PLAYERS')}</title>
        <meta name='description' content='Hangman game two players online' />
        <link rel='icon' href='/logo.ico' />
      </Head>
      {loading && <Loader />}
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
            <span className={styles.buttonContent}>{t('GENATE_LINK')}</span>
            <ArrowNarrowRight />
          </button>
        </form>

        {showLink && (
          <section className={styles.linkContainer}>
            <h3 className={`${styles.title} ${styles.titleLink}`}>{t('SHARE_LINK')}:</h3>
            <h4 className={styles.linkToShare}>{generateLink}</h4>
            <button className={`${styles.button} ${styles.buttonLink}`} onClick={handleCopyClick}>
              <span className={styles.copyLabel}>{isCopied ? t('COPIED') : t('COPY')}</span>
              <CopyIcon />
            </button>
          </section>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const API = process.env.API;
  const CREATE_ROOM = process.env.CREATE_ROOM;
  return {
    props: { API, CREATE_ROOM },
  };
}
