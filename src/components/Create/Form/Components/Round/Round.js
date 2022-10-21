import React, { useState } from "react";
import EmployeeForm from "./EmployeeForm";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import useTable from './Components/useTable'
import * as RoundService from "./RoundService";
import Controls from './../../../../../controls/Controls'
import { VisibilityOutlined, EditOutlined } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from './../../../../Popup/Popup'
import CloseIcon from "@material-ui/icons/Close";
import useStyles from './styles'

const headCells = [
  { id: "duration", label: "Round Duration" },
  { id: "attendance", label: "Attendance Number" },
  { id: "roundType", label: "Department" },
  { id: "actions", label: "Actions", disableSorting: true }
];

export default function Rounds() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(RoundService.getAllRounds());
  const [openPopup, setOpenPopup] = useState(false);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  } = useTable(records, headCells);

  const addOrEdit = (round, resetForm) => {
    if (round.id == 0) RoundService.insertRound(round);
    else RoundService.updateRound(round);
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRecords(RoundService.getAllRounds());
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    RoundService.deleteRound(id);
    setRecords(RoundService.getAllRounds());
  };

  return (
    <>
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.roundType}</TableCell>
                <TableCell>{item.attendance}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlined fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="primary">
                    <VisibilityOutlined fontSize="smalll" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: "Are you sure to delete this record?",
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item.id);
                        }
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup
        title="Round Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </>
  );
}
