import { APIRouts } from '@/libs/const';
import { LoginData, User } from '@/libs/types/types';
import { dropToken, getToken, saveToken } from '@/services/token';
import { api } from '@/storage';
import { AUTH_SLICE_NAME } from '@/storage/slices/sliceNames';
import { userAction } from '@/storage/slices/user';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const checkAuthorisation = createAsyncThunk<User, void>(`${AUTH_SLICE_NAME}/checkAuth`, async (_, thunkApi) => {
  try {
    const result = await api.get<User>(APIRouts.Authorisation);
    if (result.status === 200) {
      thunkApi.dispatch(userAction.setUser(result.data)) ;
    }
    return result.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const login = createAsyncThunk<User, LoginData>(`${AUTH_SLICE_NAME}/login`, async (loginData, thunkApi) => {
  try {
    const {data} = await api.post<User>(APIRouts.Authorisation, loginData, { headers: {
      'Content-Type': 'application/json',}});
    saveToken(data.token);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const logout = createAsyncThunk(`${AUTH_SLICE_NAME}/logout`, async (_, thunkApi) => {
  try {
    const {status} = await api.delete(APIRouts.Logout, { headers: {
      'Content-Type': 'application/json',
      'X-Token': getToken()}});
    dropToken();
    return status;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
