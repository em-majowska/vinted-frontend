import { FaCheck } from "react-icons/fa6";
import "./Publish.css";
import { IoAddOutline, IoShirtOutline } from "react-icons/io5";
import InputText from "../../components/InputText";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Publish = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const localUrl = import.meta.env.VITE_LOCAL_URL;

  const token = Cookies.get("userToken");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [picture, setPicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState([]);

  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("city", city);
    formData.append("price", price);

    for (let i = 0; i < picture.length; i++) {
      formData.append("picture", picture[i]);
    }

    try {
      const response = await axios.post(localUrl + "/offer/publish", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setIsSuccess(response.data);
    } catch (error) {
      error.message && console.log(error.message);
      error.response && console.log(error.response.data);
    }
  };

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  return !token ? (
    <Navigate to="/login" state={{ from: "/publish" }} />
  ) : (
    <main className="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        {isSuccess ? (
          <p className="success">Ton article a été ajouté !</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <section>
              <div className="file-wrapper">
                {previewPicture && (
                  <div className="previews">
                    {previewPicture.map((pic, index) => {
                      return (
                        <img key={index} src={pic} alt="" className="preview" />
                      );
                    })}
                  </div>
                )}
                <label htmlFor="picture" className="file">
                  <IoAddOutline /> Ajoute une photo
                  <input
                    type="file"
                    name="picture"
                    id="picture"
                    onChange={(event) => {
                      // prevent adding more than 5 pictures
                      if (
                        previewPicture.length + event.target.files.length >
                        5
                      ) {
                        event.preventDefault();
                        alert("Tu peux ajouter 5 images au  maximum.");
                        return;
                      }
                      Object.values(event.target.files).forEach((pic) => {
                        const objectUrl = URL.createObjectURL(pic);
                        setPreviewPicture((prev) => [...prev, objectUrl]);
                      });

                      setPicture(event.target.files);
                    }}
                    multiple
                  />
                </label>
              </div>
              <p className="tip">
                <IoShirtOutline />
                Attirez l'attention des acheteurs - ajoutez des photos de haute
                qualité.
              </p>
            </section>
            <section className="title-desc">
              <InputText
                title="title"
                content="Titre"
                placeholder="ex: Chemise Sézane verte"
                value={title}
                maxlength="100"
                required={true}
                onChange={(event) => {
                  handleChange(event, setTitle);
                }}
              />
              <InputText
                title="description"
                content="Décris ton article"
                placeholder="ex: porté quelquefois, taille correctement"
                value={description}
                maxlength="500"
                required={true}
                onChange={(event) => {
                  handleChange(event, setDescription);
                }}
              />
            </section>
            <section className="details">
              <InputText
                title="brand"
                content="Marque"
                placeholder="ex: Zara"
                required={true}
                value={brand}
                onChange={(event) => {
                  handleChange(event, setBrand);
                }}
              />

              <InputText
                title="size"
                content="Taille"
                placeholder="ex: L / 40 / 12"
                value={size}
                onChange={(event) => {
                  handleChange(event, setSize);
                }}
              />

              <InputText
                title="color"
                content="Couleur"
                placeholder="ex: Fushia"
                required={true}
                value={color}
                onChange={(event) => {
                  handleChange(event, setColor);
                }}
              />

              <InputText
                title="condition"
                content="État"
                placeholder="ex: Neuf avec étiquette"
                required={true}
                value={condition}
                onChange={(event) => {
                  handleChange(event, setCondition);
                }}
              />
              <InputText
                title="city"
                content="Lieu"
                placeholder="ex: Paris"
                required={true}
                value={city}
                onChange={(event) => {
                  handleChange(event, setCity);
                }}
              />
            </section>
            <section className="price">
              <label htmlFor="price">
                <span>Prix</span>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0,00 €"
                  value={price}
                  required={true}
                  onChange={(event) => {
                    handleChange(event, setPrice);
                  }}
                />
              </label>
              <label htmlFor="forExchange">
                <input type="checkbox" name="forExchange" id="forExchange" />
                <p>
                  <span className="checkbox">
                    <FaCheck />
                  </span>{" "}
                  Je suis intéressé(e) par les échanges
                </p>
              </label>
            </section>

            <button className="btn-filled">Ajouter</button>
          </form>
        )}
      </div>
    </main>
  );
};

export default Publish;
