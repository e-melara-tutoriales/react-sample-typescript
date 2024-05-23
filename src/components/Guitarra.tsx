import useImage from "../hooks/useImage";
import type { Guitarra } from "../types";

type GuitarraProps = {
  guitarra: Guitarra,
  addToCart: (guitarra: Guitarra) => void
}

function Guitarra({ guitarra, addToCart } : GuitarraProps) {
  const { name, description, price, image } = guitarra;
  const { error, image:file, loading } = useImage(image)

  const handlerClick = () => {
    addToCart(guitarra);
  }

  if(loading) {
    return <h3>Cargando ....</h3>
  }

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        { file && !error && (<img src={file} className="img-fluid" alt="Imagen guitarra" />) }
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{ name }</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">$ {price.toFixed(2)}</p>
        <button className="btn btn-dark w-100" type="button" onClick={handlerClick}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default Guitarra;
