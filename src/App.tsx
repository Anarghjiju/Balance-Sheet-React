import React from 'react';
import './App.css';
import LogisticsDashboard from './componenets/LogisticsDashboard';

import BalanceSheet from './componenets/balance';



const App: React.FC = () => {
  return (
    <div className="App">
      <BalanceSheet />
    </div>
  );
};

export default App;
