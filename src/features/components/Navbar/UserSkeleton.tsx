import { Skeleton } from '@nextui-org/skeleton'
import React from 'react'

export default function UserSkeleton() {
  return (
    <div className='flex gap-2 items-center'>
        <Skeleton className="w-10 h-10 rounded-full bg-gray-300" />
        {/* From Uiverse.io by mahendrameghwal */ }
        <div>
            <div className="w-full gap-x-2 flex justify-center items-center">
                    <div
                        className="w-3 h-3 bg-[#FFF] animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_200ms_infinite,_bounce_1s_200ms_infinite] rounded-full"
                    ></div>
                    <div
                        className="w-3 h-3 animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_300ms_infinite,_bounce_1s_300ms_infinite] bg-[#FFF] rounded-full"
                    ></div>
                    <div
                        className="w-3 h-3 animate-[pulse_2s_cubic-bezier(0.4,_0,_0.6,_1)_400ms_infinite,_bounce_1s_400ms_infinite] bg-[#FFF] rounded-full"
                    ></div>
            </div>
        </div>

    </div>
  )
}
