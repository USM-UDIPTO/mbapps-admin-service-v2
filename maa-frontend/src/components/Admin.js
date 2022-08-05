import { Box, Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  let admin_data = useRef([]);
  const [user, setUser] = useState("");
  const [buttonActive, setButtonActive] = useState(true);
  const [editActive, setEditActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [updateBtnActive, setUpdateBtnActive] = useState(true);
  const [createBtnActive, setCreateBtnActive] = useState(true);
  let selected_user = useRef({});
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [createdMsg, setCreatedMsg] = useState(false);
  let new_user = useRef({ "userName": "" });

  useEffect(() => {
    axios.get("http://localhost:9090/api/admins")
      .then(res => {
        // setAdmins(res.data);
        setLoading(true);
        admin_data.current = res.data.map(r => Object.assign({}, r));
      }).catch(err => {
        setLoading(true);
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setUser(event.target.value);
    selected_user.current = Object.assign({}, event.target.value);
    if (event.target.value === "") {
      setButtonActive(true);
    } else {
      setButtonActive(false);
    }
  };

  function renderEditDialog() {
    setEditActive(editActive ? false : true);
    admin_data.current.filter(row => row.id === selected_user.current.id)
      .forEach(data => {
        selected_user.current = Object.assign({}, data);
        setUpdateBtnActive(selected_user.current.userName === data.userName);
      });
  }

  function renderCreateDialog() {
    new_user.current.userName = "";
    setCreateBtnActive(new_user.current.userName === "");
    setCreateActive(createActive ? false : true);
  }

  const alterUserName = (e) => {
    selected_user.current.userName = e.target.value;
    admin_data.current.filter(row => row.id === selected_user.current.id)
      .forEach(data => setUpdateBtnActive(selected_user.current.userName === data.userName));
  }

  const createUserName = (e) => {
    new_user.current.userName = e.target.value;
    setCreateBtnActive(new_user.current.userName === "");
  }

  function update() {
    axios.put("http://localhost:9090/api/admin", selected_user.current)
      .then(res => {
        admin_data.current.filter(user => user.id === res.data.id).forEach(dt => { dt.userName = res.data.userName });
        setEditActive(editActive ? false : true);
      }).catch(err => {
        setLoading(true);
        console.log(err);
      });
  }

  function create() {
    axios.post("http://localhost:9090/api/admin", new_user.current)
      .then(res => {
        admin_data.current.push(res.data);
        setCreateActive(createActive ? false : true);
        toggleCreatedMsg();
      }).catch(err => {
        setLoading(true);
        console.log(err);
      });
  }

  function toggleCreatedMsg() {
    setCreatedMsg(createdMsg ? false : true);
  }

  function remove() {
    axios.delete("http://localhost:9090/api/admin/" + selected_user.current.id)
      .then(() => {
        console.log("Deleted user : " + selected_user.current.userName);
        admin_data.current.filter(user => user.id === selected_user.current.id).map((dt) => {
          admin_data.current.splice(admin_data.current.indexOf(dt), 1);
        });
        toggleDeleteMsg();
        setButtonActive(true);
      }).catch(err => {
        setLoading(true);
        console.log(err);
      });
  }

  function toggleDeleteMsg() {
    setDeleteMsg(deleteMsg ? false : true);
    if (deleteMsg) {
      selected_user.current = "";
    }
  }

  if (loading) {
    return (
      <Box sx={{ height: "75%", width: "55%", position: "fixed", left: "20%", top: "14%" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          Authorized Admin users
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select an admin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={user}
            label="Select an admin"
            onChange={handleChange}
          >
            <MenuItem value="" ><em>Select an user...</em></MenuItem>
            {admin_data.current.map((row) => (
              <MenuItem key={row.id} value={row}>{row.userName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Dialog open={editActive} maxWidth={"sm"} sx={{ paddingRight: "4%" }} fullWidth={true} onClose={renderEditDialog}>
          <DialogTitle align="center">Edit user details</DialogTitle>
          <Box sx={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
            <TextField label="Edit username" fullWidth={true} defaultValue={selected_user.current.userName}
              onChange={alterUserName}></TextField>
            <DialogActions>
              <Button onClick={update} disabled={updateBtnActive} variant="contained">Update</Button>
              <Button onClick={renderEditDialog} variant="contained">Cancel</Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Button onClick={renderEditDialog} disabled={buttonActive} sx={{ position: "fixed", left: "45%", marginTop: "6%" }} variant="contained">Edit</Button>
        <Snackbar
          open={deleteMsg}
          autoHideDuration={4000}
          onClose={toggleDeleteMsg}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          message={`User "${selected_user.current.userName}" is removed successfully`}
        />
        <Button onClick={remove} disabled={buttonActive} sx={{ position: "fixed", left: "69%", marginTop: "6%" }} variant="contained">Remove</Button>
        <Button onClick={renderCreateDialog} sx={{ position: "fixed", left: "20%", marginTop: "6%" }} variant="contained">Create</Button>
        <Dialog open={createActive} maxWidth={"sm"} sx={{ paddingRight: "4%" }} fullWidth={true} onClose={renderCreateDialog}>
          <DialogTitle align="center">Create an user</DialogTitle>
          <Box sx={{ width: "80%", marginLeft: "10%", marginRight: "10%" }}>
            <TextField label="Enter username" fullWidth={true} onChange={createUserName}></TextField>
            <DialogActions>
              <Button onClick={create} disabled={createBtnActive} variant="contained">Create</Button>
              <Button onClick={renderCreateDialog} variant="contained">Cancel</Button>
            </DialogActions>
          </Box>
        </Dialog>
        <Snackbar
          open={createdMsg}
          autoHideDuration={4000}
          onClose={()=> setCreatedMsg(createdMsg?false:true)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          message={`User "${new_user.current.userName}" is added successfully`}
        />
      </Box >
    );
  }
}