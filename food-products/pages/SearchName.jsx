import React, { useState } from 'react'
import SortingBox from '../components/SortingBox';
import NavBar2 from '../components/NavBar2';
import FashionCard from '../components/FashionCard';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Cart from '../pages/Cart';


const SearchName = () => {

  const [ascName, setAscName] = useState(false);
  const [descName, setDescName] = useState(false);
  const [ascGrade, setAscGrade] = useState(false);
  const [descGrade, setDescGrade] = useState(false);


  return (

    <div className='bg-white'>
      <Header />
      <NavBar2 />
      <Cart/>
      <SideBar />
      <div className='h-[110px] w-full'></div>
      <SortingBox setAscName={setAscName} setDescName={setDescName} setAscGrade={setAscGrade} setDescGrade={setDescGrade} />
      <FashionCard ascName={ascName} descName={descName} ascGrade={ascGrade} descGrade={descGrade} />
    </div>
  )

}

export default SearchName
