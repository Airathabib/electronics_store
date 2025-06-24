import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../interfaces/interface';
import { USER_URL } from '../shared/api';
import { AppDispatch } from './index';
import { getUsers } from '../handlers/hooks/getUsers';
import { ErrorType, AuthState } from '../interfaces/interface';

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: ErrorType }
>('auth/login', async (userForm, { rejectWithValue }) => {
  const users = await getUsers(USER_URL);

  const checkUserlogin: UserType | undefined = users.find(
    (user) =>
      user.login === userForm.login && user.password === userForm.password
  );

  if (checkUserlogin) {
    return checkUserlogin;
  } else {
    return rejectWithValue({
      message: 'Логин или пароль неверный',
    });
  }
});

//
export const userRegistration = createAsyncThunk<
  UserType,
  UserType,
  { dispatch: AppDispatch; rejectValue: ErrorType }
>('auth/userRegistration', async (userForm, { rejectWithValue }) => {
  const users = await getUsers(USER_URL);
  const checkUser: boolean = users.some(
    (user) =>
      user.login === userForm.login ||
      user.email === userForm.email ||
      user.phone === userForm.phone
  );

  if (checkUser) {
    return rejectWithValue({
      message: 'Пользователь с таким логином или email уже существует',
    });
  }

  try {
    const response = await fetch(`${USER_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userForm),
    });
    if (!response.ok) {
      throw new Error(
        'Не удалось зарегистрироваться, попробуйте обновить страницу'
      );
    }
    return (await response.json()) as UserType;
  } catch (error: unknown) {
    return rejectWithValue({
      message:
        error instanceof Error
          ? error.message
          : 'Не удалось зарегистрироваться, попробуйте обновить страницу',
    });
  }
});

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ? action.payload.message : null;
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : null;
      });
  },
});

export default usersSlice.reducer;
