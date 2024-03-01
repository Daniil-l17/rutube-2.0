import { axiosBase } from '@/config/axiosConfig';
import { IauthData } from '@/types/authLogin';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toastr } from 'react-redux-toastr';
import { IAuthState } from './authInterfase';
import { toast } from 'react-toastify';



export interface Idata {
  email: string
  password: string;
}

export const login = createAsyncThunk<IauthData, Idata>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const result = await axiosBase.post('/auth/login', { email, password });
      toast.success("Успешный вход в аккаунт",{theme: 'colored'})
      return result.data;
    } catch (e) {
      toast.error("Ошибка - Не верная почта или пороль",{theme: 'colored'})
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const register = createAsyncThunk<IauthData, Idata>(
  'auth/register',
  async ({ email, password }, thunkAPI) => {
    try {
      const responce = await axiosBase.post(email, password);
      toastr.success('Поздравляем!!', 'Успешный Регестрация')
      return responce.data;
    } catch (e) {
      toastr.error('Ошибка', 'Не вырная почта или пороль')
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
      state.accessToken = '',
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
        (state.user = payload.user), (state.accessToken = payload.acessToken);
        state.loading = false;
      }),
      builder.addCase(register.pending, state => {
        state.loading = true;
      }),
      builder.addCase(register.rejected, state => {
        state = initialState;
      }),
      builder.addCase(register.fulfilled, (state, { payload }) => {
        (state.user = payload.user), (state.accessToken = payload.acessToken);
        state.loading = false;
      });
  },
});

export const useAuth = (state:any) => !!state.auth.user
export const {actions,reducer} = authSlice