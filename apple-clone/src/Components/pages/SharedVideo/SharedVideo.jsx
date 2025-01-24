import React from 'react'
import { Outlet } from 'react-router-dom'
import YouTube from '../../Youtube/YouTube'

function SharedVideo() {
  return (
    <>
      <Outlet/>
      <YouTube/>

    </>
  )
}

export default SharedVideo
