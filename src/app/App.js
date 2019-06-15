import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// scss
import './App.scss';

// svgs

// components

import CameraList from '../Components/CameraList/CameraList';
import Tester from '../Components/Tester.js';
import DataCollection from '../Components/DataCollection';
import NavBar from '../Components/NavBar';

// data
import sentences from '../assets/data/sentences.txt';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      curr_sentence: '所谓的三个经济问题是指生产什么怎样生产和为谁生产',
      first_name: '',
      last_name: '',
      date: new Date()
    };
  }

  readTextFile(file) {
    const rawFile = new XMLHttpRequest();
    rawFile.open('GET', file, false);
    let allText = '';
    rawFile.onreadystatechange = function() {
      if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
          allText = rawFile.responseText;
        }
      }
    };
    rawFile.send(null);
    return allText.split('\n');
  }

  updateName = (first_name, last_name) => {
    this.setState({
      first_name,
      last_name
    });
  };

  dataCollection = (data) => {
    return (
      <DataCollection
        data={data}
        updateName={this.updateName}
        first_name={this.state.first_name}
        last_name={this.state.last_name}
        curr_sentence={this.state.curr_sentence}
      />
    );
  }

  render() {
    const data = this.readTextFile(sentences);
    return (
      <div className='container'>
        <Router>
          <NavBar />
          <div className='contents'>
            <div className='left_panel'>
              <Route path='/admin' component={CameraList} />
              <Route path='/tester' component={Tester} />
            </div>
            <div className='right_panel'>
              <Route path='/admin' render={() => this.dataCollection(data)} />
              <Route path='/tester' render={() => this.dataCollection(data)} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
