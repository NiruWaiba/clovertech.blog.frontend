import './setting.css'
import SideBar from "../../Components/sidebar/SideBar"

const Setting = () => {
  return (
    <div className='settings'>
      <div className='settingsWrapper'> 
        <div className='settingTitle'>
          <span className='UpdateTitle'>Update Your Account</span>
          <span className='DeleteTitle'>Delete Account</span>
        </div>
        <form className='settingForm'>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img 
              src='./assests/image.avif' alt=''
            />
            <label htmlFor='fileInput'>
            <i className="settingPPIcon fa-solid fa-user"></i>
            </label>
            <input type='file' id='fileInput' style={{display:"none"}}/>
          </div>
          <label> Username </label>
          <input type='text' placeholder='Enter Your Username'/>
          <label>Email</label>
          <input type='email' placeholder='email'/>
          <label> Password </label>
          <input type='Password'/>
          <button className='settingUpdate'>Update</button>
        </form>
      </div>
      <SideBar/>
    </div>
  )
}

export default Setting
