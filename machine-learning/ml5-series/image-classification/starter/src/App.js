import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="App mt-5">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <h1 className="subtitle has-text-centered">Image</h1>
              <div className="card">
                <div className="card-image">

                  {/* { IMAGE GOES HERE } */}

                </div>
                <div className="card-content">

                  {/* { PREDICTION GOES HERE } */}

                </div>
              </div>
            </div>
          </div>
          <button className="button is-success is-outlined" disabled={true}>Detect</button>

          {/* { DROPZONE GOES HERE } */}
          <p>Drag 'n' drop some files here, or click to select files</p>

        </div >
      </div>
    );
  }
}

export default App;
