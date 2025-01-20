// import { useEffect, useState, useContext } from "react";
// import axiosInstance from "../../api/axios";
// import { Context } from "../../auth/context";
// import "./write.css";

// const Write = () => {
//   const [formData, setFormData] = useState({
//     Title: "",
//     Description: "",
//     UserName: "",
//     Category: "Life Experiance"
//   });
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { user } = useContext(Context);

//   useEffect(() => {
//     if (user?.data?.user?.userName) {
//       setFormData(prev => ({
//         ...prev,
//         UserName: user.data.user.userName
//       }));
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       const selectedFile = files[0];
//       if (selectedFile) {
//         if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
//           setErrors(prev => ({
//             ...prev,
//             Image: "File size should be less than 5MB"
//           }));
//           return;
//         }
//         setFile(selectedFile);
//         setImagePreview(URL.createObjectURL(selectedFile));
//       }
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value
//       }));
//     }
//     setErrors(prev => ({
//       ...prev,
//       [name]: undefined
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.Title?.trim()) {
//       newErrors.Title = "The Title field is required";
//     }
//     if (!formData.Description?.trim()) {
//       newErrors.Description = "The Description field is required";
//     }
//     if (!formData.UserName) {
//       newErrors.UserName = "The UserName field is required";
//     }
//     if (!file) {
//       newErrors.Image = "The Image field is required";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       // Create FormData object
//       const formDataToSend = new FormData();
//       formDataToSend.append('Title', formData.Title);
//       formDataToSend.append('Description', formData.Description);
//       formDataToSend.append('UserName', formData.UserName);
//       formDataToSend.append('Category', formData.Category);
//       if (file) {
//         formDataToSend.append('Image', file);
//       }

//       // Log FormData contents for debugging
//       for (let pair of formDataToSend.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//       }

//       const response = await axiosInstance.post("/api/Post", formDataToSend, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log("Post created successfully:", response.data);
//       window.location.replace(`/post/${response.data.data.postId}`);
//     } catch (error) {
//       console.error("Error creating post:", error.response?.data || error);
//       const backendErrors = error.response?.data?.errors;
//       if (backendErrors) {
//         setErrors(backendErrors);
//       } else {
//         setErrors(prev => ({
//           ...prev,
//           submit: "Failed to create post. Please try again."
//         }));
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     // Cleanup image preview URL when component unmounts or when file changes
//     return () => {
//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }
//     };
//   }, [imagePreview]);

//   return (
//     <div className="write">
//       {imagePreview && (
//         <img
//           className="writeImg"
//           src={imagePreview}
//           alt="Preview"
//         />
//       )}
//       <form className="writeForm" onSubmit={handleSubmit}>
//         <div className="writeFormGroup">
//           <label htmlFor="fileInput">
//             <i className="writeIcon fa-solid fa-plus"></i>
//           </label>
//           <input
//             type="file"
//             id="fileInput"
//             name="Image"
//             accept="image/*"
//             className="writeInput"
//             style={{ display: "none" }}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.Image && <p className="error">{errors.Image}</p>}
//           <input
//             type="text"
//             name="Title"
//             placeholder="Title"
//             className="writeInput"
//             value={formData.Title}
//             onChange={handleInputChange}
//             required
//             autoFocus
//           />
//           {errors.Title && <p className="error">{errors.Title}</p>}
//         </div>
//         <div className="writeFormGroup">
//           <textarea
//             name="Description"
//             placeholder="Tell Your Story..."
//             className="writeText writeInput"
//             value={formData.Description}
//             onChange={handleInputChange}
//             required
//           />
//           {errors.Description && <p className="error">{errors.Description}</p>}
//         </div>
//         <button
//           className="writeSubmit"
//           type="submit"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Publishing..." : "Publish"}
//         </button>
//         {errors.submit && <p className="error">{errors.submit}</p>}
//         {errors.UserName && <p className="error">{errors.UserName}</p>}
//       </form>
//     </div>
//   );
// };

// export default Write;

import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Context } from "../../auth/context";
import "./write.css";

const Write = () => {
  const navigate = useNavigate();
  const { user } = useContext(Context); // Get user context
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Category: "Life Experience", // Fixed typo in category
  });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect to ensure user is authenticated
  useEffect(() => {
    if (!user?.token || !user?.data?.user?.email) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const selectedFile = files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          Image: "File size should be less than 5MB",
        }));
        return;
      }
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Title.trim()) newErrors.Title = "Title is required";
    if (!formData.Description.trim())
      newErrors.Description = "Description is required";
    if (!file) newErrors.Image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const postData = new FormData();
      postData.append("Title", formData.Title);
      postData.append("Description", formData.Description);
      postData.append("Category", formData.Category);
      postData.append("UserName", user.data.user.userName); // User email from context
      if (file) postData.append("Image", file);

      const response = await axiosInstance.post("/api/Post", postData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/post/${response.data.data.postId}`);
    } catch (error) {
      console.error("Error creating post:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to create post. Please try again.",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const currentUserEmail = user?.data?.user?.email;

  return (
    <div className="write">
      {imagePreview && (
        <img className="writeImg" src={imagePreview} alt="Preview" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="Image"
            accept="image/*"
            className="writeInput"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
          {errors.Image && <p className="error">{errors.Image}</p>}
          <input
            type="text"
            name="Title"
            placeholder="Title"
            className="writeInput"
            value={formData.Title}
            onChange={handleInputChange}
            autoFocus
          />
          {errors.Title && <p className="error">{errors.Title}</p>}
        </div>
        <div className="writeFormGroup">
          <textarea
            name="Description"
            placeholder="Tell Your Story..."
            className="writeText writeInput"
            value={formData.Description}
            onChange={handleInputChange}
          />
          {errors.Description && <p className="error">{errors.Description}</p>}
        </div>
        <div className="writeFormGroup">
          <p className="currentUser">
            Posting as: {currentUserEmail || "Not logged in"}
          </p>
        </div>
        <button
          className="writeSubmit"
          type="submit"
          disabled={isSubmitting || !currentUserEmail}
        >
          {isSubmitting ? "Publishing..." : "Publish"}
        </button>
        {errors.submit && <p className="error">{errors.submit}</p>}
      </form>
    </div>
  );
};

export default Write;
