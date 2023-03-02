import Stars from '@/app/components/Stars'
import { Review } from '@prisma/client'
import React from 'react'

function ReviewCard({review}:{review:Review}) {
  return (
    <div>
       <div className="border-b pb-7 mb-7">
              <div className="flex">
                <div className="w-1/6 flex flex-col/private/var/folders/7v/0kz6wrc94pn8xkxvmh8fbkqw0000gn/T/AppTranslocation/764A3A5B-1875-4FD3-890C-630C93EA7776/d/Visual Studio Code.app/Contents/Resources/app/out/vs/code/electron-sandbox/workbench/workbench.html items-center">
                  <div
                    className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center"
                  >
                    <h2 className="text-white text-2xl">MJ</h2>
                  </div>
                  <p className="text-center uppercase">{review.first_name[0]}{review.last_name[0]}</p>
                </div>
                <div className="ml-10 w-5/6">
                  <div className="flex items-center">
                    <Stars rating={review.rating} reviews={[]}/>
                  </div>
                  <div className="mt-5">
                    <p className="text-lg font-light">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}

export default ReviewCard