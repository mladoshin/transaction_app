import React from 'react'
import styles from "../styles/FormWrapper.module.css"

function FormWrapper({children}) {
  return (
    <div className="wrapper">
        {children}
    </div>
  )
}

export default FormWrapper