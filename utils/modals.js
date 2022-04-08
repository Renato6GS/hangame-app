import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const showModal = ({ type = 'Success', title = 'Emtpy title', message = 'Empty message' }) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: type,
    title: title,
    text: message,
  });
};

export const showModalAndRedirect = ({ type = 'Success', title = 'Emtpy title', message = 'Empty message' }) => {
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    icon: type,
    title: title,
    text: message,
  });
};
