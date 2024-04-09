import axios from 'axios';
import React, { useState, useEffect } from 'react';

function ShowData() {
    const [dataQuery, setDataQuery] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:7777/get-detail')
            .then(res => {
                const { message, response } = res.data;
                console.log(message, response);

                // Check if response is an array before updating state
                if (Array.isArray(response)) {
                    setDataQuery(response);
                } else {
                    console.error('Data received is not an array:', response);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
    <div style={{ paddingTop: '60px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block' }}>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ paddingRight: '60px' }}>Order ID</th>
                        <th>Product ID</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {dataQuery.map(item => (
                        <tr key={item.order_id}>
                            <td>{item.order_id}</td>
                            <td>{item.product_id}</td>
                            <td>{item.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

}

export default ShowData;
