import React, { Component } from 'react';
//import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import buildings from '../components/rest/bldg.json';

import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

import { styled, useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Buildings() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Buildings
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <CardLayout />
    </Box>
  );
}

function CardLayout() {
  const cardLinks = [
    {
      to: '/',
      name: 'Buildings',
      icon: <LocalConvenienceStoreIcon />,
    },
  ];

  const buildingList = buildings[0]['d']['results'];
  buildingList.map((bldg) => console.log(bldg.name));

  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container spacing={2}>
        {buildingList.map((bldg) => (
          <Grid item xs={4}>
            {/* <Link to={"link.to"}> */}
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign="center"
                  >
                    {bldg.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign="center"
                  >
                    <LocalConvenienceStoreIcon />
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* </Link> */}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
