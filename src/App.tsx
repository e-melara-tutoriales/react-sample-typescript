import useCart from "./hooks/useCart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Guitarra from "./components/Guitarra";

function App() {
  const {
    carrito,
    guitarras,
    total,
    isEmptyCart,
    clearCart,
    removeGuitarra,
    decrementQuantity,
    handlerAddToCart,
    incrementQuantity,
  } = useCart();

  return (
    <>
      <Header
        total={total}
        cart={carrito}
        clearCart={clearCart}
        isEmptyCart={isEmptyCart}
        removeGuitarra={removeGuitarra}
        decrementQuantity={decrementQuantity}
        incrementQuantity={incrementQuantity}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {guitarras.map((guitarra) => (
            <Guitarra
              key={guitarra.id}
              guitarra={guitarra}
              addToCart={handlerAddToCart}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
