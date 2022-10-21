import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput: {
    width: "75%"
  },
  newButton: {
    position: "absolute",
    right: "10px"
  }
}));
