import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: { selectedVideo: null, searchResults: [] },
  reducers: {
    selectVideo: (state, action) => {
      state.selectedVideo = action.payload;
    },
    clearVideo: (state) => {
      state.selectedVideo = null;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
});

export const { selectVideo, clearVideo, setSearchResults, clearSearchResults } =
  videoSlice.actions;
export default videoSlice.reducer;
