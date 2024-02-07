import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

type Image = {
  id: number;
  url: string;
};

export default function index() {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images: ', error);
      }
    };

    fetchImages();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setUrl(url);
    }
  };

  // 선택된 파일 정보 표시(선택)
  const fileInfo = selectedFile ? (
    <p>File name: {selectedFile.name}</p>
  ) : (
    <p>No file selected</p>
  );

  // Todo: 구현 작업 이전 (동작 X)
  const imgRegisterHandle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Image = reader.result as string;

        axios
          .post('http://localhost:5000/images', {
            id: Date.now(),
            image: base64Image
          })
          .then((response) => {
            console.log('성공', response);
          })
          .catch((error) => {
            console.log('에러', error);
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 30,
        mx: 'auto',
        width: '100%',
        maxWidth: '500px'
      }}
    >
      <Carousel sx={{ width: 500, height: 500}}>
        {images.map((item) => (
          <Paper
            key={item.id}
            sx={{
              width: 500,
              height: 300,
              borderRadius: 10
            }}
          >
            <img src={item.url} alt={item.url} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
          </Paper>
        ))}
      </Carousel>
      {url ? <img src={url} alt='이미지 미리보기' /> : null}
      <form className='photo-form'>
        <input
          type='file'
          className='photo-file'
          name='file'
          onChange={handleFileChange}
        />
        {/* <button onClick={imgRegisterHandle}>이미지 등록</button> */}
      </form>
      {fileInfo}
    </Box>
  );
}
