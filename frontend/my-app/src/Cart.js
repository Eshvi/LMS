import React from "react";
import { Modal, Button } from "react-bootstrap";
import './Cart.css';

export default function Cart({ show, handleClose, cart, totalPrice, handlePlaceOrder }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Your Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="list-group mb-3">
                    {cart.map(item => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                            <div>
                                <h6>{item.title}</h6>
                                <p>Quantity: {item.quantity}</p>
                            </div>
                            <span className="text-muted">${item.price * item.quantity}</span>
                        </li>
                    ))}
                </ul>
                <div className="d-flex justify-content-between align-items-center">
                    <h5>Total: ${totalPrice}</h5>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handlePlaceOrder}>
                    Proceed to Buy
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
