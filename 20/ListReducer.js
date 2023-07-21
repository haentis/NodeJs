
import { ADD_ITEM, DELETE_ITEM, CLEAR_LIST } from './ActionTypes';

const initialState = {
  items: [],
};

const ListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item !== action.payload),
      };
    case CLEAR_LIST:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

export default ListReducer;
