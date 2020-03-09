import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function EditDialog(params: any) {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [fecha, setFecha] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const handleClose = () => {
    params.toggleOpen();
  };

  const handleSave = () => {
    if (name === "" || fecha === "" || desc === "") {
      setOpenSnackbar(true);
      return;
    }
    let postRequest = {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        nombre: name,
        descripcion: desc,
        fechaAlta: fecha
      })
    };
    fetch("https://casosintec-back.herokuapp.com/product", postRequest)
      .then((resp: any) => resp.json())
      .then((data: any) => {
        console.log(data.result);
        let rows = params.products;
        delete data.result["__v"];
        rows.push(data.result);
        params.setNewProducts(rows);
        setName("")
        setDesc("")
        setFecha("")
        params.toggleOpen();
      });
  };
  const handleCloseSnackBar = () => {
    setName("")
    setDesc("")
    setFecha("")
    setOpenSnackbar(false);
  };
  return (
    <div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity="error">
          Porfavor llena todos los campos o modifica alguno de ellos.
        </Alert>
      </Snackbar>
      <Dialog
        open={params.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Agregar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene los campos para agregar un nuevo producto.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            type="text"
            value={name}
            onChange={event => setName(event.target.value)}
            fullWidth
            required={true}
          />
          <TextField
            margin="dense"
            id="desc"
            label="Descripcion"
            type="text"
            value={desc}
            onChange={event => setDesc(event.target.value)}
            fullWidth
            required={true}
          />
          <TextField
            margin="dense"
            id="fechaAlta"
            label="Fecha de Alta"
            type="text"
            value={fecha}
            onChange={event => setFecha(event.target.value)}
            fullWidth
            required={true}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Agregar Producto
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
