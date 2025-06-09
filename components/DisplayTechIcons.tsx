import { cn, getTechLogos } from '@/lib/utils'
import { TechIconsProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const DisplayTechIcons = async ({techStacks}:TechIconsProps) => {
    const techIcons = await getTechLogos(techStacks)
  return (
    <div className='flex flex-row'>
        {techIcons.slice(0,3).map((icon, index) => (
            <div className={
                cn("relative group bg-dark-300 rounded-full p-2 flex flex-center", index >= 1 && "-ml-3")
            } key={index}>
                <span className='tech-tooltip'>{icon.tech}</span>
                <Image
                src={icon.url}
                alt={icon.tech}
                width={100}
                height={100}
                className="size-5"/>
            </div>
          
        ))}
    </div>
  )
}

export default DisplayTechIcons