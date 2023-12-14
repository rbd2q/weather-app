import { FC, ReactNode } from 'react';
import { toast, ToastContainer as ToastifyToastContainer } from 'react-toastify';

export const ToastContainer: FC = () => (
  <ToastifyToastContainer
    hideProgressBar
    position="top-center"
    autoClose={5000}
    theme="light"
    limit={1}
    closeOnClick
  />
);

export const showErrorToast = (message: ReactNode) => {
  toast.error(message);
};
