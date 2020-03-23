
import React from 'react';
import './App.css';
import SpotifyControlContainer from './components/SpotifyControlContainer';
import {library} from '@fortawesome/fontawesome-svg-core'
import {faForward, faBackward, faPause, faPlay} from '@fortawesome/free-solid-svg-icons'

library.add(faForward, faBackward, faPause, faPlay)

const App = () => {
  return (
    <div className="App">
      <SpotifyControlContainer />        
    </div>
  );
}


export default App;