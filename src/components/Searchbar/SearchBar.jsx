import React, { Component } from "react";
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';


class SearchBar extends Component {
    static PropTypes = {
        onSubmit: PropTypes.func.isRequired,
    };
     state = { query: ''};

     handleChange = event => {
        this.setState({ query: event.target.value });
     };
     render() {
        return (
            <header className={styles.SearchBar}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.button}>
                        <span className={styles.buttonLabel}>Search</span>
                    </button>
                    <input className={styles.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search Images and photos"
                    value={this.state.query}
                    onChange={this.handleChange}
                    />
                </form>
            </header>
        );
        }
     }
export default SearchBar;