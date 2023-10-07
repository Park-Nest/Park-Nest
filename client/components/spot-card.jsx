import {
    Grid,
    Paper,
    Typography,
    Button
  } from "@mui/material";
  import { Box } from "@mui/system";
  import { AttachMoney, AccessTime } from "@mui/icons-material"
  import React from "react";

const SpotCard = () => {

return (
<Grid item xs={4} md={3}>
            <Paper elevation={3} className="paper">
              <img src="https://media.istockphoto.com/id/1335929190/photo/car-parking-space.jpg?s=612x612&w=0&k=20&c=1Wekx1HZnQyA83y5kJElLyUCDoCCk8cLxHdSVjcS7U8=" alt="parking spot" className="spot"/>
              <Box
                sx={{
                  paddingX: 1,
                }}
              >
                <Typography variant="subtitle1" component="h2">
                  Parking Spot Description/Title
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AttachMoney style={{ width: 12.5 }} />
                  <Typography variant="body2" component="p" marginLeft={0.5}>
                    $10/Hour
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessTime style={{ width: 12.5 }} />
                  <Typography variant="body3" component="p" marginLeft={0.5}>
                    2-5PM
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: 1
                  }}
                >
                 <Button variant="outlined">Edit</Button>
                </Box>
              </Box>
            </Paper>
        </Grid>
    )
}

export default SpotCard;