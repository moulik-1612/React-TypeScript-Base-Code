import Swal from 'sweetalert2';

const useSweetAlert = () => {
  const showSuccess = (message: string, title: string = 'Success!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'success',
      confirmButtonColor: '#DFB61A',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'swal-confirm-button',
      },
    });
  };

  const showError = (message: string, title: string = 'Error!') => {
    Swal.fire({
      title,
      text: message,
      icon: 'error',
      confirmButtonColor: '#DFB61A',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'swal-confirm-button',
      },
    });
  };

  const showConfirm = async({
    title,
    text,
    icon = 'warning',
    confirmButtonText = 'Yes',
    cancelButtonText = 'No',
    confirmButtonColor = '#DFB61A', // default blue
    cancelButtonColor = '#f6f5f5',    // default red
  }: {
    title: string;
    text?: string;
    icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
  }): Promise<boolean> => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'swal-confirm-button',
        cancelButton: 'swal-cancel-button',
      },
    }).then((result) => result.isConfirmed);
  };

  return { showSuccess, showError, showConfirm };
};

export default useSweetAlert;
