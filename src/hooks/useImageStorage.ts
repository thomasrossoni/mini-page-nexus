
import { useState, useEffect } from 'react';

interface StoredImage {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
  size: number;
}

export const useImageStorage = () => {
  const [images, setImages] = useState<StoredImage[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('uploadedImages');
    if (stored) {
      try {
        const parsedImages = JSON.parse(stored).map((img: any) => ({
          ...img,
          uploadedAt: new Date(img.uploadedAt)
        }));
        setImages(parsedImages);
      } catch (error) {
        console.error('Error loading stored images:', error);
      }
    }
  }, []);

  const saveImage = (file: File, dataUrl: string): StoredImage => {
    const newImage: StoredImage = {
      id: Date.now().toString(),
      name: file.name,
      url: dataUrl,
      uploadedAt: new Date(),
      size: file.size
    };

    const updatedImages = [newImage, ...images];
    setImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
    
    return newImage;
  };

  const deleteImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
  };

  const getImageById = (id: string) => {
    return images.find(img => img.id === id);
  };

  return {
    images,
    saveImage,
    deleteImage,
    getImageById
  };
};
