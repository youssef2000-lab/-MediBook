import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for demonstration (let for mutability)
let mockAppointments = [
  {
    _id: 'appt1',
    id: 1,
    doctorId: 1,
    doctorName: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    date: '2024-02-15',
    time: '10:00 AM',
    status: 'confirmed',
    notes: 'Regular checkup',
  },
  {
    _id: 'appt2',
    id: 2,
    doctorId: 3,
    doctorName: 'Dr. Emily Brown',
    specialty: 'Pediatrics',
    patientName: 'John Doe',
    patientEmail: 'john@example.com',
    date: '2024-02-20',
    time: '2:00 PM',
    status: 'pending',
    notes: 'Annual vaccination',
  },
  {
    _id: 'appt3',
    id: 3,
    doctorId: 2,
    doctorName: 'Dr. Michael Johnson',
    specialty: 'Dermatology',
    patientName: 'Jane Smith',
    patientEmail: 'jane@example.com',
    date: '2024-02-18',
    time: '11:00 AM',
    status: 'confirmed',
    notes: 'Skin consultation',
  },
  {
    _id: 'appt4',
    id: 4,
    doctorId: 4,
    doctorName: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    patientName: 'Bob Wilson',
    patientEmail: 'bob@example.com',
    date: '2024-02-22',
    time: '9:00 AM',
    status: 'completed',
    notes: 'Follow-up appointment',
  },
];

// Helper functions
const getDoctorAppointments = (doctorId) => mockAppointments.filter((apt) => apt.doctorId === doctorId);

export const fetchMyAppointments = createAsyncThunk(
  'appointments/fetchMy',
  async (userEmail, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAppointments.filter(apt => apt.patientEmail === userEmail);
    } catch (error) {
      return rejectWithValue('Failed to fetch appointments');
    }
  }
);

export const fetchDoctorAppointments = createAsyncThunk(
  'appointments/fetchDoctor',
  async (doctorId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return getDoctorAppointments(doctorId);
    } catch (error) {
      return rejectWithValue('Failed to fetch doctor appointments');
    }
  }
);

export const fetchAllAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockAppointments;
    } catch (error) {
      return rejectWithValue('Failed to fetch appointments');
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newAppointment = {
        _id: `appt${mockAppointments.length + 1}`,
        id: mockAppointments.length + 1,
        ...appointmentData,
        status: 'pending',
      };
      mockAppointments.push(newAppointment);
      return newAppointment;
    } catch (error) {
      return rejectWithValue('Failed to create appointment');
    }
  }
);

export const acceptAppointment = createAsyncThunk(
  'appointments/accept',
  async (appointmentId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockAppointments.findIndex(a => a._id === appointmentId);
      if (index !== -1) {
        mockAppointments[index].status = 'confirmed';
        return mockAppointments[index];
      }
      return rejectWithValue('Appointment not found');
    } catch (error) {
      return rejectWithValue('Failed to accept appointment');
    }
  }
);

export const rejectAppointment = createAsyncThunk(
  'appointments/reject',
  async (appointmentId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockAppointments.findIndex(a => a._id === appointmentId);
      if (index !== -1) {
        mockAppointments[index].status = 'rejected';
        return mockAppointments[index];
      }
      return rejectWithValue('Appointment not found');
    } catch (error) {
      return rejectWithValue('Failed to reject appointment');
    }
  }
);

export const completeAppointment = createAsyncThunk(
  'appointments/complete',
  async (appointmentId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockAppointments.findIndex(a => a._id === appointmentId);
      if (index !== -1) {
        mockAppointments[index].status = 'completed';
        return mockAppointments[index];
      }
      return rejectWithValue('Appointment not found');
    } catch (error) {
      return rejectWithValue('Failed to complete appointment');
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'appointments/update',
  async ({ _id, appointmentData }, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockAppointments.findIndex(a => a._id === _id);
      if (index !== -1) {
        mockAppointments[index] = { ...mockAppointments[index], ...appointmentData };
        return mockAppointments[index];
      }
      return rejectWithValue('Appointment not found');
    } catch (error) {
      return rejectWithValue('Failed to update appointment');
    }
  }
);

export const cancelAppointment = createAsyncThunk(
  'appointments/cancel',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockAppointments.findIndex(a => a.id === id);
      if (index !== -1) {
        mockAppointments.splice(index, 1);
        return id;
      }
      return rejectWithValue('Appointment not found');
    } catch (error) {
      return rejectWithValue('Failed to cancel appointment');
    }
  }
);

const initialState = {
  appointments: [],
  loading: false,
  error: null,
  success: false,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
    clearAppointmentSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Appointments
      .addCase(fetchMyAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Doctor Appointments
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Appointments
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Accept Appointment
      .addCase(acceptAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(acceptAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(acceptAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reject Appointment
      .addCase(rejectAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(rejectAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(rejectAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Complete Appointment
      .addCase(completeAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(completeAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
      })
      .addCase(completeAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments.push(action.payload);
        mockAppointments.push(action.payload);  // Update global mock
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Appointment
      .addCase(updateAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        // Update global mock
        const globalIndex = mockAppointments.findIndex(a => a._id === action.payload._id);
        if (globalIndex !== -1) {
          mockAppointments[globalIndex] = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Cancel Appointment
      .addCase(cancelAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(a => a._id !== action.payload);
        // Update global mock
        const index = mockAppointments.findIndex(a => a._id === action.payload);
        if (index !== -1) {
          mockAppointments.splice(index, 1);
        }
      })
      .addCase(cancelAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAppointmentError, clearAppointmentSuccess } = appointmentSlice.actions;
export default appointmentSlice.reducer;

