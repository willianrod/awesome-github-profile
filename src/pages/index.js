import React, { useCallback } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextInput from '../components/Form/TextInput';
import { Button } from '@chakra-ui/react';
import TextArea from '../components/Form/TextArea';
import RadioInput from '../components/Form/RadioInput';

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

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  github: yup.string().required('Github username is required'),
  wakatime: yup.string(),
  job: yup.string(),
  highlightColor: yup.string()
});

export default function Home() {
  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = useCallback((values) => {
    const newValues = {
      ...values,
      highlightColor: values.highlightColor?.replace('#', '')
    };

    const parameters = Object.keys(newValues)
      .map((key) => `${key}=${newValues[key]}`)
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput control={control} name="name" label="Name" placeholder="Ex: Willian" />
              <TextInput
                control={control}
                name="github"
                label="Github username"
                placeholder="Ex: willianrod"
              />
              <TextInput
                control={control}
                name="wakatime"
                label="Wakatime username"
                placeholder="Ex: willianrod"
              />
              <TextInput
                control={control}
                name="job"
                label="Job"
                placeholder="Ex: Fullstack developer"
              />
              <TextInput
                control={control}
                name="highlightColor"
                label="Hightlight color"
                placeholder="Ex: #0766f5"
                maxLength={7}
              />
              <TextArea control={control} name="aboutMe" label="About me" maxLength={6} />
              <div className={styles.radio}>
                <RadioInput control={control} name="theme" label="Theme" options={THEME_OPTIONS} />
              </div>
              <Button
                className={styles.submitButton}
                isFullWidth
                type="submit"
                size="md"
                variant="solid">
                Generate
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
