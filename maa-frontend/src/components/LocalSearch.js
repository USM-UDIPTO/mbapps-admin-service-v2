import { Alert, Button, Collapse, IconButton, Paper, Radio, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function LocalSearch() {
  let [localSearchServiceOptions, setLocalSearchServiceOptions] = useState([]);
  let [finalRequest, setFinalRequest] = useState([]);
  const [updateRequired, setUpdateRequired] = useState(false);
  const [updateResponse, setUpdateResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  let mal_data = useRef([]);
  let [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9090/api/mal")
      .then(res => {
        setLocalSearchServiceOptions(res.data);
        mal_data.current = res.data.map(r => Object.assign({}, r));
        setLoading(true);
      })
      .catch(err => {
        setLoading(true);
        console.log(err);
      });
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: "140%"
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]));

  function alterFinalRequest() {
    localSearchServiceOptions.forEach(row => {
      mal_data.current.filter(data => data.id === row.id).forEach(r => {
        if (isEqual(row, r) === false) {
          finalRequest.push(r);
        }
      })
    })
  }

  const handleComments = row => e => {
    mal_data.current = mal_data.current.map(r => {
      if (r.id === row.id) {
        if (r.textSearch === 1) {
          r.comments = e.target.value;
        }
      }
      setUpdateRequired(false);
      return r;
    });
  }

  function showRadio(row) {
    return mal_data.current.filter(r => r.id === row.id).map(r => {
      if (r.nearBySearch === 1)
        return true;
      return false;
    })[0];
  }

  const handleRadio = row => {
    mal_data.current = mal_data.current.map(r => {
      if (r.id === row.id) {
        if (r.nearBySearch === 1) {
          r.nearBySearch = 0;
          r.textSearch = 1;
          localSearchServiceOptions.filter(d => d.id === row.id).forEach(d => r.comments = d.comments);
        }
        else {
          r.nearBySearch = 1;
          r.textSearch = 0;
          r.comments = "";
        }
      }
      setToggle(toggle ? false : true);
      setUpdateRequired(false);
      return r;
    });
  }

  function update() {
    alterFinalRequest();
    if (finalRequest.length === 0) {
      setUpdateRequired(true);
    } else {
      axios.put("http://localhost:9090/api/mal", finalRequest)
        .then(() => {
          console.log(localSearchServiceOptions);
          setUpdateResponse(true);
          setLocalSearchServiceOptions(mal_data.current);
        })
        .catch((err) => console.log(err));
    }
  }

  function reset() {
    mal_data.current = localSearchServiceOptions.map(r => Object.assign({}, r));
    setFinalRequest([]);
    setUpdateRequired(false);
  }

  if (loading) {
    return (
      <>
        <TableContainer component={Paper} sx={{ maxHeight: "75%", width: "55%", position: "fixed", left: "20%", top: "12%" }}>
          <Table aria-label="simple table" stickyHeader size="small">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Popular Terms</StyledTableCell>
                <StyledTableCell>Nearby Search</StyledTableCell>
                <StyledTableCell>Text Search (KM)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                mal_data.current.map((row) => (
                  <StyledTableRow
                    key={row.id}>
                    <StyledTableCell align="center">{row.searchTerm}</StyledTableCell>
                    <StyledTableCell>
                      <Radio
                        checked={showRadio(row) === true}
                        onChange={() => handleRadio(row)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Radio
                        checked={showRadio(row) === false}
                        onChange={() => handleRadio(row)}
                      />
                      <TextField
                        disabled={row.nearBySearch === 1}
                        required={row.nearBySearch === 0 && row.comments === ""}
                        type={"number"}
                        defaultValue={row.comments}
                        size="small"
                        onChange={handleComments(row)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <Button sx={{ position: "fixed", left: "25%", bottom: "7%" }} variant="contained" onClick={() => update()}>Update</Button>
        <Button sx={{ position: "fixed", left: "40%", bottom: "7%" }} variant="contained" onClick={() => reset()}>Reset to defaults</Button>
        <Button sx={{ position: "fixed", left: "60%", bottom: "7%" }} variant="contained" onClick={() => reset()}>Revert to saved</Button>

        <Box sx={{ width: "20%", right: "2%", position: "fixed" }}>
          <Collapse in={updateRequired}>
            <Alert severity="warning"
              action={
                <IconButton
                  size="small"
                  onClick={() => {
                    setUpdateRequired(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              No data changed!
            </Alert>
          </Collapse>
          <Collapse in={updateResponse}>
            <Alert severity="success"
              action={
                <IconButton
                  size="small"
                  onClick={() => {
                    setUpdateResponse(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Successfully updated!
            </Alert>
          </Collapse>
        </Box>
      </>
    );
  }
}