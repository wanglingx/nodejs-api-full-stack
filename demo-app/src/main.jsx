import React from 'react'
import ReactDOM from 'react-dom/client'
import './revenue.css'
import RevenueReport from './revenue.jsx'
import BestLessSoldReport from './summary_order.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RevenueReport />
    <hr></hr>
    <BestLessSoldReport />
  </React.StrictMode>,

)