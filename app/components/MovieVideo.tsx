import { intTo12BytesHex } from "@/lib/utils";
import prisma from "../utils/db";
import MovieButtons from "./MovieButtons";

async function getData() {
  const data = await prisma.movie.findFirst({
    where: {
      id : intTo12BytesHex(0)
    },
    select: {
      title: true,
      description: true,
      videoUrl: true,
      imageString: true,
      release: true,
      duration: true,
      id: true,
      age: true,
      youtubeString: true,
    },
  });
  return data;
}

export default async function MovieVideo() {
  const data = await getData();

  return (
    <div className="h-[55vh] lg:h-[60vh] w-full flex justify-start items-center">
      <video
        poster={data?.imageString}
        autoPlay
        muted
        loop
        src={data?.videoUrl}
        className="w-full absolute top-0 left-0 h-[60vh] object-cover -z-10 brightness-[60%]"
      ></video>

      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <p className="text-white text-lg mt-5 line-clamp-3">{data?.description}</p>
        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            age={data?.age as number}
            duration={data?.duration as any}
            id={data?.id as any}
            description={data?.description as string}
            releaseDate={data?.release as string}
            title={data?.title as string}
            youtubeUrl={data?.youtubeString as string}
            key={data?.id}
          />
        </div>
      </div>
    </div>
  );
}