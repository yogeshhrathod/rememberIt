import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile } from '../../schema';
import { getFiles } from '../API/helper';

interface FilesState {
  value: IFile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FilesState = {
  value: [],
  status: 'idle',
  error: null,
};

// Define the thunk for fetching files
export const fetchFilesRedux = createAsyncThunk(
  'files/fetchFiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFiles(); // Assuming getFiles() returns a promise of IFile[]
      return response;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    }
  },
);

export const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    clearItems: (state) => {
      state.value = [];
    },
    setFilesRedux: (state, action: PayloadAction<IFile[]>) => {
      state.value = action.payload;
    },
    addFilesRedux: (state, action: PayloadAction<IFile[]>) => {
      state.value.push(...action.payload);
    },
    removeFileRedux: (state, action: PayloadAction<IFile>) => {
      state.value = state.value.filter(
        (file) => file.file_id !== action.payload.file_id,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilesRedux.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilesRedux.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(fetchFilesRedux.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { addFilesRedux, removeFileRedux, setFilesRedux } =
  filesSlice.actions;

export default filesSlice.reducer;
