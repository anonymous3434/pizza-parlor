import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../../src/services/apiGeocoding';
const initialUserState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality},${addressObj?.city}${addressObj?.postcode},${addressObj?.countryName}`;
    return { position, address };
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
        console.log(state);
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
        console.log(state.error);
      }),
});
export const { updateName } = userSlice.actions;
export default userSlice.reducer;
