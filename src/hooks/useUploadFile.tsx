import axios from 'axios';
import { useAppSelector } from './useAppSelector';
import { useState } from 'react';

export const useUploadFile = ():[uploadFunction:(event: React.ChangeEvent<HTMLInputElement>,folder:string) => void,files:string] => {
  const token = useAppSelector(state => state.auth.accessToken);
  const [files, seFiles] = useState<string>('');
  const uploadFunction = async (event: React.ChangeEvent<HTMLInputElement>, folder: string) => {
    try {
      const formData = new FormData();
      const file = event.target.files![0];
      formData.append('media', file);
      const { data: uploadsFile } = await axios.post('http://localhost:4200/api/media/', formData, {
        params: {
          folder: folder,
        },
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      seFiles(uploadsFile.name);
    } catch (e) {
      console.log(e);
    }
  };
  return [uploadFunction, files]
};
