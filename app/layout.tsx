import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Trello Clone',
  description:
    "Organize anything, together. Trello is a collaboration tool that organizes your projects into boards. In one glance, know what's being worked on, who's working on what, and where something is in a process.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
