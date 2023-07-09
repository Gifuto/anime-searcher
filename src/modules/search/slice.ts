import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../core/api/types'

import { SearchState, Response } from './types'

export const SLICE_NAME = "search"

const initialState: SearchState = {
   items: [],
   status: REQUEST_STATUS.INITIAL,
}

export const searchSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    requestSearch: (state, action: PayloadAction<string>) => {
      state.status = REQUEST_STATUS.LOADING
      console.log(action)
    },
    setSearch: (state, action: PayloadAction<Response>) => {
      state.status = REQUEST_STATUS.SUCCESS
      state.items = action.payload.data
    },
    clearSearch: (state) => {
        state.status = REQUEST_STATUS.INITIAL
        state.items = []
    },
  },
})

export const searchActions = searchSlice.actions