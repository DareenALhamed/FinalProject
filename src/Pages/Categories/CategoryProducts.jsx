// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// //import { toast } from "react-toastify";
// import ProductCard from './../../components/ProductCard/ProductCard';

// export default function CatagoryProducts() {
//   const { id } = useParams("id");
//   const [products, setProducts] = useState([]);
//   const getProducts = async () => {
//     const { data } = await axios.get(
//       `https://ecommerce-node4-five.vercel.app/products/category/${id}`
//     );
//     setProducts(data.products);
//     console.log(data);
//   };
//   useEffect(() => {
//     getProducts();
//   }, []);

//   return (
//     <>
//       <div className="products d-flex gap-3 mt-3 flex-wrap">
//         {[...products].map((product) => (
//           <ProductCard product={product} />
//         ))}

//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//import { toast } from "react-toastify";
import ProductCard from "./../../Components/ProductCard/ProductCard";

export default function CatagoryProducts() {
  const { id } = useParams("id"); //to get id
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get(`/products/category/${id}`);
    setProducts(data.products);
    console.log(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="products d-flex gap-3 mt-3 flex-wrap">
        {[...products].map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </>
  );
}
