import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export default memo(function LoginPage() {
  return (
    <div>
      <Link to="/register">Đăng ký</Link>
    </div>
  );
});
