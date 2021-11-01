import { useMemo } from "react";
import { Column, useTable } from "react-table";
import { IFav } from "../../typings";

interface IFavoritesTableProps {
  favorites: IFav[];
  handleOpenFavoriteDialog: any;
  handleRemoveFavorite: any;
}

const FavoritesTable = ({
  favorites,
  handleOpenFavoriteDialog,
  handleRemoveFavorite
}: IFavoritesTableProps) => {
  const columns = useMemo<Column<IFav>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Image Id",
        accessor: "image_id",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: (props: any) => {
          return (
            <img
              src={props.value.url}
              style={{maxHeight: '60px'}}
              alt="..." className="img-thumbnail mini"
            ></img>
          );
        },
      },
      {
        Header: "Sub Id",
        accessor: "sub_id"
      },
      {
        Header: "User Id",
        accessor: "user_id",
      },
      {
        Header: "Actions",
        Cell: (props:any) => {
          const rowIdx = props.row.id;
          const rowId = props.row.original.id;
          return (
            <div style={{ textAlign: "center" }}>
              <span onClick={() => handleOpenFavoriteDialog(rowIdx)}>
                <i className="fas fa-info-circle action mr-2"></i>
              </span>
              {' '}
              <span onClick={() => handleRemoveFavorite(rowId)}>
                <i className="fas fa-trash action mr-2"></i>
              </span>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    data: favorites,
  });

  return (
    <div className="col-md-12 list">
      <table
        data-testid="favs-table"
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
  );
};

export default FavoritesTable;
