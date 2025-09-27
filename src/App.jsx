import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const passwordRef = useRef(null);
  const [password, setPassword] = useState("")
  const [length, setLength] = useState("8")
  const [isNumber, setNumber] = useState(false)
  const [isCharacter, setCharacter] = useState(false)


  const generatePassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(isNumber) str += '0123456789'
    if(isCharacter) str += "!@#$%^&*-_+=[]{}~`"
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }
    setPassword(pass)

  },[length, isNumber, isCharacter, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current.select();
    
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generatePassword()
  }, [length, isNumber, isCharacter, generatePassword])

  return (
    <>
     
     <div className='w-full h-full px-3 py-2 bg-gray-700 max-w-md mx-auto rounded-lg my-5'>
      <h1 className='text-4xl text-amber-50 text-center mb-3'>Password Generator</h1>
     <div className='flex mb-4'>
       <input type="text"
      className='outline-none w-full py-2 px-3 text-black bg-white rounded-l-2xl'
      placeholder='Password'
      readOnly
      value={password}
      ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard}
      className='bg-blue-600 rounded-r-2xl px-2'
      >Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className="flex items-center gap-x-1">
        <input type="range" 
        className="cursor-pointer"
        min={6}
        max={100}
        value={length}
        onChange={(e) => setLength(e.target.value)}
        />
        <label>Length: {length}</label>
      </div>
       <div className='flex text-sm gap-x-1'>
      <input 
      type="checkbox"
      defaultChecked={isNumber}
      id='characterInput'
      onChange={() => {
        setNumber(prev => !prev)
      }}
      />
     </div>
     <label htmlFor="">Numbers</label>
       <div className='flex text-sm gap-x-1'>
      <input 
      type="checkbox"
      defaultChecked={isNumber}
      id='characterInput'
      onChange={() => {
        setCharacter(prev => !prev)
      }}
      />
     </div>
     <label htmlFor="">Characters</label>
     </div>
     
    
     </div>
    </>
  )
}

export default App
