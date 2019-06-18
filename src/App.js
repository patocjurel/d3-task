import React from 'react';
import './App.css';
import LineChart from './components/LineChart';

class App extends React.Component {
  render() {
    return (
      <div>
        <LineChart id={"line-chart"}/>
      </div>
    );
  }
}

export default App;
