import React from 'react'

function TemperatureBox({bg, color, title, celcius}) {
  return (
    <div className={`${bg} ${color} w-32 h-20 rounded-lg p-2 max-sm:w-24 max-sm:h-16 max-sm:mt-2`}>
        <h4 className='text-center font-roboto text-lg font-normal max-sm:text-base'>{title}</h4>
        <strong className='flex justify-center  font-roboto text-2xl font-semibold max-sm:text-xl' >{celcius}</strong>
    </div>
  )
}

export default TemperatureBox