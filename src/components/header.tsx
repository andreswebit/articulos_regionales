import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Input, Link, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartItems, totalItems } = useCart();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <Navbar maxWidth="xl" isBordered>
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center">
          <Icon icon="lucide:mountain-snow" width={24} className="text-primary" />
          <p className="font-bold text-inherit ml-2">Norte Argentino</p>
        </RouterLink>
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[18rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-default-100",
            }}
            placeholder="Buscar productos..."
            size="sm"
            startContent={<Icon icon="lucide:search" width={18} />}
            type="search"
          />
        </NavbarItem>
      </NavbarContent>
      
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/products"
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${isActive('/products') ? 'text-primary font-medium' : 'text-foreground'}`}
          >
            <Icon icon="lucide:shopping-bag" width={18} />
            <span className="hidden md:inline">Productos</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/stories"
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${isActive('/stories') ? 'text-primary font-medium' : 'text-foreground'}`}
          >
            <Icon icon="lucide:book-open" width={18} />
            <span className="hidden md:inline">Historias</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/videos"
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${isActive('/videos') ? 'text-primary font-medium' : 'text-foreground'}`}
          >
            <Icon icon="lucide:video" width={18} />
            <span className="hidden md:inline">Videos</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/cart"
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${isActive('/cart') ? 'text-primary font-medium' : 'text-foreground'}`}
          >
            <div className="relative">
              <Icon icon="lucide:shopping-cart" width={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden md:inline">Carrito</span>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link 
            as={RouterLink} 
            to="/login"
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${isActive('/login') ? 'text-primary font-medium' : 'text-foreground'}`}
          >
            <Icon icon="lucide:user" width={18} />
            <span className="hidden md:inline">Iniciar Sesión</span>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};