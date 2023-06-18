import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filter/filter-slice';
import { getFilter } from 'redux/filter/filter-selectors';
import { Input, LabelDescr, LabelWrapper } from './Filter.styled';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    // відправляємо в стейт те що набрано в інпуті через функцію changeFilter
    dispatch(setFilter(e.target.value.toLowerCase().trim()));
  };
  return (
    <LabelDescr>
      <LabelWrapper>
        Find contacts by name
      </LabelWrapper>
      <Input type="text" value={filter} onChange={changeFilter} placeholder="search" />
    </LabelDescr>
  );
};

export default Filter;


