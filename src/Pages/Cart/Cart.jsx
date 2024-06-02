
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CiHeart } from "react-icons/ci";
import SmallLoading from "../../Components/SmallLoading/SmallLoading";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingClear, setLoadingClear] = useState(false);
  const token = localStorage.getItem("userToken");

  async function getCart() {
    try {
      const { data } = await axios.get(`/cart`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      if (data.message == "success") {
        setCart(data.products);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }
  const removeCart = async (productId) => {
    const token = localStorage.getItem("userToken");
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `/cart/removeItem`, // the second parameter which is body
        {
          productId: productId, //from the backend, if two of them equals, wh can just write one of them
          quantity: 1,
        },
        {
          headers: { authorization: `Tariq__${token}` }, //from the backend, postman
        }
      );
      if (data.message == "success") {
        toast.success("product Removed successfully");
        // navigate('/cart')
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  async function clearCart() {
    setLoadingClear(true);
    try {
      const { data } = await axios.patch(
        `/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        setCart([]);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong!");
    } finally {
      setLoadingClear(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
   
    <>
      {cart.length > 0 ? (
        <div>
          <section className="bg-light my-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="card border shadow-0">
                    <div className="m-4">
                      <h4 className="card-title mb-6  ">Your shopping cart</h4>
                      <button
                                className="btn btn-light border text-danger icon-hover-danger mb-4 col-lg-5"
                                onClick={clearCart}
                              >
                                {" "}
                                Clear Cart
                              </button>
                      {cart.map((product) => (
                        <div className="row gy-3 mb-4">
                          <div className="col-lg-5">
                            <div className="me-lg-5">
                              <div className="d-flex">
                                <img
                                  className="border rounded me-3 height-96px"
                                  style={{ height: 150, width: 150 }}
                                  src={product.details.mainImage.secure_url}
                                  alt={product.name}
                                />
                                <div className>
                                  <a className="nav-link">${product.name}</a>
                                  <p className="text-muted">Yellow, Jeans</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                            <div>
                              <select
                                style={{ width: 100 }}
                                className="form-select me-4"
                              >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </select>
                            </div>
                            <div className>
                              <text className="h6">
                                ${product.details.finalPrice}
                              </text>{" "}
                              <br />
                              <small className="text-muted text-nowrap">
                                {" "}
                                ${product.details.finalPrice} / per item{" "}
                              </small>
                            </div>
                          </div>

                          <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                            <div className="float-md-end">
                              <a className="btn btn-light border px-2 icon-hover-primary">
                                <CiHeart
                                  className="fas fa-heart fa-lg px-1 text-secondary"
                                  style={{ width: 22, height: 22 }}
                                />
                              </a>
                              
                              <button
                                className="btn btn-light border text-danger icon-hover-danger"
                                onClick={() => removeCart(product._id)}
                              >
                                {" "}
                                {loading ? <SmallLoading /> : "Remove"}
                              </button>
                              
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-top pt-4 mx-4 mb-4">
                      <p>
                        <i className="fas fa-truck text-muted fa-lg" /> Free
                        Delivery within 1-2 weeks
                      </p>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip
                      </p>
                    </div>
                  </div>
                </div>
                {/* cart */}
                {/* summary */}
                <div className="col-lg-3">
                  <div className="card mb-3 border shadow-0">
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label className="form-label">Have coupon?</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control border"
                              name
                              placeholder="Coupon code"
                            />
                            <button className="btn btn-light border">
                              Apply
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card shadow-0 border">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Total price:</p>
                        <p className="mb-2">$329.00</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Discount:</p>
                        <p className="mb-2 text-success">-$60.00</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">TAX:</p>
                        <p className="mb-2">$14.00</p>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <p className="mb-2">Total price:</p>
                        <p className="mb-2 fw-bold">$283.00</p>
                      </div>
                      <div className="mt-3">
                        <a
                          href="#"
                          className="btn btn-success w-100 shadow-0 mb-2"
                        >
                          {" "}
                          Make Purchase{" "}
                        </a>
                        <a href="#" className="btn btn-light w-100 border mt-2">
                          {" "}
                          Back to shop{" "}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container my-5">
              <header className="mb-4">
                <h3>Recommended items</h3>
              </header>
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                    <div className="mask px-2" style={{ height: 50 }}>
                      <div className="d-flex justify-content-between">
                        <h6>
                          <span className="badge bg-danger pt-1 mt-3 ms-2">
                            New
                          </span>
                        </h6>
                        <a href="#">
                          <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                        </a>
                      </div>
                    </div>
                    <a href="#" className>
                      <img
                        src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/7.webp"
                        className="card-img-top rounded-2"
                      />
                    </a>
                    <div className="card-body d-flex flex-column pt-3 border-top">
                      <a href="#" className="nav-link">
                        Gaming Headset with Mic
                      </a>
                      <div className="price-wrap mb-2">
                        <strong className>$18.95</strong>
                        <del className>$24.99</del>
                      </div>
                      <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <a href="#" className="btn btn-outline-primary w-100">
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                    <div className="mask px-2" style={{ height: 50 }}>
                      <a href="#">
                        <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                      </a>
                    </div>
                    <a href="#" className>
                      <img
                        src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/5.webp"
                        className="card-img-top rounded-2"
                      />
                    </a>
                    <div className="card-body d-flex flex-column pt-3 border-top">
                      <a href="#" className="nav-link">
                        Apple Watch Series 1 Sport{" "}
                      </a>
                      <div className="price-wrap mb-2">
                        <strong className>$120.00</strong>
                      </div>
                      <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <a href="#" className="btn btn-outline-primary w-100">
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card px-4 border shadow-0">
                    <div className="mask px-2" style={{ height: 50 }}>
                      <a href="#">
                        <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                      </a>
                    </div>
                    <a href="#" className>
                      <img
                        src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/9.webp"
                        className="card-img-top rounded-2"
                      />
                    </a>
                    <div className="card-body d-flex flex-column pt-3 border-top">
                      <a href="#" className="nav-link">
                        Men's Denim Jeans Shorts
                      </a>
                      <div className="price-wrap mb-2">
                        <strong className>$80.50</strong>
                      </div>
                      <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <a href="#" className="btn btn-outline-primary w-100">
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                  <div className="card px-4 border shadow-0">
                    <div className="mask px-2" style={{ height: 50 }}>
                      <a href="#">
                        <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2" />
                      </a>
                    </div>
                    <a href="#" className>
                      <img
                        src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/10.webp"
                        className="card-img-top rounded-2"
                      />
                    </a>
                    <div className="card-body d-flex flex-column pt-3 border-top">
                      <a href="#" className="nav-link">
                        Mens T-shirt Cotton Base Layer Slim fit{" "}
                      </a>
                      <div className="price-wrap mb-2">
                        <strong className>$13.90</strong>
                      </div>
                      <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                        <a href="#" className="btn btn-outline-primary w-100">
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </>
  );
};

export default Cart;
