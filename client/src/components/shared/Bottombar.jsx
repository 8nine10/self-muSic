import React from 'react'
import { sidebarLink } from '../../constants'
import { Link, useLocation } from 'react-router-dom';
const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLink.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
            return (
              <Link 
                to={link.route}
                key={link.label}
                className={`bottombar_link
                ${isActive && 'bg-primary-500'}`}
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className='text-subtle-medium max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
              </Link>
            )}
        )}
      </div>
    </section>
  )
}

export default Bottombar