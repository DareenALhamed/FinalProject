import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SmallLoading from "../../Components/SmallLoading/SmallLoading";
import ProductCard from "../../Components/ProductCard/ProductCard";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [cartItems, setCartItems] = usecontext(CartContext);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/products`);
      if (data.message == "success") setProducts(data.products);
    } catch (error) {
      toast.error("error.response.data.message" || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <SmallLoading color="blue" size={100} />
      </div>
    );
  }

  return (
    <>
       <div className="products" >
        {products.map((product) => (
          <div>
            
                      <ProductCard product={product} />
                      

          </div>
          
        ))}
        
      </div> 

      {/* <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px] mx-auto flex justify-center items-center">
            {products.map((product) => (
              <ProductCard product={product} />
                
              
              
              
             
            
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
}
