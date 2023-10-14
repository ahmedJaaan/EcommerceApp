import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../APIs/auth";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import "../../Styles/Update.css";
import { RingLoader } from "react-spinners";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = await updateUser({ name: newName }, user.token);
      console.log(updatedUser);
      dispatch({
        type: "LOGGED_IN_USER",
        payload: updatedUser,
      });
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePicture = (e) => {
    const file = e.target.files[0];
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        axios
          .post(
            "http://localhost:8080/api/uploadavatar",
            { image: uri },
            {
              headers: {
                authtoken: user ? user.token : "",
              },
            }
          )
          .then((res) => {
            const updatedUser = {
              ...user,
              picture: res.data,
            };
            dispatch({
              type: "LOGGED_IN_USER",
              payload: updatedUser,
            });
            window.location.reload();
          })
          .catch((err) => {
            console.log("Error uploading avatar", err);
          });
      },
      "base64"
    );
  };

  return (
    <div className="update-profile-container">
      <div className="profile-picture-container">
        <img src={user.picture} alt={user.name} className="profile-picture" />
      </div>
      <label className="profile-picture-label">
        {loading ? (
          <RingLoader color="white" size={20} className="inherit" />
        ) : (
          "Update Profile Picture"
        )}
        <input
          type="file"
          onChange={handlePicture}
          accept="image/*"
          style={{ display: "none" }}
        />
      </label>
      <input
        type="text"
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="name-input"
      />
      <button type="submit" onClick={handleUpdate} className="update-button">
        {loading ? (
          <RingLoader color="white" size={20} className="inherit" />
        ) : (
          "Update Name"
        )}
      </button>
    </div>
  );
};

export default UpdateProfile;
