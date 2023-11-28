const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const endpoint = process.env.REACT_APP_OPENAI_ENDPOINT;

const generateImage = async () => {
    
    const prompt = 'Write a description for the image:'; // El texto que desencadena la generación de la imagen
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        // Agrega más parámetros según la documentación de OpenAI, como temperatura, max_tokens, etc.
      }),
    };
  
    try {
      const response = await fetch(`${endpoint}/v1/engines/davinci/images`, requestOptions);
  
      if (!response.ok) {
        throw new Error('Error al generar la imagen');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al generar la imagen:', error);
      return false;
    }
  };
  
  export default generateImage;

  export const isConfiguredGeneration = () => {
    return apiKey && endpoint;
  };