// import React, { useEffect, useState } from "react";
// import { Card, CardBody, CardFooter, Button, Image, Spinner } from "@heroui/react";
// import { Icon } from "@iconify/react";
// import { Product } from "../types";
// import { productService } from "../services/productService";
// import { useCart } from "../context/CartContext";

// const products = [
//   {
//     id: 1,
//     name: "Poncho Salteño",
//     price: 12500,
//     image: "https://img.heroui.chat/image/clothing?w=400&h=400&u=1",
//     region: "Salta"
//   },
//   {
//     id: 2,
//     name: "Cerámica Diaguita",
//     price: 8900,
//     image: "https://img.heroui.chat/image/furniture?w=400&h=400&u=2",
//     region: "Tucumán"
//   },
//   {
//     id: 3,
//     name: "Alfajores Jujeños",
//     price: 3200,
//     image: "https://img.heroui.chat/image/food?w=400&h=400&u=3",
//     region: "Jujuy"
//   },
//   {
//     id: 4,
//     name: "Mate Artesanal",
//     price: 5700,
//     image: "https://img.heroui.chat/image/furniture?w=400&h=400&u=4",
//     region: "Catamarca"
//   },
//   {
//     id: 5,
//     name: "Vino Torrontés",
//     price: 4500,
//     image: "https://img.heroui.chat/image/food?w=400&h=400&u=5",
//     region: "Salta"
//   },
//   {
//     id: 6,
//     name: "Tejido Andino",
//     price: 9800,
//     image: "https://img.heroui.chat/image/clothing?w=400&h=400&u=6",
//     region: "Jujuy"
//   },
//   {
//     id: 7,
//     name: "Dulce de Cayote",
//     price: 2800,
//     image: "https://img.heroui.chat/image/food?w=400&h=400&u=7",
//     region: "Santiago del Estero"
//   },
//   {
//     id: 8,
//     name: "Instrumentos Andinos",
//     price: 15000,
//     image: "https://img.heroui.chat/image/furniture?w=400&h=400&u=8",
//     region: "Jujuy"
//   }
// ];

// export const ProductGrid: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const loadProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await productService.getAllProducts();
//         if (response.success && response.data) {
//           setProducts(response.data);
//         }
//       } catch (error) {
//         console.error("Error al cargar productos:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   const handleAddToCart = (product: Product) => {
//     addToCart(product, 1);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center py-12">
//         <Spinner size="lg" color="primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
//       {products.map((product) => (
//         <Card shadow="sm" key={product.id} isPressable className="border border-default-200">
//           <CardBody className="p-0 overflow-hidden">
//             <Image
//               removeWrapper
//               alt={product.name}
//               className="w-full h-48 object-cover"
//               src={product.image}
//             />
//           </CardBody>
//           <CardFooter className="flex flex-col items-start text-small gap-2">
//             <div className="flex items-center gap-1">
//               <Icon icon="lucide:map-pin" width={14} className="text-default-500" />
//               <span className="text-default-500">{product.region}</span>
//             </div>
//             <b className="text-foreground text-medium">{product.name}</b>
//             <p className="text-default-500">$ {product.price.toLocaleString()}</p>
//             <Button
//               color="primary"
//               size="sm"
//               className="w-full mt-2"
//               startContent={<Icon icon="lucide:shopping-cart" width={16} />}
//               onPress={() => handleAddToCart(product)}
//             >
//               Agregar
//             </Button>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Image,
  Spinner,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Product } from "../types";
import { productService } from "../services/productService";
import { useCart } from "../context/CartContext";

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  // useEffect(() => {
  //   fetch("http://localhost:3000/api/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    setIsLoading(false);
    setError("");
    return () => {};

    // Simulate fetching products from an API endpoint
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los productos. Inténtalo más tarde.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="shadow-md rounded-lg">
          <CardBody>
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-bold mt-4">{product.name}</h2>
            <p className="text-gray-600">Región: {product.region}</p>
            <p className="text-lg font-semibold text-primary mt-2">
              ${product.price}
            </p>
          </CardBody>
          <CardFooter>
            <Button
              onPress={() => addToCart(product, 1)}
              variant="solid"
              color="primary"
            >
              <Icon icon="lucide:shopping-cart" className="mr-2" />
              Agregar al Carrito
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
