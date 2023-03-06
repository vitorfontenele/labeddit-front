import './App.css'
import { GlobalContext } from "./contexts/GlobalContext";
import Router from "./routes/Router";

function App() {
  const context = {};

  return (
    <GlobalContext.Provider value={context}>
      <Router />
    </GlobalContext.Provider>
  )
}

export default App
