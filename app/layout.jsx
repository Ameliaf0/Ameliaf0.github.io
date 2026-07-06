import Nav from '../components/Nav';
import Footer from '../components/Footer';
import './globals.css';

export const metadata = {
  title: 'Band Name',
  description: 'Official merch and info',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />        
        <link href="https://fonts.googleapis.com/css2?family=Gajraj+One&family=Irish+Grover&family=Rubik+Puddles&display=swap" rel="stylesheet"/>
      </head>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}