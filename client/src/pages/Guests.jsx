import "../App.css";
import { getAllGuests } from "../api/api";
import { useRef, useState, useEffect, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const columns = [
  {
    field: "Edit",
    headerName: "",
    sortable: false,
    resizable: false,
    disableColumnMenu: true,
    renderCell: () => {
      return (
        <Button
          onClick={(e) => {
            //e.stopPropagation()
          }}
        >
          Edit
        </Button>
      );
    },
  },
  {
    type: "text",
    field: "ID",
    headerName: "ID",
  },
  {
    field: "Resident",
    headerName: "Resident",
  },
  {
    field: "GradYear",
    headerName: "GradYear",
  },
  {
    field: "Grad",
    headerName: "Grad",
  },
  {
    field: "YearIssued",
    headerName: "YearIssued",
  },
  {
    field: "BirthDate",
    headerName: "BirthDate",
  },
  {
    field: "Employed",
    headerName: "Employed",
  },
  {
    field: "CardYear",
    headerName: "CardYear",
  },
];

// https://gitlab.com/LibreFoodPantry/client-solutions/theas-pantry/iamsystem/documentation/-/blob/main/Frontend-Implementation.md?ref_type=heads

function GuestsPopup(props) {
  const { open, onClose, onSubmit } = props;

  const [studentID, setStudentID] = useState("");
  const [residency, setResidency] = useState(null);
  const [gradStatus, setGradStatus] = useState(null);
  const [gradYear, setGradYear] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [isEmployed, setIsEmployed] = useState(false);

  const [eStudentID, setEStudentID] = useState("");
  const [eResidency, setEResidency] = useState("");
  const [eGradStatus, setEGradStatus] = useState("");
  const [eGradYear, setEGradYear] = useState("");
  const [eBirthDate, setEBirthDate] = useState("");
  const [eIsEmployed, setEIsEmployed] = useState("");

  const validateForm = useCallback(() => {
    console.log({studentID, residency, gradStatus, gradYear, birthDate, isEmployed})
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          backgroundColor: "#FFFFFF",
          border: "solid 1px #9d9d9d",
          borderRadius: "3px",
        }}
      >
        <Box sx={{margin: "24px", display: "flex", gap: "8px", flexDirection: "column"}}>
          <Typography variant="h5">Add a New Guest</Typography>
          <TextField
            size="small"
            label={"Student ID"}
            error={Boolean(eStudentID)}
            helperText={eStudentID || null}
            onChange={(evt) => setStudentID(evt.target.value)}
            value={studentID}
          />
          <Typography variant="h6">Residency Status</Typography>
          <FormControl
            error={Boolean(eResidency)}
          >
            <RadioGroup
              row={true}
              onChange={(evt, res) => setResidency(res)}
              value={residency}
            >
              <FormControlLabel value="OC" control={<Radio />} label="On-campus" />
              <FormControlLabel value="C" control={<Radio />} label="Commuter" />
              <FormControlLabel value="R" control={<Radio />} label="Resident" />
            </RadioGroup>
            <FormHelperText>{eResidency}</FormHelperText>
          </FormControl>
          <Typography variant="h6">Graduation Status</Typography>
          <FormControl
            error={Boolean(eGradStatus)}
          >
            <RadioGroup
              row={true}
              onChange={(evt, res) => setGradStatus(res)}
              value={gradStatus}
            >
              <FormControlLabel value="UG" control={<Radio />} label="Undergraduate" />
              <FormControlLabel value="G" control={<Radio />} label="Graduate" />
            </RadioGroup>
            <FormHelperText>{eGradStatus}</FormHelperText>
          </FormControl>
          <DatePicker
            label={"Year of Graduation"}
            views={["year"]}
            value={gradYear || null}
            slotProps={{
              textField: {
                size: "small",
                error: Boolean(eGradYear),
                helperText: eGradYear
              }
            }}
            onChange={(date) => setGradYear(date)}
          />
          <Typography variant="h6">Personal Information</Typography>
          <DatePicker
            label={"Birth Date"}
            value={birthDate || null}
            slotProps={{
              textField: {
                size: "small",
                error: Boolean(eBirthDate),
                helperText: eBirthDate
              }
            }}
            onChange={(date) => setBirthDate(date.toISOString().split("T")[0])}
          />
          <FormControl
            error={Boolean(eIsEmployed)}
          >
            <FormControlLabel
              label="Employed"
              control={
                <Checkbox
                  onChange={(evt, state) => setIsEmployed(state)}
                />
              }
            />
            <FormHelperText>{eIsEmployed}</FormHelperText>
          </FormControl>
          <Box sx={{display: "flex", gap: "8px", justifyContent: "right"}}>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => {
              let obj = {
                studentID,
                residency,
                gradStatus,
                gradYear,
                birthDate,
                isEmployed
              };
              validateForm();
              onSubmit(obj);
            }}>Create</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default function Guests() {
  const isLoaded = useRef(false);
  const [guests, setGuests] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  console.log("Exec Guests");
  useEffect(() => {
    if (!isLoaded.current) {
      getAllGuests().then((g) => {
        console.log("Guests", g);
        setGuests(g.data);
      });
      isLoaded.current = true;
    }
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Add Guest
      </Button>
      <DataGrid
        rowSelection={false}
        getRowId={(r) => r.ID}
        rows={guests}
        columns={columns}
      />
      <GuestsPopup
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSubmit={() => {
          console.log("Popup submitted")
        }}
      ></GuestsPopup>
    </>
  );
}
