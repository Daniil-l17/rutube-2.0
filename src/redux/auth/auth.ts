import { axiosBase } from '@/config/axiosConfig';
import { IauthData } from '@/types/authLogin';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IAuthState } from './authInterfase';
import { toast } from 'react-toastify';

export interface Idata {
  email: string;
  password: string;
}

export const login = createAsyncThunk<IauthData, Idata>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await axiosBase.post('/auth/login', { email, password });
      toast.success('Успешный вход в аккаунт', { theme: 'colored' });
      return result.data;
    } catch (e) {
      toast.error('Ошибка - Не верная почта или пороль', { theme: 'colored' });
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const register = createAsyncThunk<IauthData, Idata>(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const responce = await axiosBase.post('/auth/register', { email, password });
      toast.success('Успешная регестрация!', { theme: 'colored' });
      return responce.data;
    } catch (e) {
      toast.error('Ошибка - Не верная почта или пороль', { theme: 'colored' });
      return thunkAPI.rejectWithValue(e);
    }
  },
);

const initialState: IAuthState = {
  user: null,
  loading: false,
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logoutFromAccount: state => {
      (state.accessToken = ''), (state.loading = false), (state.user = null);
      toast.error('Вы вышли с аккаунта', { theme: 'colored' });
    },
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    }),
      builder.addCase(login.rejected, state => {
        (state.user = null), (state.loading = false), (state.accessToken = '');
      }),
      builder.addCase(login.fulfilled, (state, { payload }) => {
        (state.user = payload.user), (state.accessToken = payload.acessToken);
        state.loading = false;
      }),
      builder.addCase(register.pending, state => {
        state.loading = true;
      }),
      builder.addCase(register.rejected, state => {
        (state.user = null), (state.loading = false), (state.accessToken = '');
      }),
      builder.addCase(register.fulfilled, (state, { payload }) => {
        (state.user = payload.user), (state.accessToken = payload.acessToken);
        state.loading = false;
      });
  },
});

export const useAuth = (state: any) => !!state.auth.user;
export const { actions, reducer } = authSlice;
