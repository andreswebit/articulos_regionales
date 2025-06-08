import React from "react";
import { StorySection } from "../components/story-section";
import { MusicPlayer } from "../components/music-player";

export const StoriesPage: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Historias y Música</h1>
        <p className="text-default-500 mt-2">
          Conoce las historias detrás de nuestros productos y disfruta de la música tradicional del norte argentino.
        </p>
      </div>
      
      <StorySection />
      <MusicPlayer />
    </div>
  );
};