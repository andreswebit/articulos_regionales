// import React from "react";
// import { Card, CardBody, Button, Slider } from "@heroui/react";
// import { Icon } from "@iconify/react";

// const songs = [
//   {
//     id: 1,
//     title: "Zamba de mi Esperanza",
//     artist: "Los Chalchaleros",
//     duration: "3:45"
//   },
//   {
//     id: 2,
//     title: "La Pomeña",
//     artist: "Mercedes Sosa",
//     duration: "4:12"
//   },
//   {
//     id: 3,
//     title: "El Humahuaqueño",
//     artist: "Jaime Torres",
//     duration: "2:58"
//   },
//   {
//     id: 4,
//     title: "Balderrama",
//     artist: "Mercedes Sosa",
//     duration: "3:36"
//   }
// ];

// export const MusicPlayer: React.FC = () => {
//   const [isPlaying, setIsPlaying] = React.useState(false);
//   const [currentSong, setCurrentSong] = React.useState(songs[0]);
//   const [progress, setProgress] = React.useState(30);

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const playSong = (song: typeof songs[0]) => {
//     setCurrentSong(song);
//     setIsPlaying(true);
//     setProgress(0);
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Música Regional</h2>
//       <p className="text-default-500 text-sm">
//         Disfruta de la música tradicional del norte argentino mientras exploras nuestros productos y historias.
//       </p>

//       <div className="music-player-container">
//         <Card shadow="sm" className="music-player-card border border-default-200">
//           <CardBody className="p-4">
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="font-medium text-base">{currentSong.title}</h3>
//                   <p className="text-default-500 text-xs">{currentSong.artist}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-default-500">
//                     {Math.floor(progress * 60 / 100)}:{Math.floor((progress * 60 / 100) % 1 * 60).toString().padStart(2, '0')} / {currentSong.duration}
//                   </span>
//                 </div>
//               </div>

//               <Slider
//                 aria-label="Music progress"
//                 value={progress}
//                 onChange={setProgress}
//                 color="primary"
//                 className="max-w-full"
//                 size="sm"
//               />

//               <div className="flex justify-center items-center gap-3">
//                 <Button isIconOnly variant="light" size="sm" aria-label="Previous song">
//                   <Icon icon="lucide:skip-back" width={16} />
//                 </Button>
//                 <Button
//                   isIconOnly
//                   color="primary"
//                   size="md"
//                   aria-label={isPlaying ? "Pause" : "Play"}
//                   onPress={togglePlay}
//                 >
//                   <Icon icon={isPlaying ? "lucide:pause" : "lucide:play"} width={18} />
//                 </Button>
//                 <Button isIconOnly variant="light" size="sm" aria-label="Next song">
//                   <Icon icon="lucide:skip-forward" width={16} />
//                 </Button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>

//         <Card shadow="sm" className="border border-default-200">
//           <CardBody className="p-0">
//             <div className="playlist-container">
//               <h3 className="font-medium text-sm p-3 border-b border-default-100">Playlist del Norte</h3>
//               <div>
//                 {songs.map((song) => (
//                   <div
//                     key={song.id}
//                     className={`flex justify-between items-center p-2 border-b border-default-100 cursor-pointer hover:bg-default-100 transition-colors ${
//                       currentSong.id === song.id ? "bg-primary-100 dark:bg-primary-900/20" : ""
//                     }`}
//                     onClick={() => playSong(song)}
//                   >
//                     <div className="flex items-center gap-2">
//                       <Icon
//                         icon={currentSong.id === song.id && isPlaying ? "lucide:volume-2" : "lucide:music"}
//                         width={14}
//                         className={currentSong.id === song.id ? "text-primary" : "text-default-500"}
//                       />
//                       <div>
//                         <p className={`text-xs font-medium ${currentSong.id === song.id ? "text-primary" : ""}`}>{song.title}</p>
//                         <p className="text-xs text-default-500">{song.artist}</p>
//                       </div>
//                     </div>
//                     <span className="text-xs text-default-500">{song.duration}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </CardBody>
//         </Card>
//       </div>
//     </div>
//   );
// };

import { Card, CardBody, Button, Slider } from "@heroui/react";

import React, { useState } from "react";

import YouTube from "react-youtube";

const songs = [
  {
    id: 1,
    title: "Zamba de mi Esperanza",
    artist: "Los Chalchaleros",

    youtubeId: "1DfUW3DquRo", // Reemplaza con el ID real del video de YouTube
  },

  {
    id: 2,
    title: "La Pomeña",
    artist: "Mercedes Sosa",

    youtubeId: "y26sTB15YYQ", // Reemplaza con el ID real del video de YouTube
  },
  {
    id: 3,
    title: "El Humahuaqueño",
    artist: "Jaime Torres",

    youtubeId: "Lj5PzUDFmOg", // Reemplaza con el ID real del video de YouTube
  },
  {
    id: 4,
    title: "Balderrama",
    artist: "Mercedes Sosa",

    youtubeId: "oDEAdddo6_U", // Reemplaza con el ID real del video de YouTube
  },
];

export const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const handlePlay = (song) => {
    setCurrentSong(song);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0, // Reproduce automáticamente
    },
  };

  return (
    <Card className="shadow-md rounded-lg bg-white w-full max-w-[50%] h-fit mx-auto  ">
      <CardBody>
        <h3 className="text-lg font-bold mb-4">Reproductor de Música</h3>
        <div className="items-center flex justify-center  mb-4">
          <YouTube videoId={currentSong.youtubeId} opts={opts} />
        </div>
        <ul className="mt-4">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex justify-between items-center py-2 border-b "
            >
              <div>
                <p className="font-medium">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <button
                onClick={() => handlePlay(song)}
                className={`text-sm px-11 py-1 rounded font-bold ${
                  currentSong.id === song.id ? "text-primary" : "text-gray-500"
                }`}
              >
                {currentSong.id === song.id ? "Playing" : "Play"}
              </button>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};
// export default MusicPlayer;
