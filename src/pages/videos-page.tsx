// import React from "react";
import React, { useState, useRef } from "react";
import { Card, CardBody, CardHeader, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const videos = [
  {
    id: 1,
    title: "Vista Aerea del Hornocal",
    description: "Descubre los impactantes catorce colores",
    src: "assets/videos/hornocal.mp4",
    poster: "/assets/img/jujuy/llama.jpg",
    duration: "1:42",
    views: "2.4k",
    date: "15 de Marzo, 2023",
  },
  {
    id: 2,
    title: "Carnaval Humahuaqueño",
    description:
      "Vive la explosión de color y música del tradicional carnaval en las calles de Humahuaca.",
    src: "assets/videos/carnaval.mp4",
    poster: "assets/videos/carnaval.jpg",
    duration: "1:55",
    views: "2.1k",
    date: "16 de Marzo, 2023",
  },
]

export const VideosPage: React.FC = () => {
  return (
    <div className="space-y-8  ">
      <div>
        <h1 className="text-3xl font-bold">Videos del Norte Argentino</h1>
        <p className="text-default-500 mt-2">
          Explora nuestra colección de videos sobre artesanías, tradiciones y
          cultura del norte argentino.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ">
        {videos.map((video) => {
          const [playing, setPlaying] = useState(false);
          const videoRef = useRef<HTMLVideoElement>(null);

          // const handlePlay = () => {
          //   setPlaying(true);
          //   setTimeout(() => {
          //     videoRef.current?.play();
          //   }, 100); // Espera a que el video se renderice
          // };

          return (
            <Card key={video.id} className="shadow-md rounded-lg ">
              <CardHeader className="p-10 relative flex items-center justify-center"
              style={{
                backgroundImage: "url('/public/assets/backgrounds/hornocalbn.jpg')",
                backgroundColor: "#e5e7eb", // Gris claro
              }}>
                {/* {!playing ? (
                  <div className="relative">
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="w-96 h-48 object-cover rounded-t-lg "
                    />
                    <button
                      onClick={handlePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-xl font-bold"
                    >
                      ▶ Play Me
                    </button>
                  </div>
                ) : ( */}
                  <video
                    ref={videoRef}
                    src={video.src}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-auto h-96 "
                    poster={video.poster}
                  />
                {/* )} */}
              </CardHeader>

              <CardBody>
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {video.date} · {video.views} vistas · {video.duration}
                </p>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
