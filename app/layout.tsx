import './globals.css';
import Provider from '@/components/Provider';

export const metadata = {
  title: 'Trello Clone',
  description:
    "Organize anything, together. Trello is a collaboration tool that organizes your projects into boards. In one glance, know what's being worked on, who's working on what, and where something is in a process.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider>
      <html lang='en'>
        <body className='no-scrollbar md:overflow-hidden'>{children}</body>
      </html>
    </Provider>
  );
};

export default RootLayout;
