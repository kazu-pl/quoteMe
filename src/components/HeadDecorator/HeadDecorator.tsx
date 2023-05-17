import Head from "next/head";

export interface HeadDecoratorProps {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
}

const HeadDecorator = ({
  title,
  description,
  imageUrl,
}: HeadDecoratorProps) => {
  return (
    <Head>
      <title>QuoteMe | {title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
    </Head>
  );
};

export default HeadDecorator;
