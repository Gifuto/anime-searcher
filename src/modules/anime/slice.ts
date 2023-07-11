import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../core/api/types'

import { AnimeState, Response } from './types'

export const SLICE_NAME = "anime"

const initialState: AnimeState = {
   items: [],
   nextItems: [],
   status: REQUEST_STATUS.INITIAL,
   allPages: 0,
   currentPage: 1,
}

export const animeSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    requestAnime: (state, action: PayloadAction) => {
      state.status = REQUEST_STATUS.LOADING
      console.log(action)
    },
    setAnime: (state, action: PayloadAction<Response>) => {
      state.status = REQUEST_STATUS.SUCCESS
      
      state.items = [...action.payload.data]
      state.allPages = action.payload.pagination.last_visible_page
    },
    setNextPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    }
  },
})

export const animeActions = animeSlice.actions