import React, {useState} from 'react';
import './App.css';

import ImageGrid from './components/ImageGrid';
import SearchForm from './components/SearchForm';

export const AppContext = React.createContext({images: { get: [], set: (a: any)=>{}}});

function App() {
  const [images, setImages] = useState([]);

  const store = {
    images: {get: images, set: setImages},
  };

  return (
    <AppContext.Provider value={store}>
      <header>
        <SearchForm />
      </header>
      <main>
        <ImageGrid images={images} />
      </main>
    </AppContext.Provider>
  );
}

export default App;
