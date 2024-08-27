import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Product.css';
import Header from "./Header.js";
import Cart from "./Cart.js";

export default function Product() {
    const [product, setProduct] = useState([]);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        axios.get("https://dummyjson.com/products")
            .then(result => {
                setProduct(result.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddToCart = (item) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });

        setShowCart(true); // Show the cart modal when an item is added
    };

    const handlePlaceOrder = () => {
        alert("Order placed successfully!");
        setCart([]);
        setShowCart(false); // Close the modal after placing the order
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <>
            <Header />
            <div className="product-page">
                <div className="shipping-banner">Free Shipping on All Orders!</div>
                <div className="product-container">
                    <div className="heading-container">
                        <h1 className="text-center">Trending Products</h1>
                        <div className="message-boxes">
                            <div className="message-box hurry">Hurry Shop!</div>
                            <div className="message-box limited-stock">Limited Stock Available!</div>
                        </div>
                    </div>
                    <div className="row">
                        {
                            product.map((data, index) => (
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                    <div className="card product-card h-100">
                                        <img
                                            src={data.thumbnail}
                                            className="card-img-top product-image"
                                            alt={data.title}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{data.title}</h5>
                                            <p className="card-text">{data.brand}</p>
                                            <p className="card-text category">{data.category}</p>
                                            <h6 className="price mt-auto">${data.price}</h6>
                                        </div>
                                        <div className="card-footer">
                                            <button id="btn-cart"
                                                className="btn btn-primary"
                                                onClick={() => handleAddToCart(data)}
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Render the Cart modal */}
            {/* <Cart
                show={showCart}
                handleClose={() => setShowCart(false)}
                cart={cart}
                totalPrice={totalPrice}
                handlePlaceOrder={handlePlaceOrder}
            /> */}
        </>
    );
}
