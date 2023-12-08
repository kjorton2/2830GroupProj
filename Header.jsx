import React from 'react'
import PropTypes from 'prop-types'

function Header({text, bgColor, textColor}) {
    const headStyle = {
        backgroundColor:bgColor, color:textColor
    }
  return (
    <header>
        <a href='/'>Register</a>
        <a href='login'>Login</a>
        <a href='flashcard'>Flashcard</a>
    </header>
  )
}

Header.defaultProps = {
    text: 'Hello from Header',
    bgColor: 'rgb(0,0,0,0.4)',
    textColor: 'pink'
}

Header.propTypes = {
    text: PropTypes.string,
}

export default Header