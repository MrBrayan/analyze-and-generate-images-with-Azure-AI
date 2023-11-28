import React, { useState, useEffect } from 'react';
import isConfiguredAnalysis from './azure-image-analysis';
import AnalyzeImage from './azure-image-analysis'; // Importa la función de análisis de imagen
import generateImage from './azure-image-generation'; // Importa la función de generación de imagen
import  isConfiguredGeneration  from './azure-image-generation';

function DisplayAnalysisResults({ analysisResult, imageUrl }) {
  if (!analysisResult) {
    return null;
  }

  return (
    <div>
      <h2>Resultado del Análisis:</h2>
      <p>URL de la imagen analizada: {imageUrl}</p>
      <h3>Descripción:</h3>
      <p>{analysisResult.description.captions[0].text}</p>
      <h3>Categorías:</h3>
      <ul>
        {analysisResult.categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingGeneration, setLoadingGeneration] = useState(false);
  const [isAzureConfigured, setIsAzureConfigured] = useState(false);
  const [isOpenAIConfigured, setIsOpenAIConfigured] = useState(false);

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = () => {
    setIsAzureConfigured(isConfiguredAnalysis());
    setIsOpenAIConfigured(isConfiguredGeneration());
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleImageAnalysis = async () => {
    setLoadingAnalysis(true);
    const result = await AnalyzeImage(imageUrl);
    setAnalysisResult(result);
    setLoadingAnalysis(false);
  };

  const handleImageGeneration = async () => {
    setLoadingGeneration(true);
    const result = await generateImage();
    setGeneratedImage(result);
    setLoadingGeneration(false);
  };

  if (isAzureConfigured || isOpenAIConfigured) {
    return (
      <div>
        <h1>Analizador y Generador de Imágenes</h1>
        <p style={{ color: 'red' }}>La aplicación no está configurada correctamente. Verifica las credenciales de Azure AI y OpenAI.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Analizador y Generador de Imágenes</h1>
      {/* Resto de la interfaz de usuario */}
      <input
        type="text"
        placeholder="Ingrese la URL de la imagen"
        value={imageUrl}
        onChange={handleImageUrlChange}
      />
      <br />
      <button onClick={handleImageAnalysis} disabled={loadingAnalysis}>
        {loadingAnalysis ? 'Analizando...' : 'Analizar'}
      </button>
      {loadingAnalysis && <p>Procesando la imagen...</p>}
      <DisplayAnalysisResults analysisResult={analysisResult} imageUrl={imageUrl} />

      {/* Generación de Imágenes */}
      <br />
      <button onClick={handleImageGeneration} disabled={loadingGeneration}>
        {loadingGeneration ? 'Generando...' : 'Generar'}
      </button>
      {loadingGeneration && <p>Generando la imagen...</p>}
      {generatedImage && (
        <div>
          <h2>Imagen Generada:</h2>
          <img src={generatedImage.url} alt="Imagen generada" />
        </div>
      )}
    </div>
  );
}

export default App;