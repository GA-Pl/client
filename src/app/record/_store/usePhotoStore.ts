import { create } from 'zustand';

interface ImageWithPreview {
  id: string;
  name: string;
  preview: string;
  size: number;
  type: string;
  file: File;
}

interface PhotoStoreState {
  photos: ImageWithPreview[];
  addPhotos: (newPhotos: ImageWithPreview[]) => void;
  removePhoto: (id: string) => void;
  setPhotos: (newPhotos: ImageWithPreview[]) => void;
  reset: () => void;
}

export const usePhotoStore = create<PhotoStoreState>((set) => ({
  photos: [],
  addPhotos: (newPhotos) =>
    set((state) => ({ photos: [...state.photos, ...newPhotos] })),
  removePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id),
    })),
  setPhotos: (newPhotos) =>
    set(() => ({
      photos: newPhotos,
    })),
  reset: () => set({ photos: [] }),
}));
