import * as React from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { apiUrl } from '../../boredLocal';
import { useSnackbar } from 'notistack';
import Slide from '@mui/material/Slide';

const columns = [
  { id: 'id', label: 'Id', minWidth: 120 },
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 20 },
  { id: 'stallion', label: 'Gender', minWidth: 50 },
  { id: 'deleteB', label: 'Action', minWidth: 50, align: 'center' },
];

export default function HorsesGrid() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async () => {
      axios.get(apiUrl+`Horse/GetAllHorses`)
      .then((response) => {
          setRows(response.data)
      })
      .catch((error) => {
          console.log(error)
      })
  }

  useEffect(() => {
      fetchData()
  }, []);

  const handleDelete = async (horseId) => {
      await axios.delete(apiUrl+`Horse/DeleteHorseById?Id=` + horseId)
      .then(() => {
          enqueueSnackbar("Horse successfully deleted", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
          fetchData();
      })
      .catch((error) => {
          enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
      })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', color: 'red', backgroundColor: 'rgb(50,71,101)' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id.toString()}
                  style={{ minWidth: column.minWidth }}
                  sx={{ backgroundColor: 'rgb(50, 50, 50)', color: 'white' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'stallion') {
                        value = value ? 'Stallion' : 'Mare';
                      }
                      if (column.id === 'deleteB') {
                        value = <Button variant="contained" color='error' onClick={() => handleDelete(row.id)}>Delete</Button>;
                      }
                      return (
                        <TableCell sx={{ color: 'white' }} key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
