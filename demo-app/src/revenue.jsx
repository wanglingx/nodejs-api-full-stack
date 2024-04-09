import React, { useState, useEffect } from 'react';
import './revenue.css';
import { saveAs } from 'file-saver';
import axios from "axios";

const RevenueReport = () => {
    // State variables
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [orders, setOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    // Default date range: past month
    useEffect(() => {
        const currentDate = new Date();
        const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        setStartDate(oneMonthAgo.toISOString().split('T')[0]);
        setEndDate(currentDate.toISOString().split('T')[0]);
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndpoint = `http://localhost:7777/getRevenue?startDate=${startDate}&endDate=${endDate}`;
        try {
            const response = await axios.get(apiEndpoint);
            console.log(response);
            setOrders(response.data);
            const total = response.data.reduce((acc, order) => acc + order.total_price, 0);
            setTotalRevenue(total);
        } catch (error) {
            console.error('Error fetching revenue report:', error);
        }
    };

    const exportToExcel = async () => {
        const apiEndpoint = `http://localhost:7777/getRevenue?startDate=${startDate}&endDate=${endDate}`;
        try {
            // Make API call to fetch the revenue report data
            const response = await axios.get(apiEndpoint);
            const data = response.data;
    
            // Create a CSV string from the fetched data
            let csvContent = `Revenue between ${startDate} to ${endDate}\nOrder ID,Order Date,Amount,Total Price\n`;
    
            data.forEach((order) => {
                const row = `${order.order_id},${order.order_date},${order.amount},${order.total_price}\n`;
                csvContent += row;
                
            });

            csvContent += `Total Revenue,,,${totalRevenue},\n`;

    
            // Create a blob from the CSV string
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    
            // Use file-saver to save the blob as an Excel file
            saveAs(blob, 'revenue_data.csv');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        }
    };
    

    return (
        <div className="container">
            <div className="revenue-report">
                <h2>Revenue Report</h2>
                {/* Date selection form */}
                <form className="date-form" onSubmit={handleSubmit}>
                    <label htmlFor="start_date">Start Date:</label>
                    <input type="date" id="start_date" name="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    <label htmlFor="end_date">End Date:</label>
                    <input type="date" id="end_date" name="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    <input type="submit" value="Submit" />
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Amount</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.length > 0 ? (
                            orders.map((orders) => (
                                <tr key={orders.order_id}>
                                    <td>{orders.order_id}</td>
                                    <td>{orders.order_date}</td>
                                    <td>{orders.amount}</td>
                                    <td>{orders.total_price}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No orders found</td>
                            </tr>
                        )}
                    </tbody>
                    {/* Display total revenue in the last row */}
                    <tfoot>
                        <tr className="total-row">
                            <td colSpan="3">Total Revenue:</td>
                            <td>{totalRevenue}</td>
                        </tr>
                    </tfoot>
                </table>

                {/* Export button */}
                <div className="export-form">
                    <button className="export-btn" onClick={exportToExcel}>Export to Excel</button>
                </div>
            </div>
        </div>
    );
};

export default RevenueReport;
