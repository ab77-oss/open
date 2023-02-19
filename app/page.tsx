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
        {/* NavBar */}
        <main>
            {/* Header */}
            <div className='h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984]'>
              <div className='text-center mt-10'>
                <h1 className='text-white text-5xl font-bold mb-2'>
                  Find your table for any occasion
                </h1>
                {/* Search Bar */}
                <div className='text-left py-3 m-auto flex justify-center'>
                  <input className='rounded text-lg mr-3  p-2 w-[450px]' type="text" placeholder='State, city or town'/>
                  <button className='rounded bg-red-600 px-9 py-2 text-white'>
                    Let's go
                  </button>
                </div>
                {/* Search Bar */}
              </div>
            </div>
            {/* Header */}
            {/* Cards */}
            <div className='py-3 px-36 mt-10 flex flex-wrap'>
              {/* card */}
                <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
                  <img src="https://resizer.otstatic.com/v2/photos/wide-huge/2/51432278.jpg" alt="" className='' />
                </div>
                <div className='p-1'>
                <h3 className='font-bold text-2xl mb-2'>Plate Italiano Moderno</h3>
                </div>
              {/* card */}
            </div>
            {/* Cards */}

            

            
          
        </main>
      </main>
    </main>
  )
}
