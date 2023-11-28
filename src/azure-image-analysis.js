const subscriptionKey = process.env.REACT_APP_AZURE_SUBSCRIPTION_KEY;
  const endpoint = process.env.REACT_APP_AZURE_ENDPOINT;
const AnalyzeImage = async (imageUrl) => {
  
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
    body: JSON.stringify({
      url: imageUrl,
      visualFeatures: ['Categories', 'Description', 'Color'], // Verifica que se esté pasando correctamente visualFeatures
    }),
  };

  try {
    const response = await fetch(`${endpoint}/vision/v3.0/analyze`, requestOptions);

    if (!response.ok) {
      throw new Error('Error al analizar la imagen');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al analizar la imagen:', error);
    return false;
  }
};

export default AnalyzeImage;


export const isConfiguredAnalysis = () => {

  return subscriptionKey && endpoint;
};