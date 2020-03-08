import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function EditDialog(params: any) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [fecha, setFecha] = useState("");

  const handleClose = () => {
    params.toggleOpen();
  };

  const handleSave = () => {
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
    fetch("http://localhost:3000/product", postRequest)
      .then((resp: any) => resp.json())
      .then((data: any) => {
        console.log(data.result);
        let rows = params.products;
        delete data.result["__v"];
        rows.push(data.result);
        params.setNewProducts(rows);
        params.toggleOpen();
      });
  };

  return (
    <div>
      <Dialog
        open={params.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Editar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Llene los campos para agregar un producto.
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
