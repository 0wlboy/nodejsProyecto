import {useState, useEffect} from "react";

export function GetUser(){
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
    .then(response => response.json())
    .then(data => setUser(data))
  }, [])
  
  if(user){
    console.log(user)
  }
  
  return(
    <>
      <h1>Lista de usuarios</h1>
      <ul>
        {user && user.docs && user.docs.map(user =>{
          <li key={user._id}> `122`
            <p>{user.name}</p>
            <p>{user.email}</p>
          </li>
        })}
      </ul>
    </>
  )
}