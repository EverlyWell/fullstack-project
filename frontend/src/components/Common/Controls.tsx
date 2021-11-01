import { Pagination } from "@material-ui/lab";

interface IControlsProps {
  limit: number;
  order: string;
  page: number;
  count: number;
  handleLimitChange: any;
  handleOrderChange: any;
  handlePageChange: any;
}

const Controls = ({
  limit,
  order,
  page,
  count,
  handleLimitChange,
  handleOrderChange,
  handlePageChange
}: IControlsProps) => {
  const limits = [5, 10, 20];
  const orders = ['Asc', 'Desc'];

  return (
    <div className="col-md-8">
      <div className="form-group form-inline">
        <div className="input-group">
          <label htmlFor="limit">Items per page:</label>
          <select
            id="limit"
            data-testid="limit"
            aria-label="Items per page"
            onChange={handleLimitChange}
            value={limit}
          >
            {limits.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <label htmlFor="order">Order:</label>
          <select
            id="order"
            data-testid="order"
            aria-label="Order"
            onChange={handleOrderChange}
            value={order}
          >
            {orders.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="row">
          <Pagination
            data-testid="pagination"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;