import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import SmallLoading from "../../Components/SmallLoading/SmallLoading";
import './Categories.css'

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] =useState(null);
  // const controller = new AbortController();

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `/categories?limit=10`
        // ,{signal:controller.signal}// for clean up code, when the user requests sth and leave it immediately
      );

      if (data.message == "success") {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getCategories();

    // return ()=> {   //unmountainted, when the user leave the component
    //   controller.abort();  
    // };
  }, []);


  if (loader) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <SmallLoading color="blue" size={100} />
      </div>
    );
  }
  return (<>
  
  <div className="categories "  key={categories._id}>
        {categories.map((category) => (
          <div className="catContent ">
            <div className=" " key={category.id}>
              <img src={category.image.secure_url} alt={category.name} />
              <div className="card-body ">
                <Link 
                  to={`/categories/${category._id}`}
                  className="Link "
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

  
  
  
  </>)
  
}
