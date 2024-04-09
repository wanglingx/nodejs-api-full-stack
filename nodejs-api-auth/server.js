const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const router = require('./router/router');
const bodyParser = require('body-parser');

const port = process.env.PORT || 7777;

server.use(cors());
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(helmet());
server.use(express.json());
server.use(router);


const connection = require('./database/connection')

server.listen(port, function() {
    console.log('Starting node.js on port' + port);
})

server.get('/', (req, res) => {
    connection.query('SELECT USER_ID FROM CUSTOMER AS solution', function(error, result, fields ){
        if(error) throw error;
        console.log('Solution is:', result)
        res.json({sucess: "Hello", response : result})
    })
    //res.send("hello world")
})

server.get('/sendParameter', (req, res) => {

    let {order_id} = req.query;
    console.log(order_id)
    connection.query('SELECT * FROM detail WHERE order_id LIKE ?', [`%${order_id}%`], function(error, result, fields ){
        if(error) throw error;
        console.log('Solution is:', result)
        res.json({success: "Hello", response : result, massage:"EZ"})
    })
    //res.send("hello world")
})

server.post('/create-detail', (req, res) => {
    let order_id = req.body.order_id;
    let product_id = req.body.product_id;
    let total_price = req.body.total_price;
    connection.query('INSERT INTO detail (order_id,product_id,amount,total_price,last_update) VALUES (?,?,2,?,CURRENT_TIMESTAMP) ',[order_id,product_id,total_price], function (error, result, fields) {
        if (error) throw error;
        console.log("success")
        return res.json({ message : "query success"})
    }) 
})

server.get('/getRevenue', (req, res) => {
    const { startDate, endDate } = req.query;
    const query = `SELECT order_id, amount, total_price, order_date 
                   FROM orders 
                   WHERE order_date BETWEEN ? AND ? 
                   AND order_status = 'Delivered'`;
    connection.query(query, [startDate, endDate], (error, results, fields) => {
      if (error) {
        console.error('Error executing query: ' + error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json(results);
    });
  });

  server.post('/getMostAndLeastSoldProducts', (req, res) => {
    const { month, year } = req.body;
  
    // Retrieve the most sold product
    const queryMostSold = `
      SELECT product_id, SUM(amount) AS total_sold, SUM(total_price) AS total_price
      FROM detail
      WHERE MONTH(last_update) = ? AND YEAR(last_update) = ?
      GROUP BY product_id
      ORDER BY total_sold DESC
      LIMIT 1`;
  
    // Retrieve the least sold product
    const queryLeastSold = `
      SELECT product_id, SUM(amount) AS total_sold, SUM(total_price) AS total_price
      FROM detail
      WHERE MONTH(last_update) = ? AND YEAR(last_update) = ?
      GROUP BY product_id
      ORDER BY total_sold ASC
      LIMIT 1`;
  
    // Perform both queries in parallel using Promise.all
    Promise.all([
      new Promise((resolve, reject) => {
        connection.query(queryMostSold, [month, year], (err, resultsMostSold) => {
          if (err) {
            reject(err);
          } else {
            resolve(resultsMostSold[0]); // Resolve with the first (and only) row
          }
        });
      }),
      new Promise((resolve, reject) => {
        connection.query(queryLeastSold, [month, year], (err, resultsLeastSold) => {
          if (err) {
            reject(err);
          } else {
            resolve(resultsLeastSold[0]); // Resolve with the first (and only) row
          }
        });
      })
    ])
      .then(([mostSoldProduct, leastSoldProduct]) => {
        res.json({ mostSoldProduct, leastSoldProduct });
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });