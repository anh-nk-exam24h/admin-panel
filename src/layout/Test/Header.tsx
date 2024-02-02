import { useRef } from 'react';
import { Input } from '@mantine/core';
import LogoHOCMAI from 'assets/logohm.svg';
import { SearchNormal1, ShoppingCart, User } from 'iconsax-react';

const Header = () => {
  const progressRef = useRef<any>();
  // Get the progress bar element;

  // Calculate and update the progress bar width on scroll
  // window.addEventListener('scroll', () => {
  //   // Get the total scroll height
  //   const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

  //   // Calculate the percentage scrolled
  //   const scrolled = (window.scrollY / scrollHeight) * 100;

  //   // Update the progress bar width
  //   progressRef.current.style.width = `${scrolled}%`;
  //   // console.log(scrolled);
  // });

  return (
    <>
      <div
        className='bg-[white] fixed top-0 w-full z-3'
        style={{ boxShadow: '0px 2px 10px rgba(0, 82, 166, 0.23)' }}
      >
        <div className='flex justify-around py-3 items-center flex-nowrap'>
          <div>
            <img src={LogoHOCMAI} alt='' />
          </div>
          <div className=' flex text-[14px] justify-between'>
            <div className=''>Trang chủ</div>
            <div className='pl-5'>Chương trình học</div>
            <div className='pl-5 text-ct-secondary'>
              <div className='mt-[-7px] mb-[2px]'>Phòng thi</div>
              <div style={{ borderBottom: '2px solid #2691FF' }}></div>
            </div>
            <div className='pl-5'>Thư viện</div>
            <div className='pl-5'>Hướng nghiệp</div>
            <div className='pl-5'>Hỗ trợ</div>
          </div>
          <div className='flex items-center justify-between w-80'>
            <Input rightSection={<SearchNormal1 size='18' color='#2691FF' />} radius={40} />
            <div
              className='p-1 rounded-full flex justify-center items-center w-8 max-h-8 text-ct-secondary border-ct-secondary target'
              style={{ border: '1px solid #2691ff' }}
            >
              <div className=' text-center leading-8'>
                <ShoppingCart size='20' color='#2691FF' />
              </div>
            </div>
            <div
              className='p-1 rounded-full flex justify-center items-center w-8 max-h-8 text-ct-secondary border-ct-secondary target'
              style={{ border: '1px solid #2691ff' }}
            >
              <div className=' text-center leading-8'>
                <User size='20' color='#2691FF' />
              </div>
            </div>
          </div>
        </div>
        <div className='h-2 bg-[#276ae6] w-0' ref={progressRef}></div>
      </div>
    </>
  );
};
export default Header;
