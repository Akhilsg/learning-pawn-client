import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}));
