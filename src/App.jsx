import './App.css'
import Home from './pages/home/home'
import {MobileProvider} from "./dataContext/mobileContext.jsx";

function App() {

    return (
        <MobileProvider>
          <Home></Home>
        </MobileProvider>
    )
}

export default App
