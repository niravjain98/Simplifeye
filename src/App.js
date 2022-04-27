import "./App.css";
import Form from "./Form.js";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
function App() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
