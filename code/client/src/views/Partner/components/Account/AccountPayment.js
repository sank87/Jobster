import React from 'react';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { compose } from "recompose";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setCurrentPartner } from 'actions/authActions';
import setAuthToken from "../../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../../../../store";
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import {
  Grid,
  Card,
  CardContent,
  Container,
  Box,
  Avatar,
  TextField,
  Divider,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2867B2",
    },
    background: {
      default: "#f4f5fd"
    },
  },
})

const useStyles = makeStyles({
  appMain: {
    width: '100%',
    marginTop: '100px',
    minHeight: '100%',
  },
  icon: {
    height: 100,
    width: 100,
    justifyContent: "center"
  },
  Container: {
    marginTop: '50px',
    Directions: 'row',
    marginLeft: '10%',
    marginRight: '10%',
    flexDirection: "row",
    textAlign: 'center'
  },
  appMain: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: '75px'
  }
})


function AccountPayment(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const history = useHistory();
  const nav1 = () => history.push('/jobinfo');

  React.useEffect(() => {
    // Check for token
    if (localStorage.pt_jwtToken) {
      // Set auth token header auth
      console.log("in effect", localStorage.pt_jwtToken);
      setAuthToken(localStorage.pt_jwtToken);
      // Decode token and get user info and exp
      const decoded = jwt_decode(localStorage.pt_jwtToken);
      console.log("in effect decoded", decoded);
      // Set user and isAuthenticated
      store.dispatch(setCurrentPartner(decoded));

      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        //console.log("App.js is running inside if and if")
        // Logout user
        //store.dispatch(logoutUser());
        // TODO: Clear current Profile
        console.log("Session Expired")
        // Redirect to login
        // window.location.href = "/login";
      }
    }
    else {
      history.replace('/partner')
    }
  }, [localStorage.pt_jwtToken])

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header />

        <Box className={classes.appMain}>
          <Container maxWidth="sm">
            <Typography
              color="textPrimary"
              variant="h4"
            >
              You have Selected Plan 1
                </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
            >
              Continue To your payment.
                </Typography>
          </Container>
        </Box>
        <Formik
          initialValues={{
            name: '',
            date: '',
            securityCode: '',
            cno: '',
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(1000).required(' Full name is required'),
            date: Yup.string().max(10000).required(' Date is required'),
            securityCode: Yup.string().max(100).required(' Security Code is required'),
            cno: Yup.string().max(100).required(' Card Number is required'),
          })}
          onSubmit={(values, actions) => {
            handleClickOpen();
          }}

        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Box maxWidth="lg" className={classes.Container}>
                  <Grid container spacing={3}>

                    <Grid item lg={7}>

                      <Grid
                        container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          md={6}
                        >
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="Name on card *"
                            margin="normal"
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          md={6}
                        >
                          <TextField
                            error={Boolean(touched.date && errors.date)}
                            fullWidth
                            helperText={touched.date && errors.date}
                            label="Expiry Date *"
                            type="date"
                            name="date"
                            variant="outlined"
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.date}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          md={8}
                        >
                          <TextField
                            error={Boolean(touched.cno && errors.cno)}
                            fullWidth
                            helperText={touched.cno && errors.cno}
                            label="Card Number *"
                            margin="normal"
                            name="cno"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.cno}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={4}
                        >
                          <TextField
                            error={Boolean(touched.securityCode && errors.securityCode)}
                            fullWidth
                            helperText={touched.securityCode && errors.securityCode}
                            label="Security Code/CVV   *"
                            margin="normal"
                            name="securityCode"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.securityCode}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>



                      {/* <Grid item lg={2}>
                </Grid> */}

                    </Grid>

                    <Grid item lg={1}>

                    </Grid>

                    <Grid item lg={4}>
                      <Card>
                        <CardContent>

                          <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="body 1"
                          >
                            Subtotal: $ 200
                      </Typography>
                          <Typography
                            align="center"
                            color="textPrimary"
                            variant="body1"
                          >
                            Tax: $ 8
                      </Typography>

                          <Typography
                            align="center"
                            color="textPrimary"
                            variant="body1"
                          >
                            Total: $ 208.00
                      </Typography>
                        </CardContent>
                        <Divider />
                        <Box p={2}>
                          <Grid
                            Container
                            justify='flex-end'
                          >
                            <Button
                              color='primary'
                              fullWidth
                              size="small"
                              type="submit"
                              variant="contained"
                            >
                              Pay
                          </Button>
                          </Grid>
                        </Box>
                      </Card>
                    </Grid>

                  </Grid>
                </Box>
              </form>
            )}
        </Formik>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Payment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              By clicking on proceed you will be charged.
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
            >
              Cancel
          </Button>
            <Button
              onClick={() => history.push('/p-accountinfo')}
              color="primary"
              autoFocus
              variant="contained"
            >
              Proceed
          </Button>
          </DialogActions>
        </Dialog>

      </div>

    </ThemeProvider>
  );
}

AccountPayment.propTypes = {
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

export default compose(connect(mapStateToProps, {}, null))(AccountPayment);