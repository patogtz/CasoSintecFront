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
import AddProduct from "./AddProduct";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
interface product {
  _id: string;
  nombre: string;
  fechaAlta: string;
  descripcion: string;
}

export default function SimpleTable() {
  const classes = useStyles();
  const [products, setProducts] = useState<product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<product | any>({});
  const [currentID, setCurrentID] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  useEffect(() => {
    fetch("https://casosintec-back.herokuapp.com/products")
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
  const toggleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleEditClick = (row: product, index: number) => {
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

  const handleAddClick = () => {
    setShowAddModal(true);
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

      <AddProduct
        toggleOpen={toggleAddModal}
        open={showAddModal}
        products={products}
        setNewProducts={setProducts}
      />

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
              <TableCell><b>Nombre</b></TableCell>
              <TableCell align="left"> <b>Fecha de Alta</b></TableCell>

              <TableCell align="left"><b>Descripcion</b></TableCell>
              <TableCell align="left"><b>Editar</b></TableCell>
              <TableCell align="left"><b>Borrar</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row: product, index: number) => (
              <TableRow key={row["_id"]}>
                <TableCell component="th" scope="row">
                  {row["nombre"]}
                </TableCell>
                <TableCell align="left">{row["fechaAlta"]}</TableCell>
                <TableCell align="left">{row["descripcion"]}</TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() => {
                      handleEditClick(row, index);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <IconButton
                    onClick={() => {
                      handleDeleteClick(row["_id"], index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <IconButton
        style={{ float: "right", marginTop: "5px" }}
        aria-label="add"
        onClick={() => {
          handleAddClick();
        }}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}
