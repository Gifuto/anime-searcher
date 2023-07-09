import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { REQUEST_STATUS } from '../../core/api/types'

import { FeaturesState, Features, FeaturesRequest } from './types'

export const SLICE_NAME = "features"

const initialState: FeaturesState = {
   items: [],
   status: REQUEST_STATUS.INITIAL,
}

export const featuresSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    requestFeatures: (state, action: PayloadAction<FeaturesRequest>) => {
      state.status = REQUEST_STATUS.LOADING
    },
    setFeatures: (state, action: PayloadAction<Features>) => {
      state.status = REQUEST_STATUS.SUCCESS
      state.items.push(action.payload.data)
    },
  },
})

export const featuresActions = featuresSlice.actions