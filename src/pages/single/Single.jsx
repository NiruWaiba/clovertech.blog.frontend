import './single.css'
import SideBar from '../../Components/sidebar/SideBar.jsx'
import SinglePost from '../../Components/singlePost/SinglePost.jsx'

const Single = () => {
  return (
    <div className='single'>
      <SinglePost/>
      <SideBar/>
    </div>
  )
}

export default Single
