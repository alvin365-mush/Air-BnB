import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({ exploreData, cardsData }) {
  return (
    <div className="">
      <Head>
        <title>Air BnB Clone App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* header */}
      <Header txtColor="text-white" />
      {/* banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 z-0 -mt-10">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item) => (
              <SmallCard
                key={item.img}
                image={item.img}
                location={item.location}
                distance={item.distance}
              />
            ))}
          </div>
        </section>
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Live Anywhere</h2>

          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3">
            {cardsData.map((item) => (
              <MediumCard key={item.img} image={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <LargeCard
          image="https://links.papareact.com/4cj"
          title="The Great Outdoors"
          description="Wishlists curated by Airbnb"
          buttonText="Get Inspired"
        />
      </main>
      <Footer />
    </div>
  );
}
export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );
  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
