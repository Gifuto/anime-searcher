import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../core/api/types'

import { AnimeState, Response } from './types'

export const SLICE_NAME = "anime"

const initialState: AnimeState = {
   items: [],
   nextItems: [],
   status: REQUEST_STATUS.INITIAL,
   hasNextPage: true,
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
      state.items = [...state.items, ...action.payload.data]
      state.hasNextPage = action.payload.pagination.has_next_page
      state.currentPage = state.currentPage + 1
    },
    requestNextAnime: (state, action: PayloadAction) => {
      state.status = REQUEST_STATUS.LOADING
      console.log(action)
    },
    setNextAnime: (state, action: PayloadAction<Response>) => {
      state.status = REQUEST_STATUS.SUCCESS
      state.nextItems = action.payload.data
      state.items = [...state.items, ...state.nextItems]
      state.nextItems = []
      state.hasNextPage = action.payload.pagination.has_next_page
      state.currentPage = state.currentPage + 1
    }
  },
})

export const animeActions = animeSlice.actions