import React from 'react';
import Dropzone from 'react-dropzone'
import './App.css';
import * as ml5 from "ml5";

class App extends React.Component {

  state = {
    imageUrl: undefined,
    classifier: undefined,
    predictions: null,
  }

  async componentDidMount() {
    const mobileNet = ml5.imageClassifier("MobileNet", () => {
      console.log("Model is loaded");
    });
    this.setState({ classifier: mobileNet });
  }

  onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    console.log(file);
    const reader = new FileReader();

    reader.onloadend = function (event) {
        console.log(file);
        // filename is in file.name
        // ... do something here
    }
    
    reader.readAsArrayBuffer(file);
    
    const { classifier } = this.state;

    // this.setState({ imageUrl: file });
    // classifier.predict(file.path, (error, results) => {
    //   if(error){
    //     console.error(error);
    //   }else{
    //     console.log(results);
    //   }
    // })

  }

  render() {
    return (
      <div className="App">
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              Click me or drag a file to upload!
            </div>
          )}
        </Dropzone>
        <img src={this.state.imageUrl} alt="nothing" />
      </div>
    );
  }
}

export default App;
