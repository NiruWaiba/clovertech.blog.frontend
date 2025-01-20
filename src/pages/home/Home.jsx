import { useEffect, useState } from "react"
import Header from "../../Components/header/Header"
import Posts from "../../Components/posts/Posts"
import SideBar from "../../Components/sidebar/SideBar"
import "./home.css"
import axiosInstance from "../../api/axios"

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
     const res = await axiosInstance.get("/api/Post")
     setPosts(res.data.data)
    //  console.log(res)
    }
    fetchPosts();
  },[]) 

  return (
    <>
     <Header/>
    <div className="home">
      <Posts posts={posts}/>
      <SideBar/>     
    </div>
    </>
   
  )
}

export default Home



