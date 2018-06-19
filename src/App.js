import React, { Component } from 'react';
import WeatherList from './WeatherList.js';
import WeatherTitle from './WeatherTitle.js';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <WeatherTitle />
                <WeatherList />
            </div>
            );
    }
}

export default App;
