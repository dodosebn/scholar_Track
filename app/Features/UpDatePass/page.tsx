import React, { Suspense } from 'react';
import UpdatePasswordPage from './updatePassword';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePasswordPage />
    </Suspense>
  );
};

export default Page;
