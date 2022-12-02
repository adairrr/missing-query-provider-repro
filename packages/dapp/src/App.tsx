import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { CosmWasmClient } from '@cosmjs/cosmwasm-stargate'
import { useExecuteMutation } from 'cw-query-hooks'
import { useRpcClients } from 'cw-query-hooks/src'

function App() {
  const [count, setCount] = useState(0)



  // const {execMutation} = useExecuteMutation()

  const { readOnlyClient } = useRpcClients()

  const doThing = () => {
    console.log(readOnlyClient?.getBlock(52222))
  }



  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={doThing}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
