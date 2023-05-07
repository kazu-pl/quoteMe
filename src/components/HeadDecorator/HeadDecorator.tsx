import Head from "next/head";

const hostname = process.env.NEXT_PUBLIC_HOST_NAME || "localhost:3000";

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
  imageAlt,
}: HeadDecoratorProps) => {
  return (
    <Head>
      <title>Novel | {title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {typeof window !== "undefined" && (
        <meta
          property="og:url"
          content={hostname + window.location.pathname + window.location.search}
        />
      )}

      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:image:alt"
        content={imageAlt || "image alt text"}
      />
    </Head>
  );
};

export default HeadDecorator;
