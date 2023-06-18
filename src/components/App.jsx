import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filter from './Filter/Filter';
import { Section } from './Section/Section';




// redux
import { getContacts } from 'redux/contacts/contacts-selectors';

export default function App () {
  const contacts = useSelector(getContacts);

  return (
    <>
      <Section title= "Phonebook">
        <ContactForm/>
        {contacts.length > 0 && (
          <>
          <Header title="Contacts" />
          <Filter/>
          <ContactList/>
          </>
        )}
      </Section>
      <ToastContainer />
    </>
  );
};
