import React from 'react'

function Button({submit,title='submit',style}) {
  return (
    <button onClick={submit} className={`rounded-[400px] w-3/4 py-2 ${style}`} type='submit'>
        {title}
    </button>
  )
}

export default Button