import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteDialog(params: any) {
  const handleClose = () => {
    params.toggleOpen();
  };

  const handleDelete = () => {
    let deleteRequest = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };
    fetch("http://localhost:3000/product/" + params.product, deleteRequest)
      .then(resp => {
        if (resp.status === 200) {
          console.log(resp);
          let rows = params.products;
          rows.splice(params.index, 1);
          params.setNewProducts(rows);
          params.toggleOpen();
        } else {
          params.toggleOpen();
          console.log(resp);
        }
      })
  };

  return (
    <div>
      <Dialog
        open={params.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Desea eliminar el producto?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
