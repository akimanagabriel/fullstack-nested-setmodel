import React, { useState } from "react";
import configurations from "../../config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setCategories } from "../../redux/productSlice";
import { useDispatch } from "react-redux";

function Create() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInsert = async () => {
    const url = configurations.apiUrl;
    const payload = `
      <document>
        <name>${name}</name>
      </document>
    `;
    try {
      axios.post(url, payload, {
        headers: { "Content-Type": "application/xml" },
      });

      const { data } = await axios.get(configurations.apiUrl);
      dispatch(setCategories(data));

      toast.success("Category created successfully!");
      window.location.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex">
      <input
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
        className="px-3 py-1 border"
      />
      <button
        onClick={handleInsert}
        className="py-1 px-3 bg-indigo-800 hover:bg-indigo-700 text-white"
      >
        save parent category
      </button>
    </div>
  );
}

export default Create;
