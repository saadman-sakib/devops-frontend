'use client'
 
import { useParams } from 'next/navigation'

function ProfileDetail() {
  const params = useParams()
  console.log(params) 
  return <h1>Details about product {params.profileId} </h1>
} 

export default ProfileDetail