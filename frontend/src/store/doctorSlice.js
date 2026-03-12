import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data for demonstration
const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Smith',
    specialty: 'Cardiology',
    experience: 15,
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Experienced cardiologist specializing in heart disease prevention and treatment.',
    phone: '+1 234-567-8901',
    email: 'sarah@medibook.com',
    address: '123 Medical Center Dr, Suite 100',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: '9:00 AM - 5:00 PM',
  },
  {
    id: 2,
    name: 'Dr. Michael Johnson',
    specialty: 'Dermatology',
    experience: 10,
    rating: 4.6,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Specialized in skin conditions, cosmetic procedures, and laser treatments.',
    phone: '+1 234-567-8902',
    email: 'michael@medibook.com',
    address: '456 Health Ave, Suite 200',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableTime: '10:00 AM - 6:00 PM',
  },
  {
    id: 3,
    name: 'Dr. Emily Brown',
    specialty: 'Pediatrics',
    experience: 12,
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Compassionate pediatrician dedicated to childrens health and wellness.',
    phone: '+1 234-567-8903',
    email: 'emily@medibook.com',
    address: '789 Child Care Blvd',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTime: '8:00 AM - 4:00 PM',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Orthopedics',
    experience: 20,
    rating: 4.7,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    bio: 'Expert in sports injuries, joint replacement, and minimally invasive surgery.',
    phone: '+1 234-567-8904',
    email: 'james@medibook.com',
    address: '321 Bone & Joint Center',
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTime: '9:00 AM - 3:00 PM',
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialty: 'Neurology',
    experience: 18,
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    bio: 'Specializing in brain disorders, epilepsy, and neurological rehabilitation.',
    phone: '+1 234-567-8905',
    email: 'lisa@medibook.com',
    address: '555 Neuro Institute',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    availableTime: '10:00 AM - 5:00 PM',
  },
  {
    id: 6,
    name: 'Dr. David Martinez',
    specialty: 'General Medicine',
    experience: 8,
    rating: 4.5,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    bio: 'Family medicine physician providing comprehensive healthcare for all ages.',
    phone: '+1 234-567-8906',
    email: 'david@medibook.com',
    address: '777 Family Clinic',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableTime: '8:00 AM - 6:00 PM',
  },
];

export const fetchDoctors = createAsyncThunk(
  'doctors/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockDoctors;
    } catch (error) {
      return rejectWithValue('Failed to fetch doctors');
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const doctor = mockDoctors.find(d => d.id === parseInt(id));
      if (doctor) {
        return doctor;
      }
      return rejectWithValue('Doctor not found');
    } catch (error) {
      return rejectWithValue('Failed to fetch doctor');
    }
  }
);

export const searchDoctors = createAsyncThunk(
  'doctors/search',
  async (query, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const results = mockDoctors.filter(
        doctor =>
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase())
      );
      return results;
    } catch (error) {
      return rejectWithValue('Search failed');
    }
  }
);

const initialState = {
  doctors: mockDoctors,
  currentDoctor: null,
  loading: false,
  error: null,
  searchResults: [],
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    clearDoctor: (state) => {
      state.currentDoctor = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctor, clearSearchResults } = doctorSlice.actions;
export default doctorSlice.reducer;

