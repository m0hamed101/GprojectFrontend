import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline'

import { Link } from 'react-router-dom'
import { useAuthContext } from '../../pages/Login/hooks/useAuthContext'
import { useLogout } from '../../pages/Login/hooks/useLogout'
import logo from '../../Assets/logo.jpg'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const { user } = useAuthContext()
  const User = user?.permission
  const UserName = user?.name;
  const UserId = user?.id;

  const { logout } = useLogout()
  const handleClicklogout = () => {
    logout()
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            {/* <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
            <img className="h-8 w-auto" style={{borderRadius:5}} src={logo} alt="" />
            
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        {/*Header*/}
        {
          User === "user" &&
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">  Courses</Link>
            {/* <Link to={"/Instructor"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">instructor</Link> */}
            <span className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'> Your ID Is , {UserId}</span>
            {/*<Link to={"/MyclassName"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">className</Link>*/}

          </Popover.Group>
        }
        {
          User === "instructor" &&
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">  Courses</Link>
            {/* <Link to={"/Instructor"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">  Students</Link> */}
          </Popover.Group>
        }
        {
          User === "admin" &&
          <Popover.Group className="hidden lg:flex lg:gap-x-12">

            <Link to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</Link>
            <Link to={"/Admin_courses"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Courses</Link>
            <Link to={"/Admin_users"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Users</Link>

          </Popover.Group>
        }
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            {/*Log in <span aria-hidden="true">&rarr;</span>*/}
            <span className='m-5'> Hi , {UserName}</span>
          </a>
          <button onClick={handleClicklogout}>LogOut <span aria-hidden="true">&rarr;</span></button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/*NAV*/}
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {User === "user" &&
                <div className="space-y-2 py-6">
                  <Link to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">  Courses</Link>
                  {/* <Link to={"/Instructor"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">instructor</Link> */}
                  <span className='m-5'> Hi , {UserId}</span>
                  {/*<Link to={"/MyclassName"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">className</Link>*/}
                </div>}

              {User === "Instructor" &&
                <div className="space-y-2 py-6">
                  <Link to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">  Courses</Link>
                  {/* <Link to={"/Instructor"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">  Students</Link> */}
                </div>}

              {User === "admin" &&
                <div className="space-y-2 py-6">
                  <Link to={"/"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</Link>
                  <Link to={"/Admin_courses"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Courses</Link>
                  <Link to={"/Admin_users"} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Users</Link>

                </div>}

              <div className="py-6">
                {                /*<a href="#"className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>*/}              </div>
              <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                <span className='m-5'> Hi , {UserName}</span>
                <button onClick={handleClicklogout}>LogOut <span aria-hidden="true">&rarr;</span></button>
              </a>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}


export default Header;