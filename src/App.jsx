
import { useState } from 'react'
import './App.css'
import Form from './componat/Form/Form';
import PackingList from './componat/PackingList/PackingList';
import Usercontext from './Context/Usercontext';

function App() {

  return (
    <>

        <Usercontext> 
          <Form />
          <PackingList />
        </Usercontext>

    </>
  )
}

export default App
