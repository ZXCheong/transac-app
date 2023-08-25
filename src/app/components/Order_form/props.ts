export type DataProps = {
    orderid: number;
    createdDate: string;
    address: string;
    totalamount: number;
    status: string;
    items: ItemProps[];
};

type ItemProps = {
    itemcode: string;
    itemdesc: string;
    itemqty: number;
    itemprice: number;
}

export type Order = {
  id: number;
  order_date: string;
  order_status: string;
  billing_address: string;
  shipping_address: string;
  customer_id: number;
  items: Item[];
};

export interface Item {
  id: number;
  order_id: number;
  item_desc: string;
  item_price: number;
  item_qty: number;
  item_id: number;
}

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
      item_id: number;
      item_desc: string;
      item_qty: number;
      item_price: number;
    }>;
  };

  export interface ItemList {
    item_id: number;
    item_desc: string;
    item_qty: number;
    item_price: number;
  }
  