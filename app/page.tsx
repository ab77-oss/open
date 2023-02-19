import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen w-screen">
    <main className='max-w-screen-2xl m-auto bg-white'>
      {/* NavBar */}
        <nav className='bg-white p-2 flex justify-between'>
          <a href='' className='font-bold text-gray-700 text-2xl'>
            OpenTable
          </a>
          <div className='flex'>
            <button className='bg-blue-400 text-white border rounded mr-2 p-1 px-4'>Sign In</button>
            <button className='border p-2 rounded '>Sign Out</button>
          </div>
        </nav>
        {/* Header */}
        <div className='h-96 overflow-hidden'>
          <div className='bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center'>
            <h1 className='text-7xl text-white capitalize text-shadow text-center'>
            Leawood (Toranto)
            </h1>
          </div>
        </div>
        {/* Header */}
        {/* Description Portion */}
        <div className='flex m-auto w-2/3 justify-between items-start 0 -mt-11'>
          <div className='bg-white w-[70%] rounded p-3 shadow'>
            {/* Restaurant NavBar */}
            <nav className='flex text-reg border-b pb-2'>
              <a href="" className='mr-7'>
                Overview
              </a>
              <a href="" className='mr-7'>
                Menu
              </a>
            </nav>
            {/* Restaurant NavBar */}
            {/* Title */}
            <div className='mt-4 border-b pb-6'>
              <h1 className='font-bold text-6xl'>Milesstone Grill</h1>
            </div>
            {/* Title */}
            {/* Rating*/}
            <div className='flex items-end'>
              <div className='ratings mt-2 flex items-center'>
                <p>*****</p>
                <p className='text-reg ml-4'>600 Reviews</p>
              </div>
            </div>
            {/* Rating */}
            {/* Description */}
            <div className='mt-4'>
              <p className='text-lg font-light'>
              Award wining upscale Italian Restaurant from local Restaurateur Christian Joseph. Hand made pasta and bread are the stand out in this very chic and hip atmosphere. Voted diners choice by OpenTable, with awards from Wine Spectator, Societe Mondiale du Vin, and the Confrérie de la Chaîne des Rôtisseurs. Plate Italiano Moderno anchors the upscale Leawood shopping district Park Place.
              </p>
            </div>
            {/* Description */}
            {/* Images */}
              <h1 className='font-bold text-3xl mt-10 mb-7 border-b pb-5'>
                7 photos
              </h1>
              <div className='flex flex-wrap'>
                <img src="https://resizer.otstatic.com/v2/photos/xlarge/3/48845797.jpg" alt="" className='w-56 h44 mr-1 mb-1' />
                <img src="https://resizer.otstatic.com/v2/photos/xlarge/2/48845803.jpg" alt="" className='w-56 h44 mr-1 mb-1' />
                <img src="https://resizer.otstatic.com/v2/photos/xlarge/2/48845805.jpg" alt="" className='w-56 h44 mr-1 mb-1' />
                <img src="https://resizer.otstatic.com/v2/photos/xlarge/2/48845804.jpg" alt="" className='w-56 h44 mr-1 mb-1' />
                <img src="https://resizer.otstatic.com/v2/photos/xlarge/2/47493546.jpg" alt="" className='w-56 h44 mr-1 mb-1' />

              </div>
            {/* Images */}
            {/* Reviews  */}
            <div className=''>
              <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                What 100 people are saying
              </h1>
            </div>
            {/* Reviews  */}
          </div>
        </div>
        {/* Description Portion */}
    </main>
    </main>
  )
}
