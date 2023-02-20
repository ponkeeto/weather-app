import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import Header from './components/Header';
import Login from './components/Login';
import Weather from './components/Weather';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="App">
      <Header />
      {!isAuthenticated && !isLoading && <Login />}
      {isAuthenticated && !isLoading && <Weather />}
    </div>
  );
}

export default App;
