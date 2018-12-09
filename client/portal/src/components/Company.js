
import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            openSnack: false,
            message: " "
        };
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClickOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false, openSnack: false })
    };

    enterPressed(event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            this.handleJobRegister();

        }
    }
    handleJobRegister(e)
    {
        var company = document.getElementById("company").value;
        var title = document.getElementById("job").value;
        var description = document.getElementById("desc").value;
        var salary = document.getElementById("salary").value;
          var job = {
              company,
              title,
              description,
              salary
          }
          fetch('http://localhost:5000/register-job', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(job)
            }).then(res => res.json())
                .then(res => {
                 if (res.message === "done")
                 {
                    this.setState({ openSnack: true, message: "Registration Completed Successfully" });

                 }
                });

    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography variant="headline">Register Job</Typography>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password"> company</InputLabel>
                            <Input
                                name="password"
                                type="email"
                                id="company"
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">  Job Role</InputLabel>

                            <Input
                                name="password"
                                id="job"
                                autoComplete="current-password"
                                onKeyPress={this.enterPressed.bind(this)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">  Description</InputLabel>

                            <Input
                                name="password"
                                id="desc"
                                autoComplete="current-password"
                                onKeyPress={this.enterPressed.bind(this)}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">  Salary</InputLabel>

                            <Input
                                name="password"
                                id="salary"
                                autoComplete="current-password"
                                onKeyPress={this.enterPressed.bind(this)}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="raised"
                            color="primary"
                            className={classes.submit}
                            onClick={(e) => this.handleJobRegister(e)}
                            id="signIn" >
                            Register
                       </Button>
                       <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={this.state.openSnack}
              autoHideDuration={2000}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">{this.state.message}</span>}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
                       
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);