/*
 * @Author: your name
 * @Date: 2019-10-14 11:41:57
 * @LastEditTime: 2019-11-05 10:13:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /react-monaco-demo/react-monaco-editor/src/index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
