import { GALLERY_NEEDS_UPDATE } from "../actions/types";

const initialState = false;

export default function (state = initialState, action) {
  switch (action.type) {
    case GALLERY_NEEDS_UPDATE:
      return action.payload;
    default: 
      return state;
  }
}
