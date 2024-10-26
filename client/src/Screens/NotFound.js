import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';

function NotFound() {
  return (
    <div className='flex-colo gap-6 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6 '>
      <img className='w-full h-96 object-contain' src="/images/404.png" alt='notfound'/>
      <h1 className='lg:text-4xl font-bold'>Page Not Found</h1>
      <p className='font-medium text-border italic leading-6'>
        The page you looking at doesn't fucking real GO BACK 
      </p>
      <Link to="/" className='bg-subMain transitions text-white flex-rows gap-4 font-medium py-3 hover:text-main px-6 rounded-md'>
        <BiHomeAlt/>  Go Back Fucker
      </Link>
    </div>
  )
}

export default NotFound