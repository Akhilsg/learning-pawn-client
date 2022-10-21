import React from 'react';
import {
  Grid,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider
} from '@material-ui/core';
import { useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading)
    return (
      <Card className={classes.noPosts}>
        <CardHeader title="No posts" />
        <Divider />
        <CardContent>
          <Typography>There are no posts that have been created. Go to "Create a Tournament" to create a tournament now</Typography>
        </CardContent>
      </Card>
    );

  return (
    isLoading ? <CircularProgress /> : (
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
