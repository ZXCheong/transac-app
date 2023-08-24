import { useState } from "react";
import { ItemList } from "../components/Order_form/props";

export const [submitError, setSubmitError] = useState("");

export const [items_list, setItems_list] = useState<ItemList[]>([
  { item_id: 0, item_desc: "", item_qty: 0, item_price: 0 },
]);

export const handleAddItem = () => {
  setItems_list([
    ...items_list,
    { item_id: 0, item_desc: "", item_qty: 0, item_price: 0 },
  ]);
};

export const handleItemChange = (
  index: number,
  field: keyof ItemList,
  value: string
) => {
  const updatedItems = [...items_list];

  updatedItems[index] = {
    ...updatedItems[index],
    [field]: value,
  };
  setItems_list(updatedItems);
};
