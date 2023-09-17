import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postsAPI } from "../../api/postsAPI"

const initialState = {
    posts: {
        list: null,
        loading: false
    },
    postForView: {
        post: null,
        loading: false,
    },
    freshPosts: {
        posts: null,
        loading: false,
    },
}

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        return await postsAPI.fetchPosts()
    }
)

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit) => {
        return await postsAPI.fetchFreshPosts(limit)
    }
)

export const getPostById = createAsyncThunk(
    'posts/fetchById',
    async (postId) => {
        return await postsAPI.fetchById(postId)
    }
)


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        editPosts: (state, action) => {
            // edit post
        },
        addPosts: (state, action) => {
            // add new post by data
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPostById.pending, (state, action) => {
            state.postForView = {
                post: null,
                loading: true
            }
        })
        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.postForView = {
                post: action.payload,
                loading: false
            }
        })
        builder.addCase(getPosts.pending, (state, action) => {
            state.posts = {
                list: null,
                loading: true
            }
        })
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = {
                list: action.payload,
                loading: false
            }
        })
        builder.addCase(getFreshPosts.pending, (state, action) => {
            state.freshPosts = {
                posts: null,
                loading: true
            }
        })
        builder.addCase(getFreshPosts.fulfilled, (state, action) => {
            state.freshPosts = {
                posts: action.payload,
                loading: false
            }
        })
    },
})

export const {editPosts, addPosts } = postsSlice.actions

export default postsSlice.reducer