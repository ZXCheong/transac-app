import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Modal, Typography, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import moment from "moment";

interface Item {
  id: number;
  order_id: number;
  item_desc: string;
  item_price: number;
  item_qty: number;
  item_id: number;
}

type Order = {
  id: number;
  order_date: string;
  order_status: string;
  billing_address: string;
  shipping_address: string;
  customer_id: number;
  items: Item[];
};

export default function DataTable() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedRow, setSelectedRow] = useState<Order | null>(null);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [rows, setRows] = useState<Order[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/Order/orders",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        // const data = await response.json();
        // console.log(data);
        const generatedColumns: GridColDef[] = Object.keys(
          response.data[0]
        ).map((key) => {
          let width = 300; // Default width

          // Adjust the width based on the key or any other condition
          if (key === "id") {
            width = 100;
          } else if (key === "order_date") {
            width = 200;
          } else if (key === "shipping_address") {
            width = 400;
          } else if (key === "billing_address") {
            width = 400;
          } else if (key === "order_status") {
            width = 200;
          } else if (key === "customer_id") {
            width = 100;
          }

          return {
            field: key,
            headerName: key.toUpperCase(),
            width: width,
          };
        });

        setColumns(generatedColumns);
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  async function fetchItemsForOrder(orderId: number) {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/Item/items/?order_id=${orderId}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      console.log(response.data);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  const handleRowClick = async (event: any) => {
    const clickedRowId = event.row.id;
    const clickedRow = rows.find((row) => row.id === clickedRowId);
    if (clickedRow) {
      setSelectedRow(clickedRow);
      await fetchItemsForOrder(clickedRow.id);
      console.log(items);
      setOpen(true);
    }
  };

  const calculateTotalPrice = (items: Item[]) => {
    return items.reduce(
      (total, item) => total + item.item_price * item.item_qty,
      0
    );
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 8,
        height: 400,
        width: "100%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(data) => data.id} //changed row from data
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <Dialog open={open} onClose={handleClose} sx={{ alignSelf: "center" }}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Order Details
            </Typography>
            <Button
              autoFocus
              color="error"
              variant="contained"
              onClick={handleClose}
              sx={{ mr: 5 }}
            >
              Edit
            </Button>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle>
          <Typography>
            <strong>Order #{selectedRow?.id ?? "-"}</strong>
          </Typography>
        </DialogTitle>

        <DialogContent
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography sx={{ mt: 2 }}>
            Created on:{" "}
            {moment(selectedRow?.order_date ?? "-").format("DD MMM YYYY")}
          </Typography>
          <Typography sx={{ mt: 2, align: "center" }}>
            Customer ID: {selectedRow?.customer_id ?? "-"}
          </Typography>
          <Typography sx={{ mt: 4 }}>
            Shipping Address: {selectedRow?.shipping_address ?? "-"}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Billing Address: {selectedRow?.billing_address ?? "-"}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Order Status: <strong>{selectedRow?.order_status ?? "-"}</strong>
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 8 }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Item ID</TableCell>
                  <TableCell align="right">Item Description</TableCell>
                  <TableCell align="right">Item Quantity</TableCell>
                  <TableCell align="right">Unit Price (RM)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items ? (
                  items.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.item_id}
                      </TableCell>
                      <TableCell align="right">{item.item_desc}</TableCell>
                      <TableCell align="right">{item.item_qty}</TableCell>
                      <TableCell align="right">
                        {item.item_price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>No items available found.</TableCell>
                  </TableRow>
                )}
                {/* calculate the total price */}
                {selectedRow && (
                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <strong>Total Price:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{calculateTotalPrice(items).toFixed(2)}</strong>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}
