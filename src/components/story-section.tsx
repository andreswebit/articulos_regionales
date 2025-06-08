import React from "react";
import { Card, CardHeader, CardBody, Image, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const stories = [
  {
    id: 1,
    title: "Los Tejedores de Purmamarca",
    excerpt: "Conoce a las familias que mantienen viva la tradición del tejido andino en las coloridas montañas de Purmamarca.",
    image: "https://img.heroui.chat/image/places?w=800&h=500&u=1",
    author: "María Gutiérrez",
    date: "15 de Mayo, 2023"
  },
  {
    id: 2,
    title: "El Camino del Vino Torrontés",
    excerpt: "Un recorrido por los viñedos de Cafayate donde se produce uno de los vinos blancos más característicos de Argentina.",
    image: "https://img.heroui.chat/image/places?w=800&h=500&u=2",
    author: "Juan Pérez",
    date: "3 de Junio, 2023"
  },
  {
    id: 3,
    title: "Artesanos de la Cerámica Diaguita",
    excerpt: "La ancestral técnica de cerámica que sobrevive en las manos de artesanos tucumanos que honran a sus antepasados.",
    image: "https://img.heroui.chat/image/places?w=800&h=500&u=3",
    author: "Lucía Mendoza",
    date: "22 de Julio, 2023"
  }
];

export const StorySection: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Nuestras Historias</h2>
        <Button variant="light" color="primary" endContent={<Icon icon="lucide:arrow-right" width={16} />}>
          Ver todas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card shadow="sm" key={story.id} className="border border-default-200">
            <CardHeader className="p-0">
              <Image
                removeWrapper
                alt={story.title}
                className="w-full h-48 object-cover"
                src={story.image}
              />
            </CardHeader>
            <CardBody className="space-y-4">
              <h3 className="font-bold text-lg">{story.title}</h3>
              <p className="text-default-500">{story.excerpt}</p>
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:user" width={14} className="text-default-500" />
                  <span className="text-small text-default-500">{story.author}</span>
                </div>
                <span className="text-small text-default-500">{story.date}</span>
              </div>
              <Button 
                color="primary" 
                variant="flat" 
                size="sm"
                endContent={<Icon icon="lucide:arrow-right" width={16} />}
              >
                Leer historia
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};