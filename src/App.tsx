import React from 'react';
import './App.css';
import SettingPage from './components/SettingsPage/SettingsPage'
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <SettingPage></SettingPage>
      <Footer></Footer>
    </div>
  );
}

export default App;
