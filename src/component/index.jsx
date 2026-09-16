import vector from "../assets/Vector.svg";
import empty from "../assets/Detective-check-footprint 1.png";
import moon from "../assets/moontheme.svg";
import sun from "../assets/suntheme.svg";
import deletebtn from "../assets/delete.svg";
import edit from "../assets/edit.svg";
import addbtn from "../assets/addbtn.svg";
import "./todo.css";

import { AddBtn } from "./addbtn";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Index = () => {
  const dispatch = useDispatch();
  const isToggled = useSelector((state) => state.isToggled);
  // const tasks = useSelector((state) => state.tasks);
  const { tasks, search } = useSelector((state) => state);

  const showAdd = useSelector((state) => state.showAdd);

  const [filter, setFilter] = useState("all");

  const handleAdd = () => {
    dispatch({
      type: "OPEN_ADD",
    });
  };

  useEffect(() => {
    document.body.classList.toggle("dark", isToggled);
  }, [isToggled]);
  const handleTheme = () => {
    dispatch({
      type: "TOGGLE_THEME",
    });
  };

  const handleDelete = (index) => {
    dispatch({
      type: "DELETE_TASK",
      payload: index,
    });
  };

  const filteredTasks = tasks
    .map((task, index) => ({ task, index }))
    .filter(({ task }) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        (filter === "complete" && task.completed === true) ||
        (filter === "incomplete" && task.completed === false);

      return matchesSearch && matchesFilter;
    });
  return (
    <>
      <div className="full-page">
        <div className="header">
          <h1 className="header-heading">TODO LIST</h1>
          <div className="header-btns">
            <div className="search">
              <input
                id="header-search"
                type="text"
                placeholder="search note..."
                value={search}
                onChange={(e) =>
                  dispatch({
                    type: "SEARCH_TASK",
                    payload: e.target.value,
                  })
                }
              />
              <img className="mirror-header" src={vector} alt="mirror" />
            </div>
            <span className="header-right-btn">
              <select
                className="select-btn-header"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">ALL</option>
                <option value="complete">COMPLETE</option>
                <option value="incomplete">INCOMPLETE</option>
              </select>
              <img
                className="moon-header"
                onClick={handleTheme}
                src={isToggled ? sun : moon}
                alt="moon-img"
              />
            </span>
          </div>
        </div>
        <div className="main">
          <ul className="unorder-list">
            {filteredTasks.length === 0 ? (
              <div className="no-result">
                <img src={empty} alt="No tasks found" />
                <p>No tasks found</p>
              </div>
            ) : (
              filteredTasks.map(({ task, index }) => (
                <li className="list" key={index}>
                  <span className="data">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        dispatch({
                          type: "TOGGLE_TASK",
                          payload: index,
                        })
                      }
                    />
                    <p>{task.text}</p>
                  </span>

                  <span className="btns">
                    <img
                      src={edit}
                      onClick={() =>
                        dispatch({
                          type: "OPEN_EDIT",
                          payload: index,
                        })
                      }
                      alt="edit-pen-btn"
                    />

                    <img
                      src={deletebtn}
                      alt="delete-btn"
                      onClick={() => handleDelete(index)}
                    />
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
        <img onClick={handleAdd} className="addbtn" src={addbtn} alt="addbtn" />
      </div>
      {showAdd && <AddBtn />}
    </>
  );
};
