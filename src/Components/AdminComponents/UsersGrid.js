import * as React from 'react';
import { useEffect } from 'react';
import { Button, Stack, Tooltip } from '@mui/material';
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
import moment from 'moment';
import { useSelector } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  { id: 'id', label: 'Id', minWidth: 120 },
  { id: 'username', label: 'Username', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 20 },
  { id: 'created', label: 'Created', minWidth: 50 },
  { id: 'admin', label: 'Admin', minWidth: 50, align: 'center' },
  { id: 'actionB', label: 'Action', minWidth: 50, align: 'center' },
];

export default function UsersGrid() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const userName = useSelector((state) => state.auth.username);

  const fetchData = async () => {
      axios.get(apiUrl+`User/GetAllUsers`)
      .then((response) => {
          setRows(response.data)
      })
      .catch((error) => {
          enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
      })
  }

  useEffect(() => {
      fetchData()
  }, []);

  const handleDelete = async (userId) => {
      await axios.delete(apiUrl+`User/DeleteUserById?UserId=` + userId)
      .then(() => {
          enqueueSnackbar("User successfully deleted", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
          fetchData();
      })
      .catch(() => {
          enqueueSnackbar("Something went wrong", { variant: 'error', autoHideDuration: 3000, TransitionComponent: Slide, });
      })
  }

  const handleAdmin = async (userId, admin) => {
    await axios.put(apiUrl+`User/UpdateAdminStatusByUserId?UserId=` + userId + '&Admin=' + !admin)
    .then(() => {
      enqueueSnackbar("Admin successfully granted", { variant: 'success', autoHideDuration: 3000, TransitionComponent: Slide, });
      fetchData();
    })
    .catch(() => {
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id === 'created') {
                        value = moment.utc(value).local().format('YYYY-MM-DD HH:mm');
                      }
                      if (column.id === 'admin') {
                        value = row['admin'] ? <CheckIcon /> : <CloseIcon />;
                      }
                      if (column.id === 'actionB' && row['username'] !== userName) {
                        const adminButton = (
                          <Button variant="contained" color={row['admin'] ? 'error' : 'success'} onClick={() => handleAdmin(row.id, row['admin'])}>Admin</Button>
                        )
                        value = 
                        <Stack direction="column" spacing={1}>
                          <Button variant="contained" color='error' onClick={() => handleDelete(row.id)}>Delete</Button>
                          <Tooltip title={row['admin'] ? 'Revoke admin' : 'Grant admin'}>
                            {adminButton} 
                          </Tooltip>
                        </Stack>;
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
