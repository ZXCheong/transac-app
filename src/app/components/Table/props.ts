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