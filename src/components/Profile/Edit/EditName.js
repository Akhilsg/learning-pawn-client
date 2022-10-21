import React from 'react'
import Controls from '../../../controls/Controls';
import Swal from 'sweetalert2';

const EditName = ({ setOpenPopup }) => {
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
    setOpenPopup(false)

    Toast.fire({
      icon: 'success',
      title: 'Updated Succesffuly!'
    })
  }

  return (
    <div>
      <Controls.Input
        label="Edit name"
        value={user?.result.name}
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

export default EditName;