import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  // відповідає за фільтер
  name: 'filter',
  // початковий стан
  initialState: '',
  reducers: { 
    // повертає поточний стан який записан в інпуті
    setFilter: (_, { payload }) => payload,
  },
});
// експортуємо функцію подію із createSlice
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;