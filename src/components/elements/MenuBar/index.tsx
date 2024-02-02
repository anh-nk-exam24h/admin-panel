import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Avatar, Input, Menu, Modal, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { RequestAPI } from 'api';
import { PathAPI } from 'api/route';
import {
  ArrowDown2,
  Graph,
  LogoutCurve,
  Notification,
  Personalcard,
  SearchNormal1,
  ShieldSecurity,
} from 'iconsax-react';
import { Userinfo } from 'store/selector';
import { notify } from 'utils/notify';

import Button from 'components/shared/Button';

const Menubar = () => {
  const routerCurrent = useLocation();
  const [routeActive, setRouteActive] = useState<string>('Dashboard');
  const userDataFormRedux = useSelector(Userinfo);
  const [openPassworld, setOpenPassworld] = useState<boolean>(false);

  const passworldForm = useForm({
    initialValues: {
      passworldNow: '',
      passwordNew: '',
      confirmPassword: '',
    },
    validationRules: {
      passworldNow: (values: string) => values !== '',
      passwordNew: (values: string) =>
        values.trim().length >= 8 &&
        /\d/.test(values) &&
        (/[a-z]/.test(values) || /[A-Z]/.test(values)),
      confirmPassword: (value: string, values: any) =>
        value.trim().length > 0 && value === values.passwordNew,
    },
    errorMessages: {
      passworldNow: 'Bạn chưa nhập mật khẩu',
      passwordNew: 'Mật khẩu phải tối thiểu 8 ký tự bao gồm số và chữ',
      confirmPassword: 'Mật khẩu không khớp',
    },
  });

  useEffect(() => {
    if (routerCurrent.pathname.includes('/manage-account')) {
      setRouteActive('Quản lý tài khoản');
    } else if (routerCurrent.pathname.includes('/manage-question')) {
      setRouteActive('Quản lý câu hỏi');
    } else if (routerCurrent.pathname.includes('/manage-exam')) {
      setRouteActive('Quản lý cuộc thi');
    } else if (routerCurrent.pathname.includes('/manage-product')) {
      setRouteActive('Quản lý sản phẩm');
    } else if (routerCurrent.pathname.includes('/manage-package')) {
      setRouteActive('Quản lý gói bán');
    } else {
      switch (routerCurrent.pathname) {
        case '/dashboard':
          setRouteActive('Dashboard');
          break;
        case '/report-test':
          setRouteActive('Báo cáo kiểm tra');
          break;
        case '/history':
          setRouteActive('Lịch sử làm bài');
          break;
        // case '/manage-account':
        //     setRouteActive('Quản lý tài khoản');
        //     break;
        case '/manage-banner':
          setRouteActive('Quản lý banner');
          break;
        case '/manage-topic':
          setRouteActive('Quản lý đề bài');
          break;
        case '/manage-course':
          setRouteActive('Quản lý khóa học');
          break;
        default:
          setRouteActive('Dashboard');
          break;
      }
    }
  }, [routerCurrent.pathname]);

  const handlePassworld = (value: any) => {
    const data = { currentPassword: value.passworldNow, newPassword: value.passwordNew };
    RequestAPI({
      url: PathAPI.changepass,
      method: 'POST',
      payload: data,
      // eslint-disable-next-line no-unused-vars
    }).then((res: any) => {
      notify({
        type: 'success',
        message: 'Đổi mật khẩu thành công',
      });
      setOpenPassworld(false);
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className='w-full bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center'>
        <div className='w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 h-[90px] px-24 py-6 bg-white'>
          {/* Brand */}
          <div
            className={`text-black font-['Be Vietnam Pro'] font-bold text-2xl uppercase hidden lg:inline-block`}
            style={{ fontWeight: '900' }}
          >
            {routeActive}
          </div>
          <div className='md:flex flex flex-nowrap flex-row items-center lg:ml-auto mr-3'>
            <div className='relative flex w-full flex-wrap items-stretch'>
              <Input
                className='mx-2'
                styles={{
                  input: {
                    border: '2px solid #E3E8F1',
                    backgroundColor: '#F5F7FB',
                    height: '40px',
                  },
                }}
                radius={8}
                icon={<SearchNormal1 size='20' color='currentColor' />}
                placeholder='Search ...'
              />
            </div>
            <div className='w-[2px] h-10 bg-ct-gray-200 mx-2'></div>
            {/* User */}
            <ul className='flex-col md:flex-row list-none items-center hidden md:flex'>
              <div className='rounded-full p-[10px] mx-2 bg-[#EAECF2] relative'>
                <div className='bg-ct-red-500 w-2 h-2 rounded-full absolute right-2'></div>
                <Notification size='20' color='currentColor' />
              </div>

              <Menu
                radius={10}
                control={
                  <div className='user flex w-max items-center'>
                    <Avatar
                      src='https://picsum.photos/200'
                      size={40}
                      radius='xl'
                      className='mx-2'
                    />
                    <p className='font-bold'> {userDataFormRedux?.email}</p>
                    <ArrowDown2 size='25' color='currentColor' className='pl-3' />
                  </div>
                }
              >
                <Menu.Item
                  onClick={() => setOpenPassworld(true)}
                  icon={<Personalcard color='currentColor' className='pl-3' size='25' />}
                  className='hover:bg-ct-blue-300 hover:text-white'
                >
                  Đổi mật khẩu
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    localStorage.removeItem('tk');
                    window.location.href = '/';
                  }}
                  icon={<LogoutCurve size='25' color='currentColor' className='pl-3' />}
                  className='hover:bg-ct-blue-300 hover:text-white'
                >
                  Đăng xuất
                </Menu.Item>
              </Menu>

              {/* <UserDropdown /> */}
            </ul>
          </div>
        </div>
      </nav>
      {/* End Navbar */}

      <Modal
        hideCloseButton
        centered
        opened={openPassworld}
        onClose={() => setOpenPassworld(!openPassworld)}
        radius={20}
        size={700}
      >
        <div className='w-full flex items-center mt-4 ml-4'>
          <h6 className='uppercase bg-[#017EFA] w-min rounded-full p-2 mb-1 text-xs font-semibold'>
            <Graph size={20} color='white' />
          </h6>{' '}
          <p className='font-bold text-xl ml-4 mb-2'>Đổi mật khẩu</p>
        </div>

        <form onSubmit={passworldForm.onSubmit((values) => handlePassworld(values))}>
          <div className='flex items-center my-4 px-14'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z'
                fill='#017EFA'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M10 15.5557C9.38638 15.5557 8.88892 15.0582 8.88892 14.4446L8.88892 7.77789C8.88892 7.16424 9.38638 6.66677 10 6.66677C10.6137 6.66677 11.1111 7.16424 11.1111 7.77789L11.1111 14.4446C11.1111 15.0582 10.6137 15.5557 10 15.5557Z'
                fill='white'
              />
              <path
                d='M8.88886 4.44455C8.88886 3.8309 9.38632 3.33344 9.99997 3.33344C10.6136 3.33344 11.1111 3.8309 11.1111 4.44455C11.1111 5.0582 10.6136 5.55566 9.99997 5.55566C9.38632 5.55566 8.88886 5.0582 8.88886 4.44455Z'
                fill='white'
              />
            </svg>
            <div className='ml-2'>Mật khẩu phải tối thiểu 8 ký tự bao gồm số và chữ</div>
          </div>
          <div className='flex w-full flex-wrap px-12'>
            <div className='w-full my-1'>
              <PasswordInput
                {...passworldForm.getInputProps('passworldNow')}
                className='mt-4 mx-2'
                placeholder='Nhập mật khẩu khẩu cũ'
                label='Mật khẩu cũ'
                radius={10}
                size='md'
                icon={<ShieldSecurity size='20' color='currentColor' variant='Bold' />}
              />
            </div>
            <div className='w-full my-1'>
              <PasswordInput
                {...passworldForm.getInputProps('passwordNew')}
                className='mt-4 mx-2'
                placeholder='Nhập mật khẩu mới'
                label='Mật khẩu mới'
                radius={10}
                size='md'
                icon={<ShieldSecurity size='20' color='currentColor' variant='Bold' />}
              />
            </div>
            <div className='w-full my-1'>
              <PasswordInput
                {...passworldForm.getInputProps('confirmPassword')}
                className='mt-4 mx-2'
                label='Xác nhận mật khẩu mới'
                placeholder='Nhập xác nhận mật khẩu mới'
                radius={10}
                size='md'
                icon={<ShieldSecurity size='20' color='currentColor' variant='Bold' />}
              />
            </div>
          </div>
          <div className='flex justify-center items-center mt-8 mr-4'>
            <Button className='m-4' variant='outline' onClick={() => setOpenPassworld(false)}>
              Hủy
            </Button>
            <Button type='submit'>Xác nhận</Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Menubar;
