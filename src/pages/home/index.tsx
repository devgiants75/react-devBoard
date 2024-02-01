import React, { ChangeEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import UserProfile from '../MyPage/userProfile';
import axios from 'axios';
import { ImageList, ImageListItem } from '@mui/material';

// db.json에 사진 등록
// 1. 로컬 환경에 등록
// >> public 폴더 - images 폴더 생성하여 이미지 저장

// 2. 외부 스토리지 서비스 사용
// : 외부에서 이미지를 저장하고, 해당 이미지에 접근할 수 있는 URL을 받아 데이터베이스에 저장
// >> 전체 프로젝트 공유 시 사용
// AWS S3, Cloud 서비스에 등록

type Image = {
  id: number;
  url: string;
};

export default function index() {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const cookies = useCookies();

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
    <div>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
              alt={item.url}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>

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

      <UserProfile />
    </div>
  );
}
