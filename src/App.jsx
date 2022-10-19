import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Initial from "./components/Initial";

//CONTEXTO
import GerentState from "./context/Gerente/GerentState";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <GerentState>
          <Initial />
        </GerentState>
      </BrowserRouter>
    </div>
  );
}

export default App;
