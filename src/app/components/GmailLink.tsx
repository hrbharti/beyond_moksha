import React from 'react'

export default function GmailLink({ email, children } : {
    email: string, 
    children: React.ReactNode 
}) {
  const href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <a 
      href={href}
      target="_blank" 
      rel="noopener noreferrer" 
      className="cursor-pointer"
    >
      {children ? children : email}
    </a>
  );
}