import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthWrapper } from './auth/AuthWrapper';
import Footer from './components/structure/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthWrapper />
      </BrowserRouter>
      
      <Footer />
    </div>
  );
}

export default App;
