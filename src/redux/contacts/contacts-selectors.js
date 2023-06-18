import { toast } from 'react-toastify';


const toastifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  toastId: 'custom-id-yes',
};
// тут отримуємо контакти
export const getContacts = store => store.contacts;

export const getFilteredContacts = store => {
  const { filter, contacts } = store;
  // якщо не фільтер то повертаємо контакти
  if (!filter) {
    return contacts;
  }
  // .в іншому випадку фільтруємо по імені та номеру
  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(
    ({ name, number }) =>
      name.toLowerCase().trim().includes(normalizedFilter) ||
      number.trim().includes(normalizedFilter)
  );
  // якщо нема співпадінь видаємо попередження
  if (normalizedFilter && !filteredContacts.length) {
    toast.warn(`No contacts matching your request`, toastifyOptions);
  }
  return filteredContacts;
};