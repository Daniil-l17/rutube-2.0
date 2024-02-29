'use client'
import { Provider } from 'react-redux';
import { persistor, store } from '@/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import ReduxToastr from 'react-redux-toastr'
const ProviderRedux = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
    {children}
        </PersistGate>
    </Provider>;
};

export default ProviderRedux;
