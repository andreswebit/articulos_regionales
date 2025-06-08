import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header } from "./components/header";
import { Footer } from "./components/footer";

import { HomePage } from "./pages/home-page";
import { ProductsPage } from "./pages/products-page";
import { StoriesPage } from "./pages/stories-page";
import { VideosPage } from "./pages/videos-page";
import { CartPage } from "./pages/cart-page";
import { LoginPage } from "./pages/login-page";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RegisterPage } from "./pages/register-page";

export default function App() {
  const [  ] = React.useState("products");

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background">
            <Header />
            
            <main className="flex-grow container mx-auto px-4 py-8">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/products" component={ProductsPage} />
                <Route path="/stories" component={StoriesPage} />
                <Route path="/videos" component={VideosPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
              </Switch>
            </main>
            
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}