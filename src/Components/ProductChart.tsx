import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentID, setCurrentID] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setProducts(data);
      });
  }, []);
  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };
  const handleEditClick = (row: any, index: number) => {
    setCurrentProduct(row);
    setCurrentIndex(index);
    setShowEditModal(true);
    console.log(products);
  };

  const handleDeleteClick = (id: string, index: number) => {
    setCurrentID(id);
    setCurrentIndex(index);
    setShowDeleteModal(true);
    console.log(id);
  };

  
  return (
    //Edit product modal
    <div>
      {Object.entries(currentProduct).length === 0 &&
      currentProduct.constructor === Object ? (
        <></>
      ) : (
        <EditProduct
          toggleOpen={toggleEditModal}
          open={showEditModal}
          product={currentProduct}
          products={products}
          index={currentIndex}
          setNewProducts={setProducts}
        />
      )}

      {currentID === "" ? (
        <></>
      ) : (
        <DeleteProduct
          toggleOpen={toggleDeleteModal}
          open={showDeleteModal}
          product={currentID}
          products={products}
          index={currentIndex}
          setNewProducts={setProducts}
        />
      )}

      <TableContainer component={Paper}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Sintec
            </Typography>
          </Toolbar>
        </AppBar>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="left">Descripcion</TableCell>
              <TableCell align="left">Fecha de Alta</TableCell>
              <TableCell align="left">Editar</TableCell>
              <TableCell align="left">Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, index: number) => (
              <TableRow key={row["_id"]}>
                <TableCell component="th" scope="row">
                  {row["nombre"]}
                </TableCell>
                <TableCell align="left">{row["fechaAlta"]}</TableCell>
                <TableCell align="left">{row["descripcion"]}</TableCell>
                <TableCell align="left">
                  <IconButton>
                    <EditIcon
                      onClick={() => {
                        handleEditClick(row, index);
                      }}
                    />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteClick(row["_id"], index);
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton style={{ float: "right", marginTop: "5px" }} aria-label="add" onClick={}>
        <AddIcon />
      </IconButton>
    </div>
  );
}
