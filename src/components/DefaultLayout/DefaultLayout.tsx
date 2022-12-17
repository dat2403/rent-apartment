import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <main>
        {children}
        {/*<Footer/>*/}
      </main>
    </div>
  );
};

export default DefaultLayout;
