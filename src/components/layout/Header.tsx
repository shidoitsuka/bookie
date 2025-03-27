import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/404', label: 'Login' },
  { href: '/', label: 'Register' },
];

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-300">
      <div className="container flex items-center justify-between py-3">
        <UnstyledLink href="/" className="font-bold hover:text-gray-600">
          Brand
        </UnstyledLink>
        <nav>
          <ul className="flex items-center justify-between space-x-4">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <UnstyledLink href={href} className="hover:text-gray-600">
                  {label}
                </UnstyledLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
