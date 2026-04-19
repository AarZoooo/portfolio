import data from './data/data.json'

function App() {
  return (
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  )
}

export default App
