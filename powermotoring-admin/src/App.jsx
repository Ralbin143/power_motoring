import "./App.css";
import AuthPage from "./presentation/pages/authentication/pages/AuthPage";
import Layout from "./presentation/pages/layout/Layout";

function App() {
  const token = sessionStorage.getItem("wsstfaarvav");

  return !token ? <AuthPage /> : <Layout />;
}

export default App;
