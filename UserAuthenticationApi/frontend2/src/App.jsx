import { useState} from "react";


export default function App(){
  const [data,setData] = useState("");
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");
 const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  

  

  async function fetchingData(e) {
    e.preventDefault();
    setData("");
    try{
     const response =await fetch(
    "http://localhost:3000/api/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body : JSON.stringify({userName,password})
    }
  );

    const result  =await response.json();
  if (!response.ok) {
  throw new Error(
    result.messeges || `Request failed: ${response.status}`
  );
}

  setData(result);
  setPassword("")
    }catch(err){
      setErr(err.message);
    }finally{
      setLoading(false);
    }
  }
  

 
 return(
  <>
  <form onSubmit={fetchingData}>
  <input type="text" 
    placeholder="Enter your Email"
    value={userName}
    onChange={(e)=>setUserName(e.target.value)}
    required
/>
<input type="password" 
placeholder="Enter YOur password"
value={password}
onChange={(e)=>{setPassword(e.target.value)}}
required
/>
<button type="submit" disabled={loading}>
   {loading ? "Logging in..." : "Login"}
</button>
  </form>
  <h1>here is the res = {data}</h1>
        {err && <p role="alert">{err}</p>}

      {data && <p>{data.message || "Login successful!"}</p>}
 </>
 )
 
}
