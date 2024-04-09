import React from "react"
function History({handleHistory}) {
  return (
    <>
      <div>
        <h2>History</h2>
        <ul>
        {handleHistory.map((item, index) => (
          <li key={index}>
            {item.a} {item.operator} {item.b} = {item.sum}
          </li>
        ))}
       </ul>
      </div>
    </>
  )
}

export default History
