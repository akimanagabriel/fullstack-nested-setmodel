import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import config from "../../config";
import { setCategories } from "../../redux/productSlice";
import { useDispatch } from "react-redux";
import configurations from "../../config";
import moment from "moment/moment";
import { toast } from "react-toastify";

function Category({ category }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isVisible, setVisible] = useState(false);
  const [isEditing, setEditing] = useState(false);

  const handler = () => {
    setVisible(!isVisible);
    setEditing(false);
    setTimeout(() => {
      setVisible(false);
    }, 40000);
  };

  const handleSave = async (e) => {
    const data = `<document>
      <name>${name}</name>
      <parent_id>${e.target.id}</parent_id>
    </document>`;

    try {
      await axios.post(config.apiUrl, data, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
      setVisible(false);
      setName("");
      fetchData();
      toast.success("Category created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchData() {
    try {
      const { data } = await axios.get(configurations.apiUrl);
      dispatch(setCategories(data));
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (e) => {
    if (window.confirm("Are you sure to move int trash?")) {
      const url = `http://127.0.0.1:8000/api/category/${e.target.id}`;
      try {
        await axios.delete(url);
        fetchData();
        toast.success("Category removed!");
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <>
      <div className={`px-3 pt-1 mt-0`}>
        <Link to={`/category/${category.id}`} className="capitalize font-bold">
          {category.name}
        </Link>
        <small className="block capitalize">
          {moment(category.created_at).fromNow()}
        </small>

        <div className="flex gap-4 flex-col">
          <div className="flex gap-4 flex-row">
            <button onClick={handler} className="text-indigo-700 capitalize">
              add child
            </button>
            <button
              onClick={() => {
                setEditing(!isEditing);
                setVisible(false);
              }}
              className="text-indigo-700 capitalize"
            >
              edit
            </button>
            <button
              id={category.id}
              onClick={handleDelete}
              className="text-red-700 capitalize"
            >
              trash
            </button>
          </div>

          {isVisible && (
            <div className="mb-0 flex">
              <input
                value={name}
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-1 border"
              />
              <button
                id={category.id}
                onClick={handleSave}
                className="py-1 px-3 bg-indigo-800 hover:bg-indigo-700 text-white"
              >
                save
              </button>
            </div>
          )}

          {isEditing && (
            <EditCategory
              category={category}
              callback={fetchData}
              visibilityController={setEditing}
            />
          )}
        </div>

        {category.children &&
          category.children.map((child) => (
            <div key={child.id} className="ps-3 border-0 border-l-2">
              <Category category={child} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Category;

// edit

const EditCategory = ({ category, callback, visibilityController }) => {
  const [name, setName] = useState(category.name);

  const handleUpdate = async (e) => {
    try {
      const xmlDoc = `<document>
        <name>${name}</name>
    </document>`;

      await axios.put(configurations.apiUrl + "/" + e.target.id, xmlDoc, {
        headers: {
          "Content-Type": "application/xml",
        },
      });
      callback();
      visibilityController(false);
      toast.success("Category updated");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-0 flex">
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-1 border"
        />
        <button
          id={category.id}
          onClick={handleUpdate}
          className="py-1 px-3 bg-indigo-800 hover:bg-indigo-700 text-white"
        >
          update
        </button>
      </div>
    </>
  );
};
