import './App.css';
import Layout from './Components/UI/Layout';
import Login from './Pages/Login/Login';

function App() {
  const token = sessionStorage.getItem('wsstfaarvav')

  if (token) {
    return (<Layout />);
  } else {
    return (<Login />)
  }
}

export default App;
