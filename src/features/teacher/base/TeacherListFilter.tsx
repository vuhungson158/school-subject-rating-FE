import {Expander} from "../../../commonUI";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {Box, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const TeacherListFilter = () => {
    return (
        <Expander label={"Filter"}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center">
                <TextField label="Name (or Furigana)"/>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select label="Gender">
                    <MenuItem value="">All</MenuItem>
                </Select>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select label="Nationality">
                    <MenuItem value="">All</MenuItem>
                </Select>
                <Box display="flex" alignItems="center">
                    <TextField label="Age (from)"/>
                    <ArrowRightIcon/>
                    <TextField label="Age (to)"/>
                </Box>
            </Box>
        </Expander>
    )
}

export default TeacherListFilter;