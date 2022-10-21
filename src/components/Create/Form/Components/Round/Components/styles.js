
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light
    },
    "& tbody td": {
      fontWeight: "300"
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer"
    }
  }
}));
