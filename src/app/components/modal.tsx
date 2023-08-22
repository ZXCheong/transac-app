import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { rows } from "./orderdata";

// Define the type for the data prop
type DataProps = {
  orderid: number;
  createdDate: string;
  address: string;
  totalamount: number;
  itemcode: string;
  itemdesc: string;
  itemqty: number;
  itemprice: number;
  status: string;
};

const DetailsModal: React.FC<{ data: DataProps; onClose: () => void }> = ({
  data,
  onClose,
}) => {
  const { orderid, createdDate, address, totalamount, status } = data;

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Details for Order ID: {orderid}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Created Date: {createdDate}</Typography>
        <Typography variant="body1">Address: {address}</Typography>
        <Typography variant="body1">Total Amount: {totalamount}</Typography>
        <Typography variant="body1">Status: {status}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DetailsModal;
