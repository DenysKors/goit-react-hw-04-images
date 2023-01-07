import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from 'images/search.svg';
import { toast } from 'react-toastify';
import { Head, Form, Button, Search, Input } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const inputChange = evt => {
    const { value } = evt.target;
    setQuery(value);
  };

  const formSubmit = evt => {
    evt.preventDefault();

    if (query.trim() === '') {
      return toast.info('Enter request to search');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <Head>
      <Form onSubmit={formSubmit}>
        <Button type="submit">
          <SearchIcon />
          <Search>Search</Search>
        </Button>

        <Input
          type="text"
          autocomplete="off"
          value={query}
          placeholder="Search images and photos"
          onChange={inputChange}
        />
      </Form>
    </Head>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
