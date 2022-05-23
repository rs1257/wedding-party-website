import { GALLERY_NEEDS_UPDATE } from "./types";

// Gallery Needs Update
export const galleryNeedsUpdate = (payload) => {
  return {
    type: GALLERY_NEEDS_UPDATE,
    payload: payload,
  };
};
