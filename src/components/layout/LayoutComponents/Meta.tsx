import Head from 'next/head';
import React from 'react';
import { MetaProps } from '../../../typing/types';

const Meta = ({
  title = 'MLScienceTrend',
  keywords = 'nlp, data analysis, ai, deep learning, stem, physics',
  description = 'Get the latest news in science',
}: MetaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;
