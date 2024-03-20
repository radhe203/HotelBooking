import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Register from "./pages/Register";
import Signin from "./pages/Signin";

function App() {
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
    </Routes>
    </BrowserRouter>
  );
}

export default App;
