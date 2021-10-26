import { FunctionComponent } from "react";
import { Pagination } from "@mui/material";
import { IPagination } from "../../typings/typings";

interface IFavsPaginationView {
  pagination: IPagination;
  page: number;
  onPageChange: any;
}

const FavsPaginationView: FunctionComponent<IFavsPaginationView> = ({
  pagination, page, onPageChange
}) => {
  return (
    <Pagination
      count={pagination.count}
      page={page}
      onChange={onPageChange}
    />
  );
}

export default FavsPaginationView;
