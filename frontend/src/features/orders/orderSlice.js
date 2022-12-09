import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import orderService from './orderService'

const initialState = {
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//creat new order
export const createOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
    try {
        return await orderService.createOrder(orderData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders.push(action.payload)
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = (action.payload)
            })
    }
})

export const { reset } = orderSlice.actions
export default orderSlice.reducer