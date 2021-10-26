import { FunctionComponent } from "react";
import { FormControl, InputLabel, Select, MenuItem, Pagination } from "@mui/material";
import { IPagination } from "../../typings/typings";

interface ICatsPaginationView {
  limits: number[];
  limit: number;
  onLimitChange: any;
  pagination: IPagination;
  page: number;
  onPageChange: any;
  orders: string[];
  order: string;
  onOrderChange: any;
}

const CatsPaginationView: FunctionComponent<ICatsPaginationView> = ({
  limits, limit, onLimitChange, pagination, page, onPageChange, orders, order, onOrderChange
}) => {
  return (
    <>
      <FormControl id="category-form">
        <InputLabel id="limit-select-label">Categories</InputLabel>
        <Select
          id="limit-select"
          value={limit}
          label="Limit"
          onChange={onLimitChange}
        >
          {limits.map((l: number, index: number) => (
            <MenuItem
              key={`limit_item_${index}`}
              value={l}
            >
              {l}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Pagination
        count={pagination.count}
        page={page}
        onChange={onPageChange}
      />
      <FormControl id="order-form">
        <InputLabel id="order-select-label">Order</InputLabel>
        <Select
          id="order-select"
          value={order}
          label="Order"
          onChange={onOrderChange}
        >
          {orders.map((o: string, index: number) => (
            <MenuItem
              key={`order_item_${index}`}
              value={o}
            >
              {o}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default CatsPaginationView;
