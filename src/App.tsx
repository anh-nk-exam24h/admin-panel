import { ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import Router from 'router';

import 'dayjs/locale/vi';

dayjs.locale('vi'); // use locale globally
dayjs().locale('vi').format();

const App = () => {
  return (
    <div className='App'>
      <ToastContainer />
      <Router />
    </div>
  );
};

export default App;
