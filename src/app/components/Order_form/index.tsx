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

export type InputProps = {
  order_date: string;
  order_status: string;

  billing_address: string;
  billing_street: string;
  billing_postal_code: string;
  billing_city: string;
  billing_state: string;

  shipping_address: string;
  shipping_street: string;
  shipping_postal_code: string;
  shipping_city: string;
  shipping_state: string;

  customer_id: string;
  items: Array<{
    itemsDesc: string;
    itemsQty: number;
    itemsPrice: number;
  }>;
};

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

  const [loginError, setSubmitError] = useState("");

  const [items_list, setItems_list] = useState<ItemList[]>([
    { itemsID: "", itemsDesc: "", itemsQty: 0, itemsPrice: 0 },
  ]);

  interface ItemList {
    itemsID: string;
    itemsDesc: string;
    itemsQty: number;
    itemsPrice: number;
  }

  //set the split button value for orderStatus
  const [orderStatus, setOrderStatus] = React.useState("SELECT"); // State to store selected order status

  const handleOrderStatusChange = (event: any) => {
    //setOrderStatus(event.target.value);
    setValue("order_status", event.target.value);
  };

  const handleItemChange = (
    index: number,
    field: keyof ItemList,
    value: string
  ) => {
    const updatedItems = [...items_list];
    // updatedItems[index][field] = value;
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setItems_list(updatedItems);
  };

  const handleAddItem = () => {
    setItems_list([
      ...items_list,
      { itemsID: "", itemsDesc: "", itemsQty: 0, itemsPrice: 0 },
    ]);
  };

  // const handleFormSubmit = async () => {
  //   try {
  //     reset();

  //     const requestData = {
  //       ...getValues(),
  //       order_status: orderStatus,
  //     };
  //     console.log(requestData);
  //     const response = await axios.post(
  //       "http://localhost:4001/api/Authentication/Login",
  //       requestData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const token = response.data;
  //       localStorage.setItem("authToken", token);
  //       localStorage.setItem("Order_status", orderStatus);
  //       router.push("/orderform");
  //       console.log("Order Submitted");
  //       setSubmitError(" ");
  //     } else {
  //       setSubmitError("Submission Failed");
  //       console.log(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error);
  //     setSubmitError("Invalid username or password.");
  //   }
  // };

  const onSubmit = async (data: InputProps) => {
    try {
      const billingStreet = getValues("billing_street");
      const billingPost = getValues("billing_postal_code");
      const billingCity = getValues("billing_city");
      const billingState = getValues("billing_state");

      const shippingStreet = getValues("shipping_street");
      const shippingPost = getValues("shipping_postal_code");
      const shippingCity = getValues("shipping_city");
      const shippingState = getValues("shipping_state");

      const billingAddress = `${billingStreet}, ${billingPost}, ${billingCity}, ${billingState}`;
      const shippingAddress = `${shippingStreet}, ${shippingPost}, ${shippingCity}, ${shippingState}`;

      data.order_status = orderStatus;
      data.billing_address = billingAddress;
      data.shipping_address = shippingAddress;

      data.items = items_list;

      console.log("data", data);

      const response = await axios.post(
        "http://localhost:4001/api/Submit/addOrder",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Order Submitted");
      } else {
        setSubmitError("Submission Failed");
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error on submission:", error);
      setSubmitError("Invalid data.");
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
                  <Grid item xs={12}>
                    <Typography variant="body1" component="div">
                      Order ID:
                    </Typography>
                    <TextField
                      placeholder="Order ID"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>

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
                              value={item.itemsID}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "itemsID",
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
                              value={item.itemsDesc}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "itemsDesc",
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
                              value={item.itemsPrice}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "itemsPrice",
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
                              value={item.itemsQty}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "itemsQty",
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
