import React from 'react';
import { CircleTimer } from './components/timers/circle-timer';
import { NotificationContextProvider } from './components/notification-context';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <div className="App-content">
        <NotificationContextProvider>
          <CircleTimer />
        </NotificationContextProvider>
      </div>
      <footer className="App-footer">

      </footer>
    </div>
  );
}

export default App;
