import React, {useEffect, useState} from 'react'
import axios from 'axios';
const Show = (key) => {
    const [showUser, setShowUser] = useState([]);
    const fetchData = async() => {
       await axios.get('https://api.daiwer.com/api/v1.0/users/', {
        params: {
            id: key,
          }
        
       }).then((res) => {
        const myresponse= res.data;
        setShowUser(myresponse)
      });
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div>
      
    </div>
  )
}

export default Show
