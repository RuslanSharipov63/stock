import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import ItemContainer from "./components/main/ItemContainer";
import ItemPageContainer from './itempage/ItemPageContainer';
import Registration from './components/registration/Registration';
import Auth from './components/auth/Auth';
import Account from './components/account/Account';
import SearchContainer from './components/search/searchContainer';
import ImagesContainer from './components/images/ImagesContainer';
import VideosContainer from './components/videos/VideosContainer';


function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/" element={<ItemContainer />} />
          <Route exact path="/page/:count" element={<ItemContainer />} />
          <Route exact path="/itempage/:id" element={<ItemPageContainer />} />
          <Route exact path="/Registration" element={<Registration />} />
          <Route exact path="/searchpage/:search" element={<SearchContainer />} />
          <Route exact path="/account/:id" element={<Account />} />
          <Route exact path="/images" element={<ImagesContainer />} />
          <Route exact path="/videos" element={<VideosContainer />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
