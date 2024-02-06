import React, { useState } from 'react'
import Input from '@components/input'
import Button from '@components/button/Button'


function Modal({value, close}) {
    const [data,setData] = useState('')

    function changeHandler(e){
        setData(prev => prev = e.target.value)
    }

    function submitHandler(){
        value(data)   
    }

  return (
    <div style={{backgroundColor:'rgba(28, 28, 45, 0.9)'}} className=' z-50 w-full h-screen absolute items-center flex justify-center inset-0 flex-col gap-2'>
        <button onClick={close} className=' absolute top-3 text-2xl font-bold right-5 text-white'>X</button>
        <h1 className=' text-white font-bold text-2xl'>Search</h1>
        <Input value={(e) => changeHandler(e)} on style=' mt-8 font-bold' placeHolder='Artist / Album / Title'/>
        <Button submit={submitHandler} title='Search' style={` text-white font-semibold bg-purple-500`} />
    </div>
  )
}

export default Modal