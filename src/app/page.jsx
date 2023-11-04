"use client"

import { Button } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [is_auth, setAuth] = useState(null);
  useEffect( ()=>{
    if(localStorage.getItem('token')===null){
      setAuth(localStorage.getItem('token')!==null);
    }
  },[])

  if (is_auth==false){
    return (
      <main style={{textAlign: 'center'}} >
        <h1>Home</h1>
        <p>Welcome to Tax Calculator</p>
        <Link href="/login" > Login Page </Link>
      </main>
    )
  } else {
    
    return (
      <main style={{textAlign: 'center'}} >
        <h1>Home</h1>
        <p>Welcome to Tax Calculator</p>
        <Button onClick={()=>{window.location.reload()}} > start calculating </Button>
      </main>
    )
  }
}
