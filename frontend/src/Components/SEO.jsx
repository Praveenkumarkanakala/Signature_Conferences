import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  name = "Signature Global Conferences", 
  type = "website" 
}) {
  const combinedTitle = `${title} | Signature Global Conferences | Signature Talks`;
  const defaultDescription = "Signature Global Conferences (Signature Talks) brings together world-class leaders and visionaries across Europe, USA, Asia, and North America.";
  const finalDescription = description || defaultDescription;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{combinedTitle}</title>
      <meta name='description' content={finalDescription} />
      
      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={combinedTitle} />
      <meta property="og:description" content={finalDescription} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={combinedTitle} />
      <meta name="twitter:description" content={finalDescription} />
    </Helmet>
  );
}
