import React from 'react';
import {makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Typography from '@material-ui/core/Typography';
import Typography from '../../../wrappers/Typography';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
      boxShadow: "0px 5px 12px rgba(10, 1, 50, 0.3)",
      borderRadius: "25px",
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })); 


function createData(name, effective, effectiveRate, neutral, neutralRate, ineffective, ineffectiveRate, total) {
  return { name, effective, effectiveRate, neutral, neutralRate, ineffective, ineffectiveRate, total};
}

const rows = [
  createData('Cupcake', '31m', '60%', '2h 30m', '32%','2h 40m', '38%', '5h 51m'),
  createData('Donut', '21m', '10%', '4h 31m', '53%','1h 40m', '38%', '4h 23m'),
  createData('Eclair', '4h 2m', '40%', '1h 30m', '22%', '1h', '20%', '7h 2m'),
  createData('Frozen yoghurt', '1h', '2%', '2h', '32%','4h', '90%', '9h 52m'),
  createData('Gingerbread', '4h 20m', '18%', '0m', '0%','0m', '0%', '4h 20m'),
  createData('Honeycomb', '31m', '90%', '2h 30m', '32%','2h 40m', '38%', '5h 51m'),
  createData('Ice cream sandwich', '9h', '1%', '1m', '99%','2h', '38%', '15h 52m'),
  createData('Jelly Bean', '1h 3m', '55%', '2h 30m', '29%','2h 43m', '28%', '16h 51m'),
  createData('KitKat', '31m', '30%', '2h 30m', '32%','2h 40m', '38%', '5h 51m'),
  createData('Lollipop', '4h 20m', '18%', '0m', '0%','0m', '0%', '4h 20m'),
  createData('Marshmallow', '21m', '14%', '4h 31m', '23%','1h 40m', '38%', '1h 23m'),
  createData('Nougat', '21m', '10%', '4h 31m', '53%','1h 40m', '38%', '23m'),
];

function descendingComparator(a, b, orderBy) {
    a = a[orderBy]
    b = b[orderBy]

    if (typeof a === 'string' && (a.indexOf('h') != -1 || a.indexOf('m') != -1)){

        const hoursA = a.indexOf('h') == -1 ? 0 : parseInt(a.substring(0, a.indexOf('h')))
        const minutesA = a.indexOf('m') == -1 ? 0 : parseInt(a.substring(a.indexOf(' '), a.indexOf('m')))
        const hoursB = b.indexOf('h') == -1 ? 0 : parseInt(b.substring(0, b.indexOf('h')))
        const minutesB = b.indexOf('m') == -1 ? 0 : parseInt(b.substring(b.indexOf(' '), b.indexOf('m')))

        if (hoursB < hoursA) return -1        
        if (hoursB > hoursA) return 1
        else{
            if (minutesB < minutesA) return -1
            if (minutesB > minutesA) return 1
            return 0
        }
    }
  if (b < a) return -1;
  if (b > a) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
        return order};
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', alignRight: false, disablePadding: true, label: 'Members' },
  { id: 'effectiveRate', alignRight: true, disablePadding: false, label: 'Effective' },
  { id: 'neutralRate', alignRight: true, disablePadding: false, label: 'Neutral' },
  { id: 'ineffectiveRate', alignRight: true, disablePadding: false, label: 'Ineffective' },
  { id: 'total', alignRight: true, disablePadding: false, label: 'Total' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography className="font-weight-bold" value={headCell.label}/>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedMember, setSelectedMember] = React.useState(null);

  const handleCheck = (event, name) =>{
        selectedMember === name ? 
        setSelectedMember(null) : setSelectedMember(name)
        
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />

            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = selectedMember === row.name;
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleCheck(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell>
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        <Typography value={row.name} style={{fontSize: "16px"}}/>
                        <span className="text-black-50">
                            <Typography style={{fontSize:'11px'}} value={'UI Engineer'}/>
                        </span>
                      </TableCell>
                      <TableCell align="right">
                          {row.effectiveRate > '50%' ? (
                            <Typography style={{display: 'inline-block', fontWeight:'500', color:'springgreen'}} value={row.effectiveRate}/>)
                             : (<Typography style={{display: 'inline-block', fontWeight:'500'}} value={row.effectiveRate}/>)}
                          <Typography className="text-black-50" style={{fontSize:'11px'}} value={row.effective}/>
                      </TableCell>
                      <TableCell align="right">
                        <Typography style={{display: 'inline-block', fontWeight:'500'}} value={row.neutralRate}/>
                        <Typography className="text-black-50" style={{fontSize:'11px'}} value={row.neutral}/>
                      </TableCell>
                      <TableCell align="right">
                        {row.ineffectiveRate > '20%' ? (<Typography style={{display: 'inline-block', fontWeight:'500', color:'crimson'}} value={row.ineffectiveRate}/>) : 
                        (<Typography style={{display: 'inline-block', fontWeight:'500'}} value={row.ineffectiveRate}/>)}

                        {/* <Typography style={{display: 'inline-block', fontWeight:'500'}} value={row.ineffectiveRate}/> */}
                        <Typography className="text-black-50" style={{fontSize:'11px'}} value={row.ineffective}/>
                      </TableCell>
                      <TableCell align="right">
                          {row.total}
                        </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow >
                  <TableCell colSpan={6}/>
                </TableRow>
              )}
            </TableBody>
            
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </div>
  );
}
