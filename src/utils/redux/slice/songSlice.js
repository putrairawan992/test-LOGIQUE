const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    song: [],
    loading: false,
    search: ''
}
export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        actionSearchSong: (state, { payload }) => {
            return ({ ...state, loading: false, search: payload.search, song: payload.data, })
        },
        actionAddSong: (state, { payload }) => {
            return ({ ...state, song: [state.song, ...payload] })
        },
        actionFetchSong: (state) => {
            return ({ ...state, loading: true })
        },
    }
})

export const { actionSearchSong, actionAddSong, actionFetchSong } = songSlice.actions
export default songSlice.reducer