import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Register from "./pages/Register";
import Signin from "./pages/Signin";
import { useAppContext } from "./contexts/AppContexts";
import AddHotels from "./pages/AddHotels";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Home from "./pages/Home";

function App() {
  const { isLoggedin } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home/>
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />
        {isLoggedin && (
          <Route
            path="/add-hotels"
            element={
              <Layout>
                <AddHotels />
              </Layout>
            }
          />
        )}

        {isLoggedin && (
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
        )}

        {isLoggedin && (
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        )}

        {isLoggedin && (
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
        )}

        {isLoggedin && (
          <Route
            path="/mybookings"
            element={
              <Layout>
              <MyBookings/>
              </Layout>
            }
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
