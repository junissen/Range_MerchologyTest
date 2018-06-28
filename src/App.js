import React, { Component } from 'react';
import './App.css';
import ImageSlider from "./Components/ImageSlider";

class App extends Component {
  // Render parent app component
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Range Merchology Upload Test</h1>
        </header>
        <div className="App-slider">
          <ImageSlider></ImageSlider>
        </div>
      </div>
    );
  }
}

export default App;
