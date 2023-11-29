import React, { useState } from "react";
import styles from "../../Styles/Product.module.css";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import { RingLoader } from "react-spinners";

const FileUpload = ({ values, setValues }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const allUploadedFiles = values.images || [];
  const [loading, setLoading] = useState(false);

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:8080/api/removeimage`,
        { public_id: id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        },
      )
      .then((res) => {
        const { images } = values;
        const filteredImages = images.filter((img) => img.public_id !== id);
        setValues({ ...values, images: filteredImages });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const fileUploadAndResize = (e) => {
    setLoading(true);

    const files = e.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log("Image URI", uri);
            axios
              .post(
                `http://localhost:8080/api/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user.token,
                  },
                },
              )
              .then((res) => {
                console.log(res.data);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              });
          },
          "base64",
        );
      }
    }
  };

  return (
    <>
      <h4 className={styles.productsSubHeading}>Upload Image</h4>
      <div className={styles.uploadContainer}>
        <label htmlFor="fileInput" className={styles.uploadLabel}>
          {loading ? <RingLoader color="#36D7B7" size={20} /> : "Choose Image"}
        </label>
        <input
          type="file"
          id="fileInput"
          multiple
          accept="image/*"
          onChange={fileUploadAndResize}
          className={styles.imageUploadInput}
        />
      </div>
      <div>
        {values.images &&
          values.images.map((img) => {
            return (
              <Badge
                count="X"
                style={{ marginTop: 20, marginRight: 10, cursor: "pointer" }}
                key={img.public_id}
                onClick={() => handleImageRemove(img.public_id)}
              >
                <Avatar
                  src={img.url}
                  size={100}
                  style={{ margin: 20 }}
                  shape="square"
                />
              </Badge>
            );
          })}
      </div>
    </>
  );
};

export default FileUpload;
