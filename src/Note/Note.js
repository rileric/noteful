import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import config from '../config';
import './Note.css';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }
  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const note_id = this.props.note_id

    fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return res.json()
      })
      .then(() => {
        this.context.deleteNote(note_id)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(note_id)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { note_name, note_id, modified } = this.props;

    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/notes/${note_id}`}>
            {note_name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(new Date(modified), 'do MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  note_id: PropTypes.number.isRequired,
  note_name: PropTypes.string.isRequired,
  modified: PropTypes.string.isRequired,
  onDeleteNote: PropTypes.func
}