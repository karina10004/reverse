import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name: "search",
    initialState: {
        search: "",
    },
    reducers: { // Corrected property name to "reducers"
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
});

export const { setSearch } = SearchSlice.actions;
export default SearchSlice.reducer;