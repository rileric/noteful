import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import { findNote } from '../notes-helpers'
import './NotePageMain.css'
import PropTypes from 'prop-types';

export default class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  handleDeleteNote = note_id => {
    this.props.history.push(`/`);
  }

  render() {
    const { notes=[] } = this.context;
    const { note_id } = this.props.match.params;
    const note = findNote(notes, note_id) || { content: '' };
    
    return (
      <section className='NotePageMain'>
        <Note
          note_id={note.note_id}
          note_name={note.note_name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}

NotePageMain.propTypes = {
  match: PropTypes.object
}