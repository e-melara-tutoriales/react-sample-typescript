import React from "react";

const useImage = (fileName : string) => {
  const [image, setImage] = React.useState<string>('');
  const [error, setError] = React.useState<string | any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true)
        const response = await import(`../assets/img/${fileName}.jpg`);
        setImage(response.default);
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    };

    fetchImage()
  }, [fileName])

  return {
    image,
    error,
    loading,
  }
}

export default useImage;