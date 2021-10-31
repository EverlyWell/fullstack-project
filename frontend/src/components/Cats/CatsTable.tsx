import { useMemo } from "react";
import { Column, useTable } from "react-table";
import { ICat } from "../../typings/typings";

interface ICatsTableProps {
  cats: ICat[];
  handleOpenCatDialog: any;
  handleAddFavoriteClick: any;
};

const CatsTable = ({cats, handleOpenCatDialog, handleAddFavoriteClick}: ICatsTableProps) => {
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
    data: cats,
  });

  return (
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
  );
};

export default CatsTable;
