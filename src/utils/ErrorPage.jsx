import React from 'react'

const ErrorPage = () => {
  return (
    <div className="min-h-dvh max-h-dvh overflow-hidden flex flex-col justify-center items-center bg-black text-white text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">The page you are looking for does not exist.</p>
    </div>
  )
}

export default ErrorPage
