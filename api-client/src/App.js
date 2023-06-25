import React, { useEffect } from "react";
import Routers from "./routes/routers";
import Navbar from "./pages/partials/navbar";
import config from "./config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCategories } from "./redux/productSlice";

//toastify
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.add("bg-gray-100");
    document.title = "API CLIENT";
    fetchData();
  });

  async function fetchData() {
    try {
      const { data } = await axios.get(config.apiUrl);
      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-10">
      <Navbar />
      <Routers />
      {/* initialisation of tastify */}
      <ToastContainer/>
    </div>
  );
}

export default App;
