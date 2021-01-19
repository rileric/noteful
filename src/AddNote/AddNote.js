import React from 'react'
import { withRouter} from 'react-router-dom'
import config from '../config'
import './AddNote.css';
import PropTypes from 'prop-types';


class AddNote extends React.Component {

  constructor(props) {

    super(props);
    this.state = {
      noteName: '',
      nameTouched: false,
      modified: new Date(),
      folderId: '',
      folderTouched: false,
      noteContent: ''
    };
    
  }

  handleInputChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    this.setState({
      [inputName]: inputValue
    });

    if(inputName === 'noteName') {
      this.setState({
        nameTouched: true
      });
    }

    if(inputName === 'folderId') {
      this.setState({
        folderTouched: true
      });
    }
  }

  validateName() {
    const trimName = this.state.noteName.trim();

    if(this.state.nameTouched) {
      if(trimName.length === 0) {
        return( "Name is required and cannot be whitespace.");
      }
    }
  }

  validateFolder() {
    const folderSelected = this.state.folderId;

    if(folderSelected === 'none' || !this.state.folderTouched) { // default value for the dropdown menu
      return( "Folder is required.");
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let noteName = this.state.noteName;
    let folderId = this.state.folderId;
    let noteContent = this.state.noteContent;
    let url = `${config.API_ENDPOINT}/notes`;
    

    const options = {
      method: 'POST',
      body: JSON.stringify({
        name: noteName,
        folderId: folderId,
        modified: new Date(),
        content: noteContent
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    console.log(options.body);

    fetch(url, options)
      .then( res => {
        if(!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        else {
          console.log('No issues with request!');
          return res.json();
        } 
      })
      .then( note => {
        this.props.history.push('/');
        this.props.onAddNote(note);
      })

      .catch(err => {
        console.log("Error during AddNote.js");
      });
      
  }

  render() {
    const folderMenu = this.props.folderList.map(
      (folder) => <option value={folder.id} key={folder.id}>{folder.name}</option>
    );

  
    return (
      <form className='addNote-form' onSubmit={e => this.handleSubmit(e)} >
        <h2>Add Note</h2>

        <label htmlFor='folderId'>Folder: </label>
        <select id='folderId' name='folderId' onChange={this.handleInputChange}>
          <option value='none'>Select one...</option>
          {folderMenu}
        </select>

        <label htmlFor='noteName'>Note name: </label>
        <input
          type='text'
          className='addNoteName'
          name='noteName'
          id='noteName'
          onChange={this.handleInputChange}
          required
        />

        <label htmlFor='noteContent'>Content:</label>
        <textarea
          className='addNoteContent'
          name='noteContent'
          id='noteContent'
          onChange={this.handleInputChange}
          required
        />

        <button type='submit' className='saveButton' disabled={ (this.validateName() || this.validateFolder() ) } >Save</button>
      </form>
    )
  }
}

export default withRouter(AddNote);

AddNote.propTypes = {
  onAddNote: PropTypes.func,
  history: PropTypes.object,
  folderList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
}