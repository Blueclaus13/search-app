import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import './App.css';
import Axios  from 'axios';
import { e } from 'mathjs';
const baseURL = "https://api.github.com/search/issues?q=repo:facebook/react";
//https://api.github.com/search/issues?q=repo:facebook/react bug in:title
//https://api.github.com/search/issues?q=repo%3afacebook%2freact+bug+in%3atitle

function App() {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded]= useState(false);

  const [q, setQ] = useState("");
  const [searchParam] = useState(["title"]);

  // useEffect(()=>{
  //   Axios.get(baseURL)
  //         .then(
  //           (response)=>{
  //           setData(response.data);
  //           setIsLoaded(true);
  //           console.log(response.data)
  //           })
  //         .catch(error=>{
  //           setError(error);
  //         });
        
  // },[]);

  const search = async (word)=>{
    
    Axios.get(`${baseURL} ${word} in:title`)
          .then(
            (response)=>{
            setData(response.data.items);
            setIsLoaded(true);
            
            })
          .catch(error=>{
            setError(error);
            console.log(error.message)
          });

  }



  const getLabelsPrinted = (labels)=>{
    let text = "";
    
    labels.forEach(element => {
      text += element.name + " ";
      
    });
    return text;
  };

  // const search = (data)=>{
  //   return data.filter((d)=>{
  //     return searchParam.some((newItem)=>{
  //       return (
  //         d[newItem]
  //           .toString()
  //           .toLowerCase()
  //           .indexOf(q.toLowerCase()) > -1
  //       );
  //     });
  //   });
  // };


  return (
    <Grid container columns={12} justifyContent="center" alignItems={"center"}>

      <Grid item xs= {8} > 
        <form className="search"
            onSubmit ={(e)=>{
              e.preventDefault();
              
              
              if(q !== ""){
                setIsLoaded(false);
                console.log('loaded')
                search(q)
              }else{
                setIsLoaded(false);
                console.log('space');
                setData([]);
              }}}>
          <label>Search: </label>
          <input 
            type="text"
            placeholder='Search'
            value={q} 
            onChange={(e)=>{
              setQ(e.target.value)
              if(e.target.value === ""){
                setData([]);
              }
            }}
            ></input>
          </form></Grid>

      {data &&
        <Grid container item columns={1} >

        <div className='items-container'>
        {data.map((item)=>(
         <Grid item key={item.id} xs={4} className="item" >
           <p>Title: {item.title}</p>
           <p>Label {getLabelsPrinted(item.labels)}</p>
         </Grid>
        ))}
        </div>

     </Grid>}
    </Grid>
    
  );
  
}

export default App;
