import axios from 'axios';
import React, { useState } from 'react';

function AxiosTest() {
    const [order_id, setOrderId] = useState('');
    const [product_id, setProductId] = useState('');
    const [total_price, setTotalPrice] = useState('');

    const handleForm = () => {
        axios.post('http://localhost:7777/create-detail', {
            order_id: order_id,
            product_id: product_id,
            total_price: total_price,
        })
        .then(response => {
            console.log('Upload success:', response);
            // Redirect to a new page upon successful upload
            window.location.href = '/'; // Replace '/success' with the URL you want to redirect to
        })
        .catch(error => {
            console.error('Upload failed:', error);
            // Handle error
        });
    }

    return (
        <>
            <label>
                order_id :    
                <input type="text" name="order_id" placeholder="order_id" onChange={(e) => setOrderId(e.target.value)} />
            </label>
            <label>
                product_id :    
                <input type="text" name="product_id" placeholder="product_id" onChange={(e) => setProductId(e.target.value)} />
            </label>
            <label>
                total_price :
                <input type="text" name="total_price" placeholder="total_price" onChange={(e) => setTotalPrice(e.target.value)} />
            </label>
            <button type="submit" onClick={handleForm}>submit</button>
        </>
    );
}

export default AxiosTest;
