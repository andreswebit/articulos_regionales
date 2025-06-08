
import React, { useEffect, useState } from 'react';
import { ProductGrid } from "../components/product-grid";






export const ProductsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nuestros Productos</h1>
        <p className="text-default-500 mt-2">
          Descubre nuestra selección de artesanías y productos regionales del norte argentino.
        </p>
      </div>
      
      <ProductGrid />
    </div>
  );
};



// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
// };

// export function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/products')
//       .then(res => res.json())
//       .then(data => setProducts(data));
//   }, []);

  // return (
    
    // <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      
    //   {products.map(p => (
    //     <div key={p.id} className="border rounded p-4 shadow">
    //       <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
    //       <h2 className="text-xl">{p.name}</h2>
    //       <p>{p.description}</p>
          
    //       <p className="font-bold">${p.price}</p>
          
    //     </div>
        
    //   ))}
      
    // </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {products.map((product) => (
//       <Card key={product.id} className="shadow-md rounded-lg">
//         <CardBody>
//           <Image src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
//           <h2 className="text-xl font-bold mt-4">{product.name}</h2>
//           <p className="text-gray-600">Región: {product.region}</p>
//           <p className="text-lg font-semibold text-primary mt-2">${product.price}</p>
//         </CardBody>
//         <CardFooter>
//           <Button onPress={() => addToCart(product, 1)} variant="solid" color="primary">
//             <Icon icon="lucide:shopping-cart" className="mr-2" />
//             Agregar al Carrito
//           </Button>
//         </CardFooter>
//       </Card>
//     ))}
//   </div>
//   );
// }
