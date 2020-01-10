import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';


import Amplify from 'aws-amplify'
import config from './aws-exports'

Amplify.configure(config)

ReactDOM.render(<App />, document.getElementById('root'));

