import React from 'react';
import Layout from './../Layout/Layout';
import Head from '../Components/Head';

function AboutUs() {
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <Head title="About Us"/>
        <div className='xl:py-20 py-10 px-4'>
          <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center'>
            <div>
              <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
                Welcome to my domain
              </h3>
              <div className='mt-3 text-sm leading-8 text-text'>
              <p>Nothing to see here FUCK OFF</p>
              </div>
              <div className='grid md:grid-cols-2 gap-6 mt-8'>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold mt-4'>
                    5
                  </span>
                  <h4 className='text-lg font-semibold mb-1'>Listed Movie</h4>
                </div>
                <div className='p-8 bg-dry rounded-lg'>
                  <span className='text-3xl block font-extrabold mt-4'>
                    1
                  </span>
                  <h4 className='text-lg font-semibold mb-1'>Nolife User</h4>
                </div>
              </div>
            </div>
            <div className='mt-10 lg:mt-0'>
              <img src="/images/about2.png" alt="aboutus" className='w-full xl:block hidden h-header rounded-lg object-cover'/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AboutUs