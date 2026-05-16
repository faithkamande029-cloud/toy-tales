import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddToy({
      name,
      image,
      likes: 0,
    });

    setName("");
    setImage("");
  }

  return (
    <form className="add-toy-form" onSubmit={handleSubmit}>
      <input
        placeholder="Enter a toy's name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Enter a toy's image URL..."
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <button type="submit">Create New Toy</button>
    </form>
  );
}

export default ToyForm;