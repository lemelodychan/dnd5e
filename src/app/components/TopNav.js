import React, { useState } from 'react';
import Link from 'next/link';

const TopNav = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <div>
      <nav>
        {authenticated ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </div>
  );
};

export default TopNav;