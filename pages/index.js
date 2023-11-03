import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokeData, setPokeData] = useState(null);

  //aqui va javascript
  const getFieldValue = (e) => {
    let value = e.target.value;
    setPokemon(value);
    console.log("value", value);
  };

  const submitPokemon = async () => {
    console.log("ayyyyy me pico el boton, el pokemon es", pokemon);
    const url = "/api/damepokemon";
    //peticion al backend con axios y un post
    try {
      setPokeData(null);
      const reponse = await axios.post(url, { pokemon });
      setPokeData(reponse.data);
      console.log("respuesta desde el front", reponse.data);
      toast.success("Pokemon encontrado");
    } catch (error) {
      console.log("error desde el front", error);
      toast.error("Ocurrio un error");
    }
  };

  return (
    // aqui va html
    <>
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <Toaster />
        <div className="title">
          <h1 className="text-4xl">PokeAPI</h1>
          <p className="text-2xl">¿Cual es el pokemon que quieres que te de?</p>
          <div className="form flex flex-col my-4">
            <input
              type="text"
              className="text-black h-8"
              onChange={(e) => getFieldValue(e)}
            />
            <button
              className="bg-red-400 rounded-xl my-4 px-2 py-4 font-bold text-4xl"
              onClick={() => submitPokemon()}
            >
              DAMELO
            </button>

            {pokeData && (
              <div>
                <p>Respuesta: </p>
                <img src={pokeData.spriteDefault} />
                <p>Nombre: {pokeData.name}</p>
                <p>Order: {pokeData.order}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
