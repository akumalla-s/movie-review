import { useSelector } from 'react-redux';
import './App.css';

function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <div>
      Hello
    </div>
  );
}

export default App;
