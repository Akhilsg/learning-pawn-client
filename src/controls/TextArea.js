import React from 'react'
import { TextField } from '@material-ui/core';

export default function TextArea(props) {
	const { name, label, value, error = null, onChange, ...other } = props;
	
	return (
		<TextField
			variant="outlined"
			label={label}
			name={name}
			value={value}
			onChange={onChange}
      multiline
      rows={4}
			{...other}
			{...(error && { error: true, helperText: error })}
		/>
	)
}
