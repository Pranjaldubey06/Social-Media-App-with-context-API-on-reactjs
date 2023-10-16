//import logo from './logo.svg';
import './App.css';
import Pages from "./components/pages/Pages"
import { BrowserRouter } from 'react-router-dom';
import AppContext from "./components/AppContext/AppContext"
function App() {
  return (
    <div>
    <BrowserRouter>
    <AppContext>
       <Pages></Pages>
       </AppContext>
    </BrowserRouter>
    </div>
  
  );
}

export default App;
