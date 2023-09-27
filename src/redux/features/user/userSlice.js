import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import auth from '../../../utils/firebase.config';
import toast from 'react-hot-toast';

const initialState = {
  name: '',
  email: '',
  isLoading: true,
  isError: false,
  error: ''
};

export const createUser = createAsyncThunk('users/createUser', async ({ email, password, name }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
  
  await updateProfile(auth.currentUser, {
    displayName: name
  })
  console.log(data)
  return {
    name: data.user.displayName,
    email: data.user.email
  }
})
export const loginUser = createAsyncThunk('users/loginUser', async ({ email, password }) => {
  const data = await signInWithEmailAndPassword(auth, email, password)
  console.log(data)
  return {
    name: data.user.displayName,
    email: data.user.email
  }
})


export const googleLogin = createAsyncThunk('user/googleLogin', async () => {
  const googleProvider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Here, you can store the user information in your Redux state or handle it as needed
    console.log('Google login successful:', user);
    toast.success('Google login successful')

    return {
      name: user.displayName,
      email: user.email,
    };
  } catch (error) {
    console.error('Google login error:', error);
  }
});





const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      state.name = payload.name, 
      state.email = payload.email
    },
    toggleLoding: (state, {payload}) => {
      state.isLoading= payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.name = '';
        state.email = '';
        state.error = ''
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.name = payload.name;
        state.email = payload.email;
        state.error = ''
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.name = '';
        state.email = '';
        state.error = action.error.message
      })
      // googleLogin
    .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.name = '';
        state.email = '';
        state.error = ''
      })
      .addCase(googleLogin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.name = payload.name;
        state.email = payload.email;
        state.error = ''
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.name = '';
        state.email = '';
        state.error = action.error.message
      })
      //login state manage
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.name = '';
        state.email = '';
        state.error = ''
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.name = payload.name;
        state.email = payload.email;
        state.error = ''
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.name = '';
        state.email = '';
        state.error = action.error.message
      })
  }
});

export const {setUser, toggleLoding} = userSlice.actions

export default userSlice.reducer;
