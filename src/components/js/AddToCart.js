import React, { Component } from 'react';

class Cart extends Component {
    state = {
        products: []
    }

    addToCart = (product) => {
        this.setState(prevState => ({
            products: [...prevState.products, product]
        }));
    }

    render() {
        return (
            <div>
                <h2>Cart</h2>
                <ul>
                    {this.state.products.map((product, index) => (
                        <li key={index}>{product.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Cart;