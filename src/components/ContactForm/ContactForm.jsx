import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
} from './ContactForm.styled';
// redux
import { addContact } from 'redux/contacts/contacts-slice';
import { getContacts } from 'redux/contacts/contacts-selectors';

// toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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


// робимо валідацію полів
const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = () => {
  // отримуємо контакти
  const contacts = useSelector(getContacts);
  // відправляємо
  const dispatch = useDispatch();
  // порівнюємо те що ввели з контактами які є
  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase().trim();
    const normalizedNumber = number.trim();
    //  тут порівнюємо
    const dublicate = contacts.find(
      contact =>
        contact.name.toLowerCase().trim() === normalizedName ||
        contact.number.trim() === normalizedNumber
    );
    // повертаємо булєве значення
    return Boolean(dublicate);
  };
  //  додавання контакту
  const onAddContact = ({ name, number }) => {
    // якщо такий є повертаємо помилку з написом
    if (isDublicate({ name, number })) {
      return toast.error(
        `This contact is already in contacts`,
        toastifyOptions
      );
    }
    // в іншому випадку через  dispatch відправляємо на додавання
    // в сонтакти
    dispatch(addContact({ name, number }));
    // const action = addContact({ name, number });
    // dispatch(action);
  };
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={(values, { resetForm }) => {
        // розпиляємо новий контакт при сабміті де генеруємо ID
        onAddContact({ id: nanoid(), ...values });
        // очищаємо форму
        resetForm();
          }}
        //   передаємо валідацію
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField htmlFor="name">
          <LabelWrapper>
            Name
          </LabelWrapper>
          <FieldFormik
            type="text"
            name="name"
            placeholder="Name" 
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField htmlFor="number">
          <LabelWrapper>
             Number
          </LabelWrapper>
          <FieldFormik
            type="tel"
            name="number"
            placeholder="+38-067-123-45-67"
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">
          Add contact
        </StyledButton>
      </Form>
    </Formik>
  );
};

ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};