import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import doctorReducer from './doctorSlice';
import appointmentReducer from './appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

