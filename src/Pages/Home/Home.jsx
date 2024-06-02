import axios from "axios";
import React, { useEffect, useState, Component } from "react";
import { toast } from "react-toastify";
import SmallLoading from "./../../Components/SmallLoading/SmallLoading";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Categories from "../Categories/Categories";
import "./Home.css";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false); //to know if there is loading or not

  const getCategories = async () => {
    setLoader(true);
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/categories?limit=10`
      );

      // {data} > because axios return object

      console.log(data);
      if (data.message == "success") {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const ShowProduct = () => {
    return (
      <>
        <Categories />
      </>
    );
  };

  if (loader) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "70px" }}
      >
        <SmallLoading color="blue" size={100} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
  };
  return (
    <>
      <div className="container">
        <div
          className="overflow-hidden flex justify-center items-center
        "
        >
          <div className="container mt-20 ">
            <div className="row">
              <div className="slider-container">
                <Slider {...settings}>
                  {categories.map((category) => (
                    <div key={category.id}>
                      <div className="col-12 col-sm-6">
                        <div className="flex flex-col justify-center gap-4 pt-12  text-center">
                          <div className="order-fisrt">
                            <div
                              data-aos="zoom-in"
                              data-aos-once="true"
                              className="relative z-10"
                            >
                              <img
                                src={category.image.secure_url}
                                alt={category.name}
                                className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                              ></img>
                            </div>
                          </div>
                          <button className="shopBtn">
                            <Link
                              to={`/categories/${category._id}`}
                              className="text-white"
                              
                            >
                              Shop Now
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>

              <div
                id="carouselExampleFade"
                className="carousel slide carousel-fade"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src="..." className="d-block w-100" alt="..." />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleFade"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container productner my-5 py-5">
          <div className="row">
            <div className="coulmn mb-5">
              <h1 className="display-6 fw-bolder text-center">
                ALL Categories
              </h1>
            </div>
          </div>
          <div className="productRow justify-content-center row">
            {loading ? <SmallLoading /> : <ShowProduct />}
          </div>
        </div>
      </div>
    </>
  );
}
