import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Btn, Item, List } from './ContactList.styled';
// redux
import { deleteContact } from 'redux/contacts/contacts-slice';
import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

export const ContactList = () => {
  //  отримуємо відфільтровані контакти
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();
  //  відправляэмо видалення 
  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };
  return (
    <List>
      {filteredContacts.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}</span>
            <Btn type="button" onClick={() => onDeleteContact(id)}>Delite</Btn>
          </Item>
        );
      })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
};