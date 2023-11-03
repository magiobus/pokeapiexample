import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [prompt, setPrompt] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  //aqui va javascript
  const getFieldValue = (e) => {
    let value = e.target.value;
    setPrompt(value);
  };

  const submitPrompt = async () => {
    console.log("ayyyyy me pico el boton, el prompt es", prompt);
    const url = "/api/dibujamiprompt";
    setLoading(true);
    try {
      const response = await axios.post(url, { prompt });
      console.log("respuesta desde el front", response.data);
      setImageUrl(response.data.imageUrl);
      toast.success("Imagen Dibujada");
    } catch (error) {
      console.log("error desde el front", error);
      toast.error("Ocurrio un error");
    }
    setLoading(false);
  };

  return (
    // aqui va html
    <>
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <Toaster />
        <div className="title">
          <h1 className="text-4xl">Soy El artista</h1>
          <p className="text-2xl">¿Que quieres que te dibuje?</p>
          {!loading ? (
            <div className="form flex flex-col my-4">
              <input
                type="text"
                className="text-black h-8"
                onChange={(e) => getFieldValue(e)}
              />
              <button
                className="bg-red-400 rounded-xl my-4 px-2 py-4 font-bold text-4xl"
                onClick={() => submitPrompt()}
              >
                Dibujamelo
              </button>

              {imageUrl && (
                <div className="w-96 h-96">
                  <img src={imageUrl} />
                </div>
              )}
            </div>
          ) : (
            <p>Cargando....</p>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
