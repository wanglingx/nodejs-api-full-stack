import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import axios from "axios";
import './summary.css';

const BestLessSoldReport = () => {
    // State variables
    const [month, setMonth] = useState('01');
    const [year, setYear] = useState('2022');
    const [mostSoldProduct, setMostSoldProduct] = useState(null);
    const [leastSoldProduct, setLeastSoldProduct] = useState(null);

    // Default date range: past month

    // Function to fetch data from the server using Axios
    const fetchData = async () => {
        const apiEndpoint = `http://localhost:7777/getMostAndLeastSoldProducts`;
        try {
            const response = await axios.post(apiEndpoint,{
                month:month,
                year:year
            });
            console.log(response.data.mostSoldProduct);
            setMostSoldProduct(response.data.mostSoldProduct);
            setLeastSoldProduct(response.data.leastSoldProduct);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    // Function to export data to Excel
    const exportToExcel = () => {
        // Create a CSV string with the data
        const csvContent = [
            `The best sold Product and least sold Product in ${month}/${year}`,
            'Category,Product ID,Total Sold,Total Price',
            `Most Sold Product,${mostSoldProduct.product_id},${mostSoldProduct.total_sold},${mostSoldProduct.total_price}`,
            `Least Sold Product,${leastSoldProduct.product_id},${leastSoldProduct.total_sold},${leastSoldProduct.total_price}`
        ].join('\n');
    
        // Convert the CSV string to a Blob
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    
        // Prompt the user to download the CSV file
        saveAs(csvBlob, 'sales_data.csv');
    };

    return (
        <div className="container">
            <h2>Best and Less Sold Report</h2>
            <form className="date-form" onSubmit={handleSubmit}>
                {/* Select month dropdown */}
                <label htmlFor="month">Select Month:</label>
                <select id="month" name="month" value={month} onChange={(e) => setMonth(e.target.value)}>
                    {/* Options for months */}
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>

                {/* Select year dropdown */}
                <label htmlFor="year">Select Year:</label>
                <select id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)}>
                    {/* Options for years */}
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Product ID</th>
                        <th>Total Sold</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {mostSoldProduct && (
                        <tr>
                            <p>Most Sold Product</p><td>{mostSoldProduct.product_id}</td>
                            <td>{mostSoldProduct.total_sold}</td>
                            <td>{mostSoldProduct.total_price}</td>
                        </tr>
                    )}
                    {leastSoldProduct && (
                        <tr>
                            <p>Least Sold Product</p><td>{leastSoldProduct.product_id}</td>
                            <td>{leastSoldProduct.total_sold}</td>
                            <td>{leastSoldProduct.total_price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Export button */}
            <div className="export-form">
                <button className="export-btn" onClick={exportToExcel}>Export to Excel</button>
            </div>
        </div>
    );
};

export default BestLessSoldReport;