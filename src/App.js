import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from "./components/header/Header";
import ItemContainer from "./components/main/ItemContainer";
import ItemPageContainer from './itempage/ItemPageContainer';
import Registration from './components/registration/Registration';
import Auth from './components/auth/Auth';
import Account from './components/account/Account';

function App() {
  return (

    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/" element={<ItemContainer />} />
          <Route exact path="/itempage/:id" element={<ItemPageContainer />} />
          <Route exact path="/Registration" element={<Registration />} />
          <Route exact path="/account/:id" element={<Account />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
