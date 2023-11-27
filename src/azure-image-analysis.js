const analyzeImage = async (imageUrl) => {
    const subscriptionKey = 'TU_CLAVE_DE_SUSCRIPCIÓN'; // Reemplaza con tu clave de suscripción de Azure
    const endpoint = 'TU_ENDPOINT'; // Reemplaza con tu endpoint de Azure
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': subscriptionKey,
      },
      body: JSON.stringify({
        url: imageUrl,
        visualFeatures: ['Categories', 'Description', 'Color'], // Personaliza las características aquí
      }),
    };
  
    try {
      const response = await fetch(`${endpoint}/vision/v3.0/analyze?visualFeatures=${requestOptions.body.visualFeatures.join(',')}`, requestOptions);
      
      if (!response.ok) {
        throw new Error('Error al analizar la imagen');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al analizar la imagen:', error);
      return null;
    }
  };
  
  export default analyzeImage;