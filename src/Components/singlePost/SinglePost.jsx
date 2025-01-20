import './singlepost.css';
import { useContext } from 'react';
import { Context } from '../../auth/context';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axios';

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2]; // Post ID from URL
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const PF = 'https://blog.hamrosystem.com/PostImages/';

  const getImagePath = (photoPath) => {
    if (!photoPath) return '';
    return photoPath
      .replace(/\\/g, '/') 
      .replace('wwwroot/PostImages/', '')
      .replace('wwwroot/', '')
      .replace('PostImages/', '')
      .trim();
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axiosInstance.get('/api/Post/' + path);
        const postData = res.data.data;
        setPost(postData);
        setTitle(postData.title);
        setDescription(postData.description);

        console.log('Fetched post data:', postData);
        if (postData.photo) {
          console.log('Image URL:', PF + getImagePath(postData.photo));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/api/Post/${path}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      window.location.replace('/');
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      setUpdateError('');

      // Include all required fields from the schema
      const data = {
        postId: path, // Include the postId from the URL
        title,
        description,
        photo: post.photo || '',
        userName: post.userName || '',
        category: post.category || '' // Include category from existing post
      };

      console.log('Payload being sent to the server:', data);

      const response = await axiosInstance.put(`/api/Post/${path}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setUpdateMode(false);

        // Refresh post data
        const res = await axiosInstance.get('/api/Post/' + path);
        setPost(res.data.data);
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
      }
    } catch (err) {
      console.error('Error updating post:', err);
      console.error('Response data:', err.response?.data);

      setUpdateError('Failed to update post. Please check the input and try again.');

      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors)
          .flat()
          .join(', ');
        setUpdateError(errorMessages);
      }
    }
  };

  const handleCancel = () => {
    setUpdateMode(false);
    setTitle(post.title);
    setDescription(post.description);
    setUpdateError('');
  };

  return (
    <div className="singlepost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            className="singlepostImg"
            src={`${PF}${getImagePath(post.photo)}`}
            alt={post.title || 'Post image'}
            onError={(e) => {
              console.error('Image load error:', e);
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTittleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTittle">
            {post.title}
            {post.userName === user?.data?.user?.userName && (
              <div className="singlePostIcons">
                <i
                  className="editIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="deleteIcon fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlepostInfo">
          <span className="singlepostAuthor">
            Author:
            <Link to={`/?user=${post.userName}`} className="link">
              <b>{post.userName}</b>
            </Link>
          </span>
          <span className="singlepostDate">
            {post.createdAt ? new Date(post.createdAt).toDateString() : new Date().toDateString()}
          </span>
        </div>

        {updateMode ? (
          <>
            <textarea
              className="singlepostDescInput"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {updateError && <div className="updateError">{updateError}</div>}
            <div className="updateButtons">
              <button className="singlePostButton" onClick={handleUpdate}>
                Update
              </button>
              <button className="cancelButton" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <p className="singlepostDesc">{post.description}</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;