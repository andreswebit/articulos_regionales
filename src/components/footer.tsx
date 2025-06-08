import React from "react";
import { Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-content1 py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Icon icon="lucide:mountain-snow" width={24} className="text-primary" />
              <span className="font-bold ml-2 text-lg">Norte Argentino</span>
            </div>
            <p className="text-default-500">
              Llevamos los productos auténticos del norte argentino directamente a tu hogar.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" width={20} className="text-default-500 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Icon icon="lucide:instagram" width={20} className="text-default-500 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Icon icon="lucide:twitter" width={20} className="text-default-500 hover:text-primary" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Productos</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-default-500 hover:text-primary">Artesanías</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Alimentos</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Bebidas</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Textiles</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Decoración</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Regiones</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-default-500 hover:text-primary">Salta</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Jujuy</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Tucumán</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Catamarca</Link></li>
              <li><Link href="#" className="text-default-500 hover:text-primary">Santiago del Estero</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Icon icon="lucide:mail" width={16} className="text-default-500" />
                <span className="text-default-500">info@norteargentino.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:phone" width={16} className="text-default-500" />
                <span className="text-default-500">+54 387 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" width={16} className="text-default-500" />
                <span className="text-default-500">Salta Capital, Argentina</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Divider className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-default-500 text-small">
            © 2023 Norte Argentino. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-default-500 text-small hover:text-primary">Términos y Condiciones</Link>
            <Link href="#" className="text-default-500 text-small hover:text-primary">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};