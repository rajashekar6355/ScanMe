import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hambermenuoptions.css'

const Hambermenuoptions = ({setopt}) => {
    const navigate = useNavigate();
    const handleHome = ()=>{
        navigate('/');
    }
    const handlPallet = ()=>{
        navigate('/added-items');
    }
  return (
    <>
    <div className="hamber-menu-options">

    <p onClick={handleHome}>Home</p>
    <p onClick={handlPallet}>Go to Pallet</p>
    <button className='hamber-menu-button-option' onClick={() => setopt(false)}>close</button>
    </div>
    </>
  )
}

export default Hambermenuoptions    