import React from 'react';
import HomeCarousel from '../homeCarousel';
import { useCookies } from 'react-cookie';

// db.json에 사진 등록
// 1. 로컬 환경에 등록
// >> public 폴더 - images 폴더 생성하여 이미지 저장

// 2. 외부 스토리지 서비스 사용
// : 외부에서 이미지를 저장하고, 해당 이미지에 접근할 수 있는 URL을 받아 데이터베이스에 저장
// >> 전체 프로젝트 공유 시 사용
// AWS S3, Cloud 서비스에 등록



export default function index() {
  // Todo: 홈 화면 - 회원 유무에 따른 로직 시 사용
  const cookie = useCookies();
  
  return (
    <>
      <HomeCarousel />
    </>
  );
}
