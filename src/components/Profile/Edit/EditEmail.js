import React from 'react'
import Controls from '../../../controls/Controls';
import Swal from 'sweetalert2';

const EditEmail = ({ setOpenPopupEmail }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleSubmit = () => {
    setOpenPopupEmail(false)

    Toast.fire({
      icon: 'success',
      title: 'Updated Succesffuly!'
    })
  }

  return (
    <div>
      <Controls.Input
        label="Edit Email"
        value={user?.result.email}
      />
      <Controls.Button
        text="Save"
        type="submit"
        onClick={handleSubmit}
      />
      <br />
    </div>
  )
}

export default EditEmail;