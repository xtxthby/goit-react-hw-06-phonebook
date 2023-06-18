import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import initialContacts from 'components/contacts.json';

const contactsSlice = createSlice({
  // відповідає за контакти
  name: 'contacts',
  // початковий масив обєктів
  initialState: initialContacts,
  reducers: {
    addContact: {
      // тут повертає поточний стейт і додає нове значення
      reducer: (state, { payload }) => {
        //state.push(payload);
        return [...state, payload];
      },
      // підготовча ф-ція налаштування payload
      prepare: data => {
        return {
          payload: {
            // генеруємо айді
            id: nanoid(),
            ...data,
          },
        };
      },
    },
    // видалення контакту. за допомогою фільтра
    // по айдішнику ми повертаємо ті які неспівпадають
    //  з тим на який ми натиснули
    deleteContact: (state, { payload }) => {
      return state.filter(({ id }) => id !== payload);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;