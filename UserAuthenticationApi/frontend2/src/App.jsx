import {useState} from "react"


export function App(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  return(
    <div>
      <h1>Hello, {name}</h1>
      <input type="text" 
      placeholder="Enter Your name"
      value={name}
      onChange={(event)=>setName(event.target.value)}
      />
      <h1>Your Email : {email}</h1>
      <input type="email"
      placeholder="Enter YOur Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
       />
    </div>
  )
}
export default App;