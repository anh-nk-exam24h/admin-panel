import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import logo from 'assets/emslogowhite.svg';
import {
  ArrowDown2,
  ArrowLeft2,
  Chart,
  Chart1,
  DocumentText,
  FolderOpen,
  MessageEdit,
  MessageQuestion,
  MessageText,
  UserSquare,
} from 'iconsax-react';
import { ConfigForm, Userinfo } from 'store/selector';

import { listRoute } from './route';

const Sidebar = () => {
  const navigate = useNavigate();

  const routerCurrent = useLocation();
  const [routeActive, setRouteActive] = useState('/dashboard');
  const [hiddenSideBar, setHiddenSideBar] = useState(true);
  const userDataFormRedux = useSelector(Userinfo);
  const configFormRedux = useSelector(ConfigForm);
  const configFormData = JSON.parse(JSON.stringify(configFormRedux)) || {};
  useEffect(() => {
    listRoute.map((item) => {
      if (routerCurrent.pathname.includes(item.path)) {
        setRouteActive(item.path);
      }
    });
  }, [routerCurrent.pathname]);
  return (
    <>
      <nav
        className={`z-40 font-['Be Vietnam Pro'] overflow-x-hidden shadow-xl bg-ct-primary flex flex-wrap items-center justify-between min-w-[260px] min-h-screen transition-all duration-200 ease-in-out`}
        style={hiddenSideBar ? { width: '260px' } : { minWidth: 0, width: '0', padding: '20px' }}
      >
        <div
          className='bg-white rounded-full border-2 w-10 h-10 max-w-10 max-h-10 flex justify-center items-center absolute top-10 z-10 transition-all duration-200 ease-in-out'
          style={hiddenSideBar ? { left: '240px' } : { left: '20px', transform: 'rotate(-180deg)' }}
          onClick={() => setHiddenSideBar(!hiddenSideBar)}
        >
          <ArrowLeft2 className='text-ct-blue-400' size='25' color='currentColor' />
        </div>
        <div className='flex-col items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap justify-between w-full mx-auto'>
          <Link to='/dashboard' className='flex justify-center mx-4 my-4'>
            <img className='w-[150px]' src={logo} alt='' />
          </Link>
          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 relative md:mt-4 md:shadow-none shadow left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded '
            }
          >
            <p className='md:min-w-full text-ct-blue-300 text-xs uppercase block pb-2 mx-[30px] no-underline'>
              main menu
            </p>

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              <li
                className={`items-center w-full hover:bg-[#1B2B65] ${
                  routeActive == '/dashboard' ? 'bg-[#1b2b65]' : ''
                }`}
              >
                <Link
                  to='/dashboard'
                  className={`text-xs text-white py-[6px] leading-5 flex items-center w-full`}
                >
                  {routeActive == '/dashboard' ? (
                    <Chart1
                      size='24'
                      className='m-[10px] ml-8'
                      color='currentColor'
                      variant={'Bold'}
                    />
                  ) : (
                    <Chart
                      size='24'
                      className='m-[10px] ml-8'
                      color='currentColor'
                      variant='Outline'
                    />
                  )}
                  Dashboard
                </Link>
              </li>
            </ul>

            {/* Heading */}
            {/* <p className='md:min-w-full text-ct-blue-300 text-xs uppercase block py-2 mx-[30px] no-underline'>
              report
            </p> */}
            {/* Navigation */}
            {/* <ul className='md:flex-col md:min-w-full flex flex-col list-none '>
              <li
                className={`items-center w-full hover:bg-[#1B2B65] ${
                  routeActive == '/report-test' ? 'bg-[#1b2b65]' : ''
                }`}
              >
                <Link
                  to='/report-test'
                  className={`text-xs text-white py-[6px] leading-5 flex items-center w-full`}
                >
                  <MessageText
                    size='24'
                    className='m-[10px] ml-8'
                    color='currentColor'
                    variant={routeActive == '/report-test' ? 'Bold' : 'Linear'}
                  />
                  Báo cáo kiểm tra
                </Link>
              </li>
              <li
                className={`items-center w-full hover:bg-[#1B2B65] ${
                  routeActive == '/history' ? 'bg-[#1b2b65]' : ''
                }`}
              >
                <Link
                  to='/history'
                  className={`text-xs text-white py-[6px] leading-5 flex items-center w-full`}
                >
                  <MessageEdit
                    size='24'
                    className='m-[10px] ml-8'
                    color='currentColor'
                    variant={routeActive == '/history' ? 'Bold' : 'Linear'}
                  />
                  Lịch sử làm bài
                </Link>
              </li>
            </ul> */}
         
          </div>
          {/* just add block always follow bottom. designed layout!*/}
          <></>
          <div className='text-center text-[12px] text-white absolute left-[85px] bottom-2'>
            Version: <b>0.0.1</b>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
