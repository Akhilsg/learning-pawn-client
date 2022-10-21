//React
import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

//Material-ui
import { 
  Typography, 
  CircularProgress, 
  Grid, 
  Divider, 
  Card, 
  CardContent 
} from '@material-ui/core';
import useStyles from "./styles"

//Actions
import Post from '../Posts/Post/Post';
import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';

const CreatorOrTag = ({ setCurrentId }) => {
  const { name } = useParams();
  const classes = useStyles()
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const location = useLocation();

  //Getting all posts that are from the creator or the 'tag'
  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, [location, dispatch, name]);


  //Checking if (!posts || posts === true)
  if (!posts.length && !isLoading) {
    return(
      <Card className={classes.noPosts}>
        <CardContent style={{ textAlign: "center" }}>
          There are no posts that contain the specified tag or their is no tournaments that <strong>"{name}"</strong> has created 
        </CardContent>
      </Card>
    );
  };

  return (
    <div>
      <Typography variant="h2" className={classes.name}>{name}</Typography>
      <Divider style={{ margin: '20px 0 50px 0' }} />
      {isLoading ? <CircularProgress /> : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId}/>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default CreatorOrTag;
