import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import useCalculation from './useCalculation'
import Form from './Form'
import History from './History'
import AxiosTest from './axios'
import ShowData from './query'

function App() {

  const [history,setHistory] = useState([]);

  const handleFormClicked = (newFormData) => {
    const newHistory = [...history];
    newHistory.push(newFormData);
    setHistory(newHistory);
    console.log(newHistory);
  }
  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Annisa Singsathit</h1>
      <div className="card">
        <Form onFormClicked={handleFormClicked} />
      </div>
      <div>
       <History handleHistory={history} />
      </div>
      <div>
        <AxiosTest></AxiosTest>
      </div>
      <div>
        <ShowData></ShowData>
      </div>
    </>
  )
}

export default App
