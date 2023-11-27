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
/*
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
*/
import React, { useState } from 'react';
//import ImageAnalyzer from './ImageAnalyzer'; // Importa el componente de análisis de imagen
import AnalyzeImage from './azure-image-analysis'; // Importa la función de análisis de imagen

function DisplayResults({ analysisResult, imageUrl }) {
  if (!analysisResult) {
    return null;
  }

  return (
    <div>
      <h2>Resultado del Análisis:</h2>
      <p>URL de la imagen procesada: {imageUrl}</p>
      <h3>Descripción:</h3>
      <p>{analysisResult.description.captions[0].text}</p>
      <h3>Categorías:</h3>
      <ul>
        {analysisResult.categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
      {/* Agrega más visualización de datos si es necesario */}
    </div>
  );
}

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageAnalysis = async () => {
    setLoading(true);
    const result = await AnalyzeImage(imageUrl);
    setAnalysisResult(result);
    setLoading(false);
    // Puedes manejar la respuesta del análisis aquí
  };

  return (
    <div>
      <h1>Analizador de Imágenes</h1>
      <input
        type="text"
        placeholder="Ingrese la URL de la imagen"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      <br />
      <button onClick={handleImageAnalysis} disabled={loading}>
        {loading ? 'Analizando...' : 'Analizar'}
      </button>
      {loading && <p>Procesando la imagen...</p>}
      <DisplayResults analysisResult={analysisResult} imageUrl={imageUrl} />
      <AnalyzeImage />
    </div>
  );
}

export default App;

