import React from "react";
import { Button } from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ImageCarousel } from "../components/image-carousel";
import { ThemeSwitcher } from "../components/theme-switcher";

export const HomePage: React.FC = () => {
  const carouselImages = [
    {
      src: "assets/img/jujuy/cerro7colores.jpg",
      alt: "Paisaje del Norte Argentino",
      title: "Descubre el Norte Argentino",
      description: "Artesanías auténticas, sabores tradicionales y productos regionales"
    },
    {
      src: "assets/img/jujuy/casaArtesanias.jpg",
      alt: "Artesanías del Norte",
      title: "Artesanías Únicas",
      description: "Cada pieza cuenta una historia de tradición y cultura"
    },
    {
      src: "assets/img/jujuy/comida.jpg",
      alt: "Gastronomía del Norte",
      title: "Sabores Auténticos",
      description: "Descubre los sabores tradicionales del norte argentino"
    }
  ];

  const [currentTheme, setCurrentTheme] = React.useState("default");
  
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
    // Aplicar la clase del tema al elemento body
    document.body.className = `theme-${theme}`;
  };

  // Aplicar el tema por defecto al cargar
  React.useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
  }, []);

  return (  
    <div className="space-y-12">
      <section className="flex justify-between items-center mb-4">
        <h1 className= "text-4xl text-primary-300 dark:text-whi-primary-color: #f5a524  font-bold">Norte Argentino</h1>
        {/* <ThemeSwitcher onThemeChange={handleThemeChange} currentTheme={currentTheme} /> */}
      </section>
      
      <section className="mb-8">
        <ImageCarousel images={carouselImages} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-content1 p-6 rounded-lg flex flex-col items-center text-center space-y-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icon icon="lucide:truck" width={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Envío a Todo el País</h3>
          <p className="text-default-500">Hacemos llegar nuestros productos a cualquier rincón de Argentina.</p>
        </div>

        <div className="bg-content1 p-6 rounded-lg flex flex-col items-center text-center space-y-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icon icon="lucide:shield" width={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Compra Segura</h3>
          <p className="text-default-500">Garantizamos la seguridad en todas tus transacciones.</p>
        </div>

        <div className="bg-content1 p-6 rounded-lg flex flex-col items-center text-center space-y-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icon icon="lucide:award" width={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Productos Auténticos</h3>
          <p className="text-default-500">Artesanías y productos regionales de la mejor calidad.</p>
        </div>

        <div className="bg-content1 p-6 rounded-lg flex flex-col items-center text-center space-y-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Icon icon="lucide:heart" width={24} className="text-primary" />
          </div>
          <h3 className="font-bold text-lg">Apoyo a Artesanos</h3>
          <p className="text-default-500">Cada compra apoya directamente a los artesanos locales.</p>
        </div>
      </section>

      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Descubre Nuestras Secciones</h2>
        <p className="text-default-500 max-w-2xl mx-auto">
          Explora nuestra selección de productos regionales, conoce las historias detrás de cada artesanía y forma parte de nuestra comunidad.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button 
            as={RouterLink} 
            to="/products" 
            color="primary" 
            size="lg"
            startContent={<Icon icon="lucide:shopping-bag" width={20} />}
          >
            Ver Productos
          </Button>
          <Button 
            as={RouterLink} 
            to="/stories" 
            variant="bordered" 
            size="lg"
            startContent={<Icon icon="lucide:book-open" width={20} />}
          >
            Leer Historias
          </Button>
          <Button 
            as={RouterLink} 
            to="/videos" 
            variant="bordered" 
            size="lg"
            startContent={<Icon icon="lucide:video" width={20} />}
          >
            Ver Videos
          </Button>
        </div>
      </section>
      
      <section className="bg-content1 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Personalización de Temas</h2>
        <p className="text-default-500 mb-4">
          Puedes cambiar el aspecto de la página seleccionando diferentes temas desde el selector en la parte superior.
          También puedes personalizar los colores editando las variables CSS en el archivo src/index.css.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/10 rounded-lg">
            <h3 className="font-medium text-primary">Tema Azul</h3>
            <p className="text-xs text-default-500">Variables: --primary-color: #006FEE</p>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg">
            <h3 className="font-medium text-warning">Tema Cálido</h3>
            <p className="text-xs text-default-500">Variables: --primary-color: #f5a524</p>
          </div>
          <div className="p-4 bg-success/10 rounded-lg">
            <h3 className="font-medium text-success">Tema Tierra</h3>
            <p className="text-xs text-default-500">Variables: --primary-color: #17c964</p>
          </div>
        </div>
      </section>
    </div>
  );
};