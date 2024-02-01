import React from 'react'
import { useCookies } from 'react-cookie'
import UserProfile from '../MyPage/userProfile';

export default function index() {
  const cookies = useCookies();

  return (
    <div>
      홈화면
      <UserProfile/>
    </div>
  )
}
