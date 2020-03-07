import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditProduct from "./EditProduct";
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

export default function SimpleTable() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showEditModal, setShowEditModal] = useState(false);
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
  const handleEditClick = (id: string, row: any, index: number) => {
    setCurrentProduct(row);
    setCurrentIndex(index)
    setShowEditModal(true);
    console.log(products)
};
  const handledDeleteClick = (id: string) => {
    console.log(id);
  };
  return (
    //Edit product modal
    <div>
      {Object.entries(currentProduct).length === 0 && currentProduct.constructor === Object ? (
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

      <TableContainer component={Paper}>
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
                  <EditIcon
                    onClick={() => {
                      handleEditClick(row["_id"], row, index);
                    }}
                  />
                </TableCell>
                <TableCell align="left">
                  <DeleteIcon
                    onClick={() => {
                      setCurrentProduct(row);
                      handledDeleteClick(row["_id"]);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
