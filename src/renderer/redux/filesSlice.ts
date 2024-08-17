import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFile, IFileTag, ISearchParams } from '../../schema';
import { getFiles, getTags } from '../API/helper';

interface FilesState {
  value: IFile[];
  tags: IFileTag[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FilesState = {
  value: [],
  tags: [],
  status: 'idle',
  error: null,
};

// Define the thunk for fetching files
export const fetchFilesRedux = createAsyncThunk(
  'files/fetchFiles',
  async (searchParam: ISearchParams, { rejectWithValue }) => {
    try {
      console.log(searchParam);

      const response = await getFiles(searchParam);
      return response;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
    }
  },
);

// Define the thunk for fetching tags
export const fetchTagsRedux = createAsyncThunk(
  'tags/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTags();
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
    setTagsRedux: (state, action: PayloadAction<IFileTag[]>) => {
      state.tags = action.payload;
    },
    addTagRedux: (state, action: PayloadAction<IFileTag>) => {
      state.tags.push(action.payload);
    },
    editTagRedux: (state, action: PayloadAction<IFileTag>) => {
      state.tags = state.tags.map((tag) =>
        tag.tag_id === action.payload.tag_id ? { tag, ...action.payload } : tag,
      );
    },
    removeTagRedux: (state, action: PayloadAction<IFileTag>) => {
      state.tags = state.tags.filter(
        (tag) => tag.tag_id !== action.payload.tag_id,
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
      })
      .addCase(fetchTagsRedux.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTagsRedux.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tags = action.payload;
      })
      .addCase(fetchTagsRedux.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {
  addFilesRedux,
  removeFileRedux,
  setFilesRedux,
  setTagsRedux,
  addTagRedux,
  editTagRedux,
  removeTagRedux,
} = filesSlice.actions;

export default filesSlice.reducer;
