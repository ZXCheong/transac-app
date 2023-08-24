"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import {
  TextField,
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { InputProps, ItemList } from "./props";
import {
  setSubmitError,
  handleItemChange,
  handleAddItem,
} from "@/app/const/handler";
import { setItems_list, items_list } from "@/app/const/handler";

export default function OrderForm() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm<InputProps>({
    defaultValues: {
      order_date: "",
      order_status: "SELECT",
      billing_address: "",
      shipping_address: "",
      customer_id: "",
      items: [],
    },
  });

  //set the split button value for orderStatus
  const [orderStatus, setOrderStatus] = React.useState("SELECT"); // State to store selected order status

  const handleOrderStatusChange = (event: any) => {
    //setOrderStatus(event.target.value);
    setValue("order_status", event.target.value);
  };

  const onSubmit = async (data: InputProps) => {
    const billingAddress = `${data.billing_street}, ${data.billing_postal_code}, ${data.billing_city}, ${data.billing_state}`;
    const shippingAddress = `${data.shipping_street}, ${data.shipping_postal_code}, ${data.shipping_city}, ${data.shipping_state}`;
    data.order_date = getValues("order_date");
    data.order_status = getValues("order_status");
    data.billing_address = billingAddress;
    data.shipping_address = shippingAddress;

    data.items = items_list;

    console.log("data", data);

    const response = await axios.post(
      "http://localhost:4001/api/Order/addOrder",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );

    if (response.status === 201) {
      console.log("Order Submitted");
      reset();
      setItems_list([
        { item_id: 0, item_desc: "", item_qty: 0, item_price: 0 },
      ]);
    } else if (response.status !== 201) {
      setSubmitError("Submission Failed");
    }
  };

  return (
    <main>
      <Container>
        <Box
          sx={{
            margin: 1,
            padding: 8,
            bgcolor: "background.paper",
            borderRadius: 5,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper style={{ padding: 12, boxShadow: "none" }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="h3" component="div">
                    Order
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ boxShadow: "none", mt: 3 }}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="body1" component="div">
                      Created Date:
                    </Typography>
                    <TextField
                      placeholder="DD/MM/YYYY"
                      variant="outlined"
                      size="small"
                      onChange={(e) => setValue("order_date", e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" component="div">
                      Order Status:
                    </Typography>

                    <Select
                      value={watch("order_status")}
                      onChange={handleOrderStatusChange}
                      size="small"
                    >
                      {" "}
                      <MenuItem value="SELECT" disabled>
                        SELECT
                      </MenuItem>
                      <MenuItem value="BOOKED">BOOKED</MenuItem>
                      <MenuItem value="SHIPPING">SHIPPING</MenuItem>
                      <MenuItem value="DELIVERED">DELIVERED</MenuItem>
                      <MenuItem value="CANCELLED">CANCELLED</MenuItem>
                    </Select>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1" component="div">
                      Customer ID:
                    </Typography>
                    <TextField
                      placeholder="Customer ID"
                      variant="outlined"
                      size="small"
                      {...register("customer_id", {
                        required: "This is required",
                        minLength: { value: 3, message: "Min Length is 3" },
                      })}
                      onChange={(e) => setValue("customer_id", e.target.value)}
                    />
                  </Grid>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="div">
                        Billing Address:
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            placeholder="Street"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("billing_street", e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            placeholder="Post Code"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("billing_postal_code", e.target.value)
                            }
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <TextField
                            placeholder="City"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("billing_city", e.target.value)
                            }
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <TextField
                            placeholder="State"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("billing_state", e.target.value)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant="body1" component="div">
                        Shipping Address:
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            placeholder="Street"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("shipping_street", e.target.value)
                            }
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            placeholder="Post Code"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("shipping_postal_code", e.target.value)
                            }
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <TextField
                            placeholder="City"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("shipping_city", e.target.value)
                            }
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <TextField
                            placeholder="State"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={(e) =>
                              setValue("shipping_state", e.target.value)
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{ mt: 4, mb: 2 }}
                    >
                      Item List
                    </Typography>
                    <Paper
                      elevation={4}
                      style={{
                        padding: 40,
                        paddingTop: 20,
                        paddingBottom: 20,
                        margin: 12,
                        borderRadius: 5,
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            component="div"
                            align="center"
                          >
                            Item ID
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            component="div"
                            align="center"
                          >
                            Description
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            component="div"
                            align="center"
                          >
                            Unit Price (RM)
                          </Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography
                            variant="h6"
                            component="div"
                            align="center"
                          >
                            Quantity
                          </Typography>
                        </Grid>
                      </Grid>
                      {items_list.map((item, index) => (
                        <Grid container rowSpacing={12} key={index}>
                          <Grid item xs={3}>
                            <TextField
                              placeholder="Item ID"
                              size="small"
                              variant="outlined"
                              fullWidth
                              value={item.item_id}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "item_id",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              placeholder="Item Description"
                              size="small"
                              variant="outlined"
                              fullWidth
                              value={item.item_desc}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "item_desc",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              placeholder="Item Price"
                              size="small"
                              variant="outlined"
                              fullWidth
                              value={item.item_price}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "item_price",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              placeholder="Item Quantity"
                              size="small"
                              variant="outlined"
                              fullWidth
                              value={item.item_qty}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "item_qty",
                                  e.target.value
                                )
                              }
                            />
                          </Grid>
                        </Grid>
                      ))}

                      <Grid>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleAddItem}
                          style={{ marginTop: 12, alignSelf: "center" }}
                        >
                          Add Item
                        </Button>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Add more Grid items for other form fields */}
                </Grid>
              </Grid>
            </Paper>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
            >
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </main>
  );
}
