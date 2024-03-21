import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import { useAppContext } from "./contexts/AppContexts";
import AddHotels from "./pages/AddHotels";

function App() {
  const {isLoggedin} = useAppContext()
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout>
        <p>Home Page</p>
      </Layout>}/>

      <Route path="/search" element={<Layout>
        <p>Search Page</p>
      </Layout>}/>

      <Route path="/register"element={<Layout>
       <Register/>
      </Layout>}/>
      <Route path="/sign-in"element={<Layout>
        <Signin/>
      </Layout>}/>
      {isLoggedin && <Route path="/add-hotels"element={<Layout>
        <AddHotels/>
      </Layout>}/>}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
