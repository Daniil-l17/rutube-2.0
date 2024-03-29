import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.scss';
import { NextProviderUI } from '@/provaders/NextUIProvider';
import { Menu } from '@/components/menu/Menu';
import ProviderRedux from '@/provaders/ProviderRedux';
import NextTopLoader from 'nextjs-toploader';
import Header from '@/components/Header/Header';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const inter = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rutube 2.0',
  icons: {
    icon: '/rutube.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} flex`}>
        <ProviderRedux>
          <NextProviderUI>
            <NextTopLoader color="#c01b1be0" />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Slide}
            />
            <Menu />
            <div className="py-6 pl-14 flex-1">
              <Header />
              {children}
            </div>
          </NextProviderUI>
        </ProviderRedux>
      </body>
    </html>
  );
}
