import { useEffect, useMemo, useState } from "react";
import { Column, useTable } from "react-table";
import Pagination from "@material-ui/lab/Pagination";
import { getCats } from "../../services/cats.service";

import { ICat, ICategory, IPagination } from '../../typings/typings';
import { Alert, Button, Modal } from "react-bootstrap";
import { saveFavourite } from "../../services/favourites.service";

interface ICatListProps {
  category: ICategory | undefined;
}

const CatList = ({category}: ICatListProps) => {
  const [cats, setCats] = useState<Array<ICat>>([]);
  const [,setPagination] = useState<IPagination>({
    count: 5,
    page: 1,
    limit: 5
  });
  const [catIdx, setCatIdx] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<string>('Desc');
  const [openCatDialog, setOpenCatDialog] = useState<boolean>(false);
  const [openFavoriteMessage, setOpenFavoriteMessage] = useState<boolean>(false);

  const limits = [5, 10, 20];
  const orders = ['Asc', 'Desc'];

  useEffect(() => {
    async function getCatsPrivate() {
      const catsResponse = await getCats(category, limit, page, order);
      setCats(catsResponse.cats);
      setPagination(catsResponse.pagination);
    }
    getCatsPrivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, order, category]);

  const handleLimitChange = (evt: any) => setLimit(evt.target.value);

  const handlePageChange = (_evt: any, page: number) => setPage(page);

  const handleOrderChange = (evt: any) => setOrder(evt.target.value);

  const handleOpenCatDialog = (idx: string) => {
    setCatIdx(parseInt(idx));
    setOpenCatDialog(true);
  }

  const handleCloseCatDialog = () => setOpenCatDialog(false);

  const handleAddFavoriteClick = async (idx: string) => {
    const id = cats[parseInt(idx)]?.id;
    const response = await saveFavourite(id);
    if (response.status === 200) {
      setOpenFavoriteMessage(true);
    }
  }

  const handleFavoriteMessageClose = () => setOpenFavoriteMessage(false);

  const columns = useMemo<Column<ICat>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Breeds",
        accessor: "breeds",
        Cell: (props: any) => {
          return props.value ? props.value.join(',') : "";
        },
      },
      {
        Header: "Image",
        accessor: "url",
        Cell: (props: any) => {
          return (
            <img src={props.value} style={{maxHeight: '60px'}} alt="..." className="img-thumbnail mini"></img>
          );
        },
      },
      {
        Header: "Width",
        accessor: "width",
      },
      {
        Header: "Height",
        accessor: "height"
      },
      {
        Header: "Actions",
        Cell: (props:any) => {
          const rowIdx = props.row.id;
          return (
            <div style={{ textAlign: "center" }}>
              <span onClick={() => handleOpenCatDialog(rowIdx)}>
                <i className="fas fa-info-circle action mr-2"></i>
              </span>
              {' '}
              <span onClick={() => handleAddFavoriteClick(rowIdx)}>
                <i className="fas fa-star action mr-2"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: cats,
  });

  return (
    <div className="container">
      <h1>Cats</h1>
      <div className="list row">
        {/* Table section */}
        <div className="col-md-12 list">
          <table
            className="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Controls section */}
        <div className="col-md-8">
          <div className="form-group form-inline">
          <div className="input-group">
            <label htmlFor="limit">Items per page:</label>
            <select
              id="limit"
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
              count={limit}
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

        {/* Modal section */}
        <Modal show={openCatDialog} onHide={handleCloseCatDialog}>
          <Modal.Header closeButton>
            <Modal.Title>{cats[catIdx]?.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card card-container">
              <span>Breeds: {cats[catIdx]?.breeds}</span>
              <img src={cats[catIdx]?.url} alt="..." className="img-thumbnail"></img>
              <span>Width: {cats[catIdx]?.width}</span>
              <span>Height: {cats[catIdx]?.height}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCatDialog}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Alert section */}
        {openFavoriteMessage && <Alert variant="success" onClose={handleFavoriteMessageClose} dismissible>
          Favorite save success!
        </Alert>}
      </div>
    </div>
  );
};

export default CatList;
