import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    const { value } = event.target;
    this.setState({ query: value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit(this.state.query);
  };

  render() {
    return (
      <>
        <header className={css.Searchbar}>
          <form className={css.SearchForm} onSubmit={this.onSubmit}>
            <button type="submit" className="SearcFormButton">
              <span className="button-label">Search</span>
            </button>

            <input
              className={css.SearchFormInput}
              onChange={this.handleChange}
              value={this.state.query.trim()}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}
Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
};
export default Searchbar;
