import React, { useContext, useState } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";

const Home = () => {
  // For creating the modal
  const [isModalOpen, setisModalOpen] = useState(false);
  // Creating UseState for Project
  const [projectName, setProjectName] = useState("null");

  function createProject(e) {
    e.preventDefault();
    console.log("Create Project");
    console.log({ projectName });

    // Intializing the Axios for inegrating the APIs
    axios
      .post("api/projects/create-project", {
        name: projectName,
      })
      .then((res) => {
        console.log(res.data);
        setisModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="p-4">
      <div className="projects">
        <button
          onClick={() => setisModalOpen(true)}
          className="project p-4 border border-slate-300 rounded-md"
        >
          New Project
          <i className="ri-link ml-2"></i>
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl mb-4">Create New Project</h2>
              <form onSubmit={createProject}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    onChange={(e) => setProjectName(e.target.value)}
                    value={projectName}
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    onClick={() => setisModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
