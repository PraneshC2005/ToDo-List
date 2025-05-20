import React from "react";
import { useState } from "react";

const [Todo,setTodo] = useState([]);
const [formData,setformData] = useState([]);

const base_url = "http://localhost:3000";

const fetchdata = async () =>{
  try{
    const response = await axios.get(`${base_url}/todos`);
    setdata(response.data)
  }
  catch(error)
  {
    console.log(error.message);
  }
}

return(
  <div>
  </div>
)

