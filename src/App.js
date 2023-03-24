import React from 'react';
import { Grid } from '@mui/material';
import './App.css';

function App() {
  return (
    <Grid container columns={12} justifyContent="center" alignItems={"center"}>
      <Grid item xs= {8} className="search"> 
        <label>Search: </label>
        <input type="text" ></input></Grid>
    </Grid>
    
  );
}

export default App;
