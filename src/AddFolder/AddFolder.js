import React from 'react'
import { withRouter } from 'react-router-dom'
import config from '../config'
import './AddFolder.css';
import PropTypes from 'prop-types';


class AddFolder extends React.Component {


  handleSubmit(event) {
    event.preventDefault();
    let folderName = event.target[0].value;
    let url = `${config.API_ENDPOINT}/folders`;

    const options = {
      method: 'POST',
      body: JSON.stringify({
        folder_name: folderName
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

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
      .then( folder => {
        this.props.history.push('/');
        this.props.onAddFolder(folder);
      })

      .catch(err => {
        console.log("Error during AddFolder.js");
      });
      

  }
  render() {

    return (
      <form className='addFolder-form' onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Folder</h2>
        <label htmlFor='folderName'>Folder name: </label>
        <input
          type='text'
          className='addFolderName'
          name='folderName'
          id='folderName'
          required
        />
        <button type='submit' className='saveButton'>Save</button>
      </form>
    )
  }
}

export default withRouter(AddFolder);

AddFolder.propTypes = {
  history: PropTypes.object,
  onAddFolder: PropTypes.func
}