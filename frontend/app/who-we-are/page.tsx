// app/whoweare/page.tsx
import AboutUs from "./ClientWrapper";

// export async function generateMetadata(): Promise<Metadata> {
//   const seoData = await fetch("https://api.yoursite.com/seo/whoweare").then(
//     (res) => res.json()
//   );

//   return {
//     title: seoData.title,
//     description: seoData.description,
//     alternates: {
//       canonical: seoData.canonical,
//     },
//     robots: {
//       index: true,
//       follow: true,
//     },
//     openGraph: {
//       title: seoData.ogTitle,
//       description: seoData.ogDescription,
//       url: seoData.url,
//       siteName: seoData.siteName,
//       images: seoData.ogImages,
//       locale: "en_US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: seoData.twitterTitle,
//       description: seoData.twitterDescription,
//       images: seoData.twitterImages,
//     },
//   };
// }

const Whoweare = () => {
  return (
    <div>
      <AboutUs />
    </div>
  );
};

export default Whoweare;
