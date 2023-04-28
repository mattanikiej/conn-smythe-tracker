import React from 'react'

import './Footer.css'

import logo from '../assets/right-facing-logo.svg'

function Footer() {
  return (
    <footer className='footer-container'>
        <p className='image-container'><a href="https://www.coolxpanda.com/"><img alt="Cool Panda Software logo" src={logo}/></a></p>
    </footer>
  )
}

export default Footer