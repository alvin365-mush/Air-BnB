import Image from "next/image";
import Header from "./Header";

function Banner() {
  return (
    <div className="relative -top-24 z-0 h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="https://links.papareact.com/0fm"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-xs sm:text-lg">Not sure where to go?</p>
        <button className="text-xl text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-purple-600 bg-white px-10 py-4 shadow-md rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-150">
          I'm flexible
        </button>
      </div>
    </div>
  );
}

export default Banner;
