import React, { useEffect, useState } from "react";
import { Provider } from "react-redux"; // Import Provider
import store from "../../store"; // Import the Redux store from the correct file path
import "./index.css";
import { modules } from "../../Database";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  addquiz,
  deletequiz,
  updatequiz,
  setquiz,
} from "./reducer";
import * as client from "./client";
import { KanbasState } from "../../store";
import { findModulesForCourse } from "./client";

function QuizList() {
  const { courseId } = useParams();
  const dispatch = useDispatch(); // Move useDispatch() outside useEffect

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addquiz(module));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(addquiz(moduleId));
    });
  };
  
  const handleUpdateModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };


  useEffect(() => {

    findModulesForCourse(courseId).then((modules) =>
      dispatch(setModules(modules))
    );



  }, [courseId, dispatch]); // Include dispatch in dependencies array

  const [moduleList, setModuleList] = useState<any[]>(modules); // Remove .modules from modules
  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId || "",
    _id: "",
  });


return (
    <>
      <div className="flex-grow-0 me-2 d-none d-lg-block">
        <button className="btn btn-secondary">
          Collapse All <i className="fa fa-times"></i>
        </button>
        <button className="btn btn-secondary">
          <i className="fa fa-file"></i> View Progress
        </button>
        <button className="btn btn-success">
          Publish All <i className="fa fa-check"></i>
        </button>
        <button className="btn btn-fail">
          <i className="fa fa-globe"></i> Module
        </button>
      </div>
      <ul className="list-group wd-modules">
        <li className="list-group-item">
          <button onClick={handleAddModule}>Add</button>
          <button onClick={handleUpdateModule}>Update</button>

          <input
            value={module.name}
            onChange={(e) => setModule({ ...module, name: e.target.value })}
          />
          <textarea
            value={module.description}
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }
          />
        </li>

        {moduleList
          .filter((module) => module.course === courseId)
          .map((module, index) => (
            <li key={index} className="list-group-item">
              <button onClick={(event) => setModule(module)}>Edit</button>
              <button onClick={() => deleteModule(module._id)}>Delete</button>
              <div>
                <FaEllipsisV className="me-2" />
                {module.name}
                <span className="float-end">
                  <FaCheckCircle className="text-success" />
                  <FaPlusCircle className="ms-2" />
                  <FaEllipsisV className="ms-2" />
                </span>
              </div>
            </li>
          ))}
      </ul>
    </>
  );
}
export default QuizList;