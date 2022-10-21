import * as React from 'react';
import { Autocomplete, TextField, MenuItem } from '@mui/material';

export default function AutoComplete(props) {
  const { options } = props;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={
        options.map(
          item => (
            <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
          )
        )
      }
      renderInput={(params) => <TextField {...params} label="Tournaments" />}
    />
  );
}