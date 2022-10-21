import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';

import useStyles from '../styles'
import Controls from '../../../../controls/Controls';
import { Grid, Typography, Divider } from '@material-ui/core';
import Popup from './../../../Popup/Popup'
import SimpleAccordion from './Accordian';
import { Visibility } from '@material-ui/icons';
import { Badge, Card, CardContent, CardHeader } from '@material-ui/core';

const DynamicForm = () => {
  const classes = useStyles()
  const [openPopupRounds, setOpenPopupRounds] = useState(false);
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: '', lastName: '', type: '' },
  ]);

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), firstName: '', lastName: '', type: '' }])
  }

  const handleRemoveFields = id => {
    const values = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  const typeOptions = [
    {
      id: 'Qualifiers',
      title: 'Qualifiers'
    },
    {
      id: 'Quarter-finals',
      title: 'Quarter-finals'
    },
    {
      id: 'Semi-finals',
      title: 'Semi-finals'
    },
    {
      id: 'Finals',
      title: 'Finals'
    },
    {
      id: 'Third place',
      title: 'Third place'
    },
  ]

  return (
    <>
      <div>
        <SimpleAccordion
          accordianCaption={`${inputFields.length - 1 === 0 ? "Rounds: 0, Create one now!" : `Rounds: ${inputFields.length - 1}`} `}
          accordianSummary={
            <form
              className={`${classes.root} ${classes.form}`}
              autoComplete="off"
              noValidate
            >
              {inputFields.map(inputField => (
                <div key={inputField.id}>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="stretch"
                    spacing={3}
                    key={inputField.id}
                  >
                    <Grid item>
                      <Controls.Input
                        label="First name"
                        value={inputField.firstName}
                        name='firstName'
                        required
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />
                      <Controls.Input
                        name="lastName"
                        label="Last Name"
                        value={inputField.lastName}
                        required
                        onChange={event => handleChangeInput(inputField.id, event)}
                      />
                      <Grid item>
                        <Controls.Select
                          name="type"
                          label="Round Type"
                          value={inputField.type}
                          options={typeOptions}
                          required
                          onChange={event => handleChangeInput(inputField.id, event)}
                        />
                      </Grid>
                      <IconButton disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
                        <RemoveIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleAddFields}
                        disabled={
                          !inputField.firstName.length ||
                          !inputField.lastName.length 
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        onClick={setOpenPopupRounds}
                        disabled={
                          !inputField.firstName.length ||
                          !inputField.lastName.length 
                        }
                      >
                        <Badge badgeContent={inputFields.length - 1} color='primary'>
                          <Visibility />
                        </Badge>
                      </IconButton>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </form>
          }
        />
      </div>
      <Popup
        title='View Rounds'
        outerChildren={
          <div style={{ display: 'flex' }}>
            <Controls.Button
              color='primary'
              name='GoBack'
              text='Go Back'
              onClick={() => setOpenPopupRounds(false)}
            />
          </div>
        }
        openPopup={openPopupRounds}
        setOpenPopup={setOpenPopupRounds}
      >
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {inputFields.map(inputField => (
            <div key={inputField.id}>
              <Grid item style={
                !inputField.firstName.length ||
                  !inputField.lastName.length ?
                  { display: 'none' } :
                  { display: 'block', margin: '10px' }
              }
              >
                <Card
                  className={classes.card}
                  raised
                  elevation={6}
                >
                  <CardHeader title='Round' />
                  <Divider />
                  <CardContent>
                    <Typography>First name: {inputField.firstName} </Typography>
                    <Typography>Last name: {inputField.lastName} </Typography>
                    <Typography>Round type: {inputField.type}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </div>
          ))}
        </Grid>
      </Popup>
    </>
  );
}

export default DynamicForm;