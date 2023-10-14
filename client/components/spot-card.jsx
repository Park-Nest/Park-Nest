import {
    Grid,
    Paper,
    Typography,
    Button
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { AttachMoney, AccessTime, Map } from "@mui/icons-material";
  import { useNavigate} from "react-router-dom";
  import React from "react";

const SpotCard = ({ listingid, name, address, rate, hours, photo, edit, buttontype }) => {
  const navigate = useNavigate();

return (
<Grid item xs={4} >
            <Paper elevation={3} className="paper">
              <img src={photo} alt="parking spot" className="spot-card-img"/>
              <Box
                sx={{
                  paddingX: 1,
                }}
              >
                <Typography variant="subtitle1" component="h2">
                  {name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Map style={{ width: 12.5 }} />
                  <Typography variant="body2" component="p" marginLeft={0.5}>
                    {address}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AttachMoney style={{ width: 12.5 }} />
                  <Typography variant="body2" component="p" marginLeft={0.5}>
                    ${rate}/Hour
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessTime style={{ width: 12.5 }} />
                  <Typography variant="body2" component="p" marginLeft={0.5}>
                    {hours}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: 1
                  }}
                >
                 <Button variant="outlined" size='small' onClick={() => navigate(edit, {state: {id: listingid}})}>{buttontype}</Button>
                </Box>
              </Box>
            </Paper>
        </Grid>
    )
}

export default SpotCard;