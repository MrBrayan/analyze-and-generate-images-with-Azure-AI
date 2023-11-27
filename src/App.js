/*import React from 'react';

function App() {
  //const value = 'World';
  // return <H1>Hello {value}</h1>;
  return <div>
      <h1>Computer Vision</h1>

    </div>;
}

export default App;
*/
import React, { useState } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageAnalysis = () => {
    // Lógica para el análisis de imágenes con la URL proporcionada
    console.log('Análisis de imagen:', imageUrl);
    // Aquí puedes añadir la lógica para el análisis de la imagen
  };

  const handleImageGeneration = () => {
    // Lógica para la generación de imágenes con la URL proporcionada
    console.log('Generación de imagen:', imageUrl);
    // Aquí puedes añadir la lógica para la generación de imágenes
  };

  return (
    <div>
      <h1>Analizador y Generador de Imágenes</h1>
      <p>Insert URL or type prompt:</p>
      <input
        type="text"
        placeholder="Ingrese la URL de la imagen"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      <br />
      <button onClick={handleImageAnalysis}>Analizar Imagen</button>
      <button onClick={handleImageGeneration}>Generar Imagen</button>
      <hr />
    </div>
  );
}

export default App;