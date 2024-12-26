import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "FlexiHub");

  try {
    const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dk5trs6zr/image/upload",
        // import.meta.env.VITE_UPLOAD_LINK, 
        data);

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;