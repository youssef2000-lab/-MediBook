import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456', role: 'patient' },
  { id: 2, name: 'Dr. Sarah Smith', email: 'sarah@doctor.com', password: '123456', role: 'doctor' },
  { id: 3, name: 'Admin User', email: 'admin@medibook.com', password: '123456', role: 'admin' },
];

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, token: 'mock-jwt-token-' + user.id };
    }
    
    return rejectWithValue('Invalid email or password');
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingUser = mockUsers.find(u => u.email === userData.email);
    
    if (existingUser) {
      return rejectWithValue('Email already exists');
    }
    
    if (userData.role === 'admin') {
      return rejectWithValue('Admin accounts cannot be created through registration');
    }
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
    };
    
    mockUsers.push(newUser);
    const { password, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, token: 'mock-jwt-token-' + newUser.id };
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return null;
});

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

