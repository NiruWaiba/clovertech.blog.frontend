
import './sidebar.css'

const SideBar = () => {
  return (
    <div className='sidebar'>
     <div className='sidebarItem'>
        <span className='sidebarTitle'>ABOUT BLOG</span>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnQWXgiHNVDtR3BFJjXroS_McSrAkJOm6ng&s'></img>
            <p>A blog is a regularly updated website or online platform where individuals, groups, or businesses share their thoughts, expertise, stories, and ideas with an audience. Blogs can cover a wide range of topics, including personal experiences, education, technology, lifestyle, food, travel, health, and more.</p>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'> CATEGORIES</span>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>Sport</li>
          <li className='sidebarListItem'>Life</li>
          <li className='sidebarListItem'>Music</li>
          <li className='sidebarListItem'>Tech</li>
        </ul>
      </div>
      <div className='sidebarItem'>
        <span className='sidebarTitle'>FOLLOW US</span>
        <div className='socialmedia'>
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          <i className="sidebarIcon fa-brands fa-linkedin"></i>
          <i className="sidebarIcon fa-brands fa-tiktok"></i>
        </div>
      </div>
    </div>
  )
}

export default SideBar






// import { useEffect, useState } from 'react'

// import './sidebar.css'
// import { Link } from 'react-router-dom'

// const SideBar = () => {
//   const [cats, setCats] = useState([])

//   useEffect(()=>{
//     const getCats = async ()=>{
//       const res = await axiosInstance.get("/api/Category")
//       setCats(res.data)

//     }
//     getCats()
//   },[])
//   return (
//     <div className='sidebar'>
//      <div className='sidebarItem'>
//         <span className='sidebarTitle'>ABOUT BLOG</span>
//             <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnQWXgiHNVDtR3BFJjXroS_McSrAkJOm6ng&s'></img>
//             <p>A blog is a regularly updated website or online platform where individuals, groups, or businesses share their thoughts, expertise, stories, and ideas with an audience. Blogs can cover a wide range of topics, including personal experiences, education, technology, lifestyle, food, travel, health, and more.</p>
//       </div>
//       <div className='sidebarItem'>
//         <span className='sidebarTitle'> CATEGORIES</span>
//         <ul className='sidebarList'>
//           {cats.map(c=>(
//             <Link to={`/?cat=${c.name}`} className='link'> <li className='sidebarListItem'>{c.name}</li> </Link>
            
//          ))}
          
//         </ul>
//       </div>
//       <div className='sidebarItem'>
//         <span className='sidebarTitle'>FOLLOW US</span>
//         <div className='socialmedia'>
//           <i className="sidebarIcon fa-brands fa-square-facebook"></i>
//           <i className="sidebarIcon fa-brands fa-square-instagram"></i>
//           <i className="sidebarIcon fa-brands fa-linkedin"></i>
//           <i className="sidebarIcon fa-brands fa-tiktok"></i>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SideBar

// import { useEffect, useState } from 'react';
// import './sidebar.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const SideBar = () => {
//   const [cats, setCats] = useState([]);
//   const [newCategory, setNewCategory] = useState('');
  
//   // Get token from localStorage
//   const token = localStorage.getItem('authToken');
  
//   const axiosInstance = axios.create({
//     baseURL: 'https://blog.hamrosystem.com',
//     headers: {
//       Authorization: token ? `Bearer ${token}` : '', // Only add token if it exists
//       'Content-Type': 'application/json',
//     },
//   });

//   // Add error handling for missing token
//   const handleCreate = async () => {
//     if (!token) {
//       alert('Please log in to create categories');
//       return;
//     }
    
//     if (!newCategory) {
//       alert('Category name cannot be empty');
//       return;
//     }

//     try {
//       await axiosInstance.post('/api/Category', { name: newCategory });
//       setNewCategory('');
//       refreshCategories();
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert('Your session has expired. Please log in again.');
//         // Optionally redirect to login page or trigger re-authentication
//       } else {
//         console.error('Error creating category:', err);
//         alert('Failed to create category. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebarItem">
//         <span className="sidebarTitle">ABOUT BLOG</span>
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnQWXgiHNVDtR3BFJjXroS_McSrAkJOm6ng&s"
//           alt="About Blog"
//         />
//         <p>
//           A blog is a regularly updated website or online platform where individuals, groups, or
//           businesses share their thoughts, expertise, stories, and ideas with an audience.
//         </p>
//       </div>

//       <div className="sidebarItem">
//         <span className="sidebarTitle">CATEGORIES</span>
//         <ul className="sidebarList">
//           {cats.map((c) => (
//             <li key={c.id} className="sidebarListItem">
//               <Link to={`/?cat=${c.name}`} className="link">
//                 {c.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="sidebarItem">
//         <span className="sidebarTitle">ADD NEW CATEGORY</span>
//         <input
//           type="text"
//           placeholder="New Category"
//           value={newCategory}
//           onChange={(e) => setNewCategory(e.target.value)}
//         />
//         <button onClick={handleCreate}>Add</button>
//       </div>

//       <div className="sidebarItem">
//         <span className="sidebarTitle">FOLLOW US</span>
//         <div className="socialmedia">
//           <i className="sidebarIcon fa-brands fa-square-facebook"></i>
//           <i className="sidebarIcon fa-brands fa-square-instagram"></i>
//           <i className="sidebarIcon fa-brands fa-linkedin"></i>
//           <i className="sidebarIcon fa-brands fa-tiktok"></i>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
