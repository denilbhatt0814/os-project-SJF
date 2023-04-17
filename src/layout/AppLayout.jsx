import { useState } from "react";
import axios from "axios";
// MUI
import {
  Grid,
  Button,
  Alert,
  IconButton,
  AlertTitle,
  Zoom,
  Grow,
  Typography,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
// local files
import GanttChart from "../components/GanttChart";
import ProcessTable from "../components/ProcessTable";
import main from "../logic/main";

const AppLayout = () => {
  const [pid, setPID] = useState(101);

  const createData = () => {
    setPID(pid + 1);

    return {
      pid,
      arrivalTime: "",
      burstTime: "",
      completionTime: "",
      turnAroundTime: "",
      waitingTime: "",
      responseTime: "",
    };
  };

  // list of objects containing process data
  const [processes, setProcesses] = useState(() => {
    setPID(pid + 1);
    return [createData()];
  });

  const [averages, setAverages] = useState({
    completionTime: 0,
    turnAroundTime: 0,
    waitingTime: 0,
    responseTime: 0,
  });

  // list of objects containing error data
  const [errorText, setErrorText] = useState([["", ""]]);
  // control wether alert is open or not1
  const [alertOpen, setAlertOpen] = useState(false);

  const addProcess = () => {
    setErrorText([...errorText, ["", ""]]);
    setProcesses([...processes, createData()]);
  };

  const calculateProcess = async () => {
    // error flag
    let error = false;

    // setting error states and updating error flag
    processes.forEach((process, index) => {
      if (process.arrivalTime === "") {
        const t = errorText;
        t[index][0] = "Empty";
        setErrorText(t);
        error = true;
      } else {
        const t = errorText;
        t[index][0] = "";
        setErrorText(t);
      }

      if (process.burstTime === "") {
        const t = errorText;
        t[index][1] = "Empty";
        setErrorText(t);
        error = true;
      } else {
        const t = errorText;
        t[index][1] = "";
        setErrorText(t);
      }
    });

    // fetch calculation data from backend if no error
    if (!error) {
      const axiosResponse = main(processes);

      // update the 'processes' array with the data from API
      setProcesses(axiosResponse.result);
      // update the averages array
      setAverages(axiosResponse.averages);

      return;
    }

    // else display error
    setAlertOpen(true);
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
      sx={{
        p: "2.5vh 2.5vw",
        height: "100vh",
        overflow: "scroll",
        "&::-webkit-scrollbar": { display: "none" },
      }}
    >
      <Grow in timeout={500}>
        <Grid item>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textShadow: "1px 1px 5px #121212",
            }}
          >
            Shortest Job First Simulation
          </Typography>
        </Grid>
      </Grow>

      {/* Table Component */}
      <Grow in timeout={500}>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            width: "100%",
            height: "78vh",
            overflow: "scroll",
            overscrollBehavior: "contain",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <ProcessTable
            processes={processes}
            setProcesses={setProcesses}
            errorText={errorText}
            setErrorText={setErrorText}
            averages={averages}
          />
        </Grid>
      </Grow>

      {/* Table action buttons */}
      <Grid item>
        <Grow in timeout={500}>
          <Button
            onClick={addProcess}
            variant="contained"
            sx={{ m: "20px" }}
            disabled={alertOpen}
          >
            ADD PROCESS
          </Button>
        </Grow>
        <Grow in timeout={500}>
          <Button
            variant="contained"
            onClick={calculateProcess}
            sx={{ m: "20px" }}
            disabled={alertOpen}
          >
            CALCULATE
          </Button>
        </Grow>
      </Grid>

      {/* Alert to display in case of error */}
      <Grid item>
        {/* Alert animation */}
        <Zoom in={alertOpen}>
          <Alert
            variant="filled"
            severity="error"
            sx={{
              m: "0",
              width: "100vw - 4vh",
              position: "absolute",
              left: "2vh",
              right: "2vh",
              bottom: "2vh",
              zIndex: "modal",
            }}
            action={
              <IconButton color="inherit" onClick={() => setAlertOpen(false)}>
                <CloseRounded />
              </IconButton>
            }
          >
            <AlertTitle>Error!</AlertTitle>
            Please enter all the values.
          </Alert>
        </Zoom>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        sx={{
          width: "100%",
          height: "85vh",
          borderRadius: "12px",
          overflowX: "hidden",
          overflowY: "scroll",
          overscrollBehavior: "contain",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <GanttChart processes={processes} />
      </Grid>
    </Grid>
  );
};

export default AppLayout;
