import { useState } from "react";

export default function AdminAddProduct() {
  const [productName, setProductName] = useState("");
  const [variation, setVariation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  return (
    <div className="addproduct-wrapper">
      <div className="addproduct-card">
        <h2 className="addproduct-title">ADD PRODUCT</h2>

        <div className="addproduct-grid">
          <div className="input-group">
            <label>PRODUCT NAME</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
          </div>

          <div className="input-group">
            <label>VARIATION</label>
            <input type="text" value={variation} onChange={(e) => setVariation(e.target.value)} />
          </div>

          <div className="input-group">
            <label>PRICE</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div className="input-group">
            <label>DESCRIPTION</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
        </div>

        <div className="upload-group">
            <label className="upload-label">PRODUCT IMAGE</label>

            <div className="custom-file-upload">
                <span>{image ? image.name : "Choose an image…"}</span>
                <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])} 
                />
            </div>
        </div>


        <button className="addproduct-btn" onClick={handleAddProduct}>ADD PRODUCT</button>
      </div>
    </div>
  );

  // Function to submit data to Laravel
  function handleAddProduct() {
  const formData = new FormData();
  formData.append("name", productName);
  formData.append("variation", variation);
  formData.append("price", price);
  formData.append("description", description);
  if (image) formData.append("image", image);

    fetch("http://your-laravel-api.test/api/products", {
        method: "POST",
        headers: {
        Accept: "application/json",
        },
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
        console.log("Product added:", data);

        // Reset
        setProductName("");
        setVariation("");
        setPrice("");
        setDescription("");
        setImage(null);

        alert("Product added successfully!");
        })
        .catch((err) => console.error(err));
    }

}
