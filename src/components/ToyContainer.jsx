import React, { useEffect, useState } from "react";
import ToyCard from "./ToyCard";
import ToyForm from "./ToyForm";

function ToyContainer({ showForm }) {
  const [toys, setToys] = useState([]);

  // GET
  useEffect(() => {
    fetch("http://localhost:3000/toys")
      .then((res) => res.json())
      .then(setToys);
  }, []);

  // POST
  function addToy(newToy) {
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy),
    })
      .then((res) => res.json())
      .then((createdToy) => {
        setToys((prev) => [...prev, createdToy]);
      });
  }

  // DELETE
  function deleteToy(id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((prev) => prev.filter((toy) => toy.id !== id));
    });
  }

  // PATCH (likes)
  function updateLikes(toy) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((prev) =>
          prev.map((t) =>
            t.id === updatedToy.id ? updatedToy : t
          )
        );
      });
  }

  return (
    <div>
      {showForm && <ToyForm onAddToy={addToy} />}

      <div id="toy-collection">
        {toys.map((toy) => (
          <ToyCard
            key={toy.id}
            toy={toy}
            onDelete={deleteToy}
            onLike={updateLikes}
          />
        ))}
      </div>
    </div>
  );
}

export default ToyContainer;