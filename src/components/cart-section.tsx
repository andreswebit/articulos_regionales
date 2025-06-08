import React from "react";
import { Card, CardBody, CardHeader, CardFooter, Button, Image, Divider, Input, Spinner } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCart } from "../context/CartContext";
import { Link as RouterLink } from "react-router-dom";



export const CartSection: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, shipping, total, isLoading } = useCart();
  const [couponCode, setCouponCode] = React.useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = React.useState(false);

  const applyCoupon = () => {
    if (!couponCode) return;
    
    setIsApplyingCoupon(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplyingCoupon(false);
      // Here you would handle actual coupon validation
      console.log("Applied coupon:", couponCode);
      setCouponCode("");
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <div className="py-4">
      {cartItems.length === 0 ? (
        <Card className="w-full">
          <CardBody className="flex flex-col items-center py-12 gap-4">
            <Icon icon="lucide:shopping-cart" width={48} className="text-default-300" />
            <h3 className="text-xl font-medium">Tu carrito está vacío</h3>
            <p className="text-default-500 text-center max-w-md">
              Parece que aún no has añadido productos a tu carrito. Explora nuestros productos regionales y encuentra algo especial.
            </p>
            <Button 
              color="primary"
              size="lg"
              className="mt-4"
              startContent={<Icon icon="lucide:shopping-bag" width={18} />}
              as={RouterLink}
              to="/products"
            >
              Explorar Productos
            </Button>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="w-full">
                <CardBody>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Image
                      removeWrapper
                      alt={item.name}
                      className="w-full sm:w-24 h-24 object-cover rounded-md"
                      src={item.image}
                    />
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-medium">$ {(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:map-pin" width={14} className="text-default-500" />
                        <span className="text-default-500 text-small">{item.region}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="flat"
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon icon="lucide:minus" width={16} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            isIconOnly 
                            size="sm" 
                            variant="flat"
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon icon="lucide:plus" width={16} />
                          </Button>
                        </div>
                        <Button 
                          size="sm" 
                          variant="light" 
                          color="danger"
                          onPress={() => removeFromCart(item.id)}
                          startContent={<Icon icon="lucide:trash-2" width={16} />}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            
            <Card>
              <CardBody>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    placeholder="Código de descuento"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow"
                    size="sm"
                  />
                  <Button 
                    color="primary" 
                    variant="flat"
                    isLoading={isApplyingCoupon}
                    onPress={applyCoupon}
                  >
                    Aplicar
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Resumen del Pedido</h3>
              </CardHeader>
              <CardBody className="gap-4">
                <div className="flex justify-between py-2">
                  <span className="text-default-500">Subtotal</span>
                  <span>$ {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-default-500">Envío</span>
                  <span>$ {shipping.toLocaleString()}</span>
                </div>
                <Divider />
                <div className="flex justify-between py-2 font-medium">
                  <span>Total</span>
                  <span>$ {total.toLocaleString()}</span>
                </div>
              </CardBody>
              <CardFooter>
                <Button 
                  color="primary" 
                  className="w-full"
                  size="lg"
                  startContent={<Icon icon="lucide:credit-card" width={18} />}
                >
                  Proceder al Pago
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-4 text-small text-default-500 space-y-2">
              <div className="flex items-start gap-2">
                <Icon icon="lucide:truck" width={16} className="mt-0.5" />
                <span>Envío gratis en compras superiores a $25.000</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon icon="lucide:rotate-ccw" width={16} className="mt-0.5" />
                <span>Devoluciones sin cargo dentro de los 30 días</span>
              </div>
              <div className="flex items-start gap-2">
                <Icon icon="lucide:shield" width={16} className="mt-0.5" />
                <span>Pago seguro con encriptación SSL</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};