import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setQuery] = useState("")
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filteredUser()
  },[searchQuery])

  const fetchData = async () => {
    setError(null)
    setIsLoading(true)
    try{
      const response =  await axios.get(`https://jsonplaceholder.typicode.com/users`)
      const data = await response.data
      console.log(data);
      setUsers(data)
      setAllUsers(data)

    }catch(err){
      setError(err)
    }finally{
      setIsLoading(false)
    }
  }

  const filteredUser = () => {
    const newUser = allUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setUsers(newUser)
  }

  const handleQueryChange = (event) => {
    
    setQuery(event.target.value)
  }

  return (
    <div className="App">
      <h1>Dynamic Search Functionality</h1>
      {error && <p>{error.message}</p>}
      <input className='search-input' type='text' value={searchQuery} onChange={handleQueryChange}/>
      {/* <button onClick={filteredUser}>Search</button> */}

      {isLoading && <p>Please enter some text</p>}
      <div className='table-data'>
      <table>
        <tbody style={{border:"black", borderWidth: "1"}}>
        <tr>
          <th>Sl no.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Website</th>
          <th>Address</th>
        </tr>
      {users.map((user) => 
          <tr key={user.id}>
            <td>{user.id }</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>{user.website}</td>
            <td>{user.address.street}</td>
          </tr>
        
      )}
        </tbody>
      </table>

      </div>
    </div>
  );
}

export default App;
