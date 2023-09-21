import { useState } from "react";

import { TextField, Paper, Grid, Button, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function SearchRoute({ handleFilter, setSearchCountries }) {
  const [setIsStartDesr] = useState(false);

  const [randCountry, setRandCountry] = useState("");

  const [start, setNewStart] = useState("");
  const [destination, setNewDest] = useState("");

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; // tabGreier

  function handleSearchRandom() {
    handleSearch("rand");
  }

  function handleSearchSD() {
    handleSearch("sD");
  }

  function handleSearch(input) {
    handleFilter();
    if (input === "sD") {
      setIsStartDesr(true);

      setSearchCountries([start, destination]);
    } else if (input === "rand") {
      setIsStartDesr(false);
      // console.log('Country: ' + randCountry)
      setSearchCountries([randCountry]);
    }
  }

  return (
    <>
      <Paper
        sx={{
          boxShadow: 3,
          marginTop: "5%",
          padding: "10px",
          width: "50%",
          marginLeft: "25%",
        }}
      >
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Search for a Country" value="1" />
                <Tab label="Enter Start and Destination" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Country"
                    fullWidth
                    autoComplete="destination"
                    onChange={(e) => setRandCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="outlined-filled"
                    onClick={handleSearchRandom}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container justifyContent="center" spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    label="Start"
                    fullWidth
                    autoComplete="Start"
                    onChange={(e) => setNewStart(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="destination"
                    label="Destination"
                    fullWidth
                    autoComplete="destination"
                    onChange={(e) => setNewDest(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined-filled" onClick={handleSearchSD}>
                    Search
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Paper>
    </>
  );
}
