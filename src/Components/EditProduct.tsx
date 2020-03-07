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
  useEffect(() => {
    setName(params.product.nombre);
    setDesc(params.product.descripcion);
    setFecha(params.product.fechaAlta);
  }, []);

  const handleClose = () => {
    params.toggleOpen();
  };

  const handleSave = () => {
    let putRequest = {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        nombre: name,
        descripcion: desc,
        fechaAlta: fecha
      })
    };
    fetch(
      "http://localhost:3000/product/" + params.product._id,
      putRequest
    ).then(resp => {
      console.log(resp);
      let rows = params.products;
      rows[params.index]["nombre"] = name;
      rows[params.index]["descripcion"] = desc;
      rows[params.index]["fechaAlta"] = fecha;
      params.setNewProducts(rows);
      params.toggleOpen();
    }).catch(err => {
        console.log(err)
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
            Registre los cambios que quiera hacer para el producto.
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
          />
          <TextField
            margin="dense"
            id="desc"
            label="Descripcion"
            type="text"
            value={desc}
            onChange={event => setDesc(event.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="fechaAlta"
            label="Fecha de Alta"
            type="text"
            value={fecha}
            onChange={event => setFecha(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar Cambios
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
