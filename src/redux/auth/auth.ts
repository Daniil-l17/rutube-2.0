import { axiosBase } from '@/config/axiosConfig';
import { IauthData } from '@/types/authLogin';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Idata {
  email: string;
  password: string;
}

export const login = createAsyncThunk<IauthData, Idata>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await axiosBase.post('/auth/login', { email, password });
      return result.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const register = createAsyncThunk<IauthData, Idata>(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const responce = await axiosBase.post(email, password);
      return responce.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

interface userS {
  id: number;
  email: string;
}

interface slice {
  user: null | userS;
  loading: boolean;
  acessToken: string;
}

const initialState: slice = {
  user: null,
  loading: false,
  acessToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logoutFromAccount: state => {
      state.acessToken = '',
      state.loading = true,
      state.user = null
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    }),
      builder.addCase(login.rejected, state => {
        state = initialState;
      }),
      builder.addCase(login.fulfilled, (state, { payload }) => {
        (state.user = payload.user), (state.acessToken = payload.acessToken);
        state.loading = false;
      }),
      builder.addCase(register.pending, state => {
        state.loading = true;
      }),
      builder.addCase(register.rejected, state => {
        state = initialState;
      }),
      builder.addCase(register.fulfilled, (state, { payload }) => {
        (state.user = payload.user), (state.acessToken = payload.acessToken);
        state.loading = false;
      });
  },
});

export const useAuth = (state:any) => !!state.auth.user
export const {actions,reducer} = authSlice