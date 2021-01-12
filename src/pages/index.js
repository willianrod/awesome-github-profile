import React, { useCallback } from 'react';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import { Form } from 'react-final-form';

import TextInput from '../components/TextInput';
import TextareaInput from '../components/TextareaInput';
import RadioInput from '../components/RadioInput';
import styles from '../styles/Home.module.css';

const THEME_OPTIONS = [
  {
    label: 'Light',
    value: 'light'
  },
  {
    label: 'Dark',
    value: 'dark'
  }
];

export default function Home() {
  const renderForm = useCallback(({ handleSubmit }) => {
    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput name="name" label="Name" placeholder="Ex: Willian" />
        <TextInput name="github" label="Github username" placeholder="Ex: willianrod" />
        <TextInput name="wakatime" label="Wakatime username" placeholder="Ex: willianrod" />
        <TextInput name="job" label="Job" placeholder="Ex: Fullstack developer" />
        <TextInput
          name="highlightColor"
          label="Hightlight color"
          placeholder="Ex: #0766f5"
          maxLength={7}
        />
        <TextareaInput name="aboutMe" label="About me" />
        <RadioInput name="theme" label="Theme" spacing={4} options={THEME_OPTIONS} />
        <Button className={styles.submitButton} isFullWidth type="submit" size="md" variant="solid">
          Generate
        </Button>
      </form>
    );
  }, []);

  const onSubmit = useCallback((values) => {
    if (!values) return '';

    const newValues = {
      ...values,
      highlightColor: values.highlightColor?.replace('#', '')
    };

    const parameters = Object.keys(newValues)
      .map((key) => `${key}=${values[key]}`)
      .join('&');

    const encodedURL = encodeURI(`${window.location.href}api/profile?${parameters}`);

    const win = window.open(encodedURL, '_blank');
    if (win) win.focus();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Github Awesome Profile Generator</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h4 className={styles.title}>Github Awesome Profile Generator</h4>
          <p className={styles.description}>
            This is a tool to help you generate your next awesome Github profile
          </p>
          <div className={styles.formContainer}>
            <Form
              initialValues={{
                theme: 'light'
              }}
              onSubmit={onSubmit}
              render={renderForm}
            />
          </div>
        </main>
      </div>
    </>
  );
}
