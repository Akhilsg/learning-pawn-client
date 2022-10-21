//React
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useHistory } from 'react-router-dom';

//Material-ui/core
import { Typography, Divider } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';

//Toast alert
import Swal from 'sweetalert2';

//Actions
import { createPost, updatePost } from '../../../actions/posts';
import Controls from '../../../controls/Controls';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  //Clearing the form
  const clear = useCallback(() => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  }, [setCurrentId, setPostData])

  //If there isn't title, clear the form
  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post, clear]);

  //Toast message
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

  //Submitting the tournament
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }

    Toast.fire({
      icon: 'success',
      title: 'Created succesfully!'
    })
  };

  //If enter is pressed, chip is added
  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  //if 'x' is pressed, chip is deleted
  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={`${classes.root} ${classes.form}`}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6">{currentId ? `Editing "${post?.title}"` : 'Create a tournament'}</Typography>
      <Divider />
      <Controls.Input
        name="title"
        label="Title"
        fullWidth
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <Controls.TextArea
        name="message"
        label="Message"
        fullWidth
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <div style={{ padding: '5px 0', width: '98%' }}>
        <ChipInput
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
        />
      </div>
      <div className={classes.fileInput}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
        />
      </div>
      <Controls.Button
        className={classes.buttonSubmit}
        size="large"
        type="submit"
        fullWidth
        text="Submit"
      />
      <Controls.Button
        color="secondary"
        size="small"
        onClick={clear}
        fullWidth
        text="Clear"
      />
    </form>
  );
};

export default Form;
