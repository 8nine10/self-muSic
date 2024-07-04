import React from 'react'
import { sidebarLink } from '../../constants'
import { Link, useLocation } from 'react-router-dom'

const Rightbar = () => {
  const {pathname} = useLocation();
  return (
    <section className='rightbar'>
      <div className='flex w-full flex-1 flex-col gap-6 px-6'>
        {sidebarLink.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          return (
            <Link
              to={link.route}
              key={link.label}
              className={`rightbar_link ${isActive && 'bg-primary-500'}`}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className='text-light-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>
      <div className='mt-10 px-6'>
        <div className='flex cursor-pointer gap-4 p-4'>
          <img
            src='/assets/logout.svg'
            alt='logout'
            width={24}
            height={24}
          />
          <p className='text-light-1 max-lg:hidden'>Logout</p>
        </div>
      </div>
    </section>
  )
}

export default Rightbar