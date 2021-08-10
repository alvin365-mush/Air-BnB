import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

function Search({ searchResults }) {
  const router = useRouter();

  const { location, startDate, endDate, numberOfGuests } = router.query;
  console.log("StartDate", startDate);
  const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
  console.log("formatedStartDate", formatedStartDate);
  const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatedStartDate} - ${formatedEndDate}`;
  return (
    <div className="">
      <Header
        placeholder={`${location} | ${range} | ${numberOfGuests} guests`}
        txtColor="text-gray-600"
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300 + stays - {range} - for {numberOfGuests} guests
          </p>
          <h1 className="text-3xl font-semibold mb-6 mt-2">
            Stay in {location}
          </h1>
          <div className="hidden lg:inline-flex space-x-3 mb-5 whitespace-nowrap">
            <p className="text-gray-600 px-4 py-2 border rounded-full cursor-pointer active:scale-95 active:bg-gray-100 transform transition duration-100 ease-out hover:shadow-lg">
              Cancelation Flexibility
            </p>
            <p className="text-gray-600 px-4 py-2 border rounded-full cursor-pointer active:scale-95 active:bg-gray-100 transform transition duration-100 ease-out hover:shadow-lg">
              Type of place
            </p>
            <p className="text-gray-600 px-4 py-2 border rounded-full cursor-pointer active:scale-95 active:bg-gray-100 transform transition duration-100 ease-out hover:shadow-lg">
              Price
            </p>
            <p className="text-gray-600 px-4 py-2 border rounded-full cursor-pointer active:scale-95 active:bg-gray-100 transform transition duration-100 ease-out hover:shadow-lg">
              Room
            </p>
            <p className="text-gray-600 px-4 py-2 border rounded-full cursor-pointer active:scale-95 active:bg-gray-100 transform transition duration-100 ease-out hover:shadow-lg">
              Bed
            </p>
            <p className="text-gray-600 px-4 py-2 border rounded-full cursor-pointer active:scale-95 active:bg-gray-100 transform transition duration-100 ease-out hover:shadow-lg">
              More filters ..
            </p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((item) => (
              <InfoCard
                key={item.img}
                img={item.img}
                star={item.star}
                title={item.title}
                location={item.location}
                description={item.description}
                price={item.price}
                total={item.total}
              />
            ))}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
