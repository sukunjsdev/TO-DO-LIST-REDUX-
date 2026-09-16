import { createStore } from "redux";

const initialState = {
  tasks: [],
  showAdd: false,
  isToggled: false,
  editIndex: null,
  search: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_ADD":
      return {
        ...state,
        showAdd: true,
      };
    case "OPEN_EDIT":
      return {
        ...state,
        showAdd: true,
        editIndex: action.payload,
      };
    case "CLOSE_ADD":
      return {
        ...state,
        showAdd: false,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        showAdd: false,
      };
    case "TOGGLE_THEME":
      return {
        ...state,
        isToggled: !state.isToggled,
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((_, index) => index !== action.payload),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload.index
            ? {
                ...task,
                text: action.payload.task,
              }
            : task,
        ),
        showAdd: false,
        editIndex: null,
      };
    case "SEARCH_TASK":
      return {
        ...state,
        search: action.payload,
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload
            ? {
                ...task,
                completed: !task.completed,
              }
            : task,
        ),
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
