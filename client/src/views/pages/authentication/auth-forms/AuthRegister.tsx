import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { StringColorProps } from 'types';
import BannerMessage from 'banner-message';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const { roleId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerRes = useSelector((state: any) => state?.registerReducer?.register);
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState<StringColorProps>();
    const { firebaseRegister, firebaseGoogleSignIn } = useAuth();

    // ================= ||  || ===================//

    var [fname, setFname] = React.useState('');
    var [lname, setLname] = React.useState('');
    var [email, setEmail] = React.useState('');
    var [password, setPassword] = React.useState('');

    var [dob, setDob] = React.useState('');
    var [phonno, setPhoneno] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [severity, setSeverity] = React.useState('');
    const [msg, setMsg] = React.useState('');
    const [userlanguage, setUserlanguage] = React.useState<string>('');

    const handleLangChange = (event: SelectChangeEvent) => {
        setUserlanguage(event.target.value as string);
    };

    //================== ||  || ===================//

    const googleHandler = async () => {
        try {
            await firebaseGoogleSignIn();
        } catch (err) {
            console.error(err);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.SyntheticEvent) => {
        event.preventDefault();
    };

    const changePassword = (value: string) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const handleDateChange = (newValue: any) => {
        // setValue(newValue);
        setDob(newValue);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    useEffect(() => {
        changePassword('123456');
    }, []);

    const isEmptyObject: any = (selector: any) => {
        return JSON.stringify(selector) === '{}';
    };

    React.useEffect(() => {
        if (isEmptyObject(registerRes)) {
            return;
        } else {
            console.log('registerRes register', registerRes);
            localStorage.setItem('role_id', registerRes?.user?.role);
            if (registerRes?.status === '201' && registerRes?.user?.role === 0) {
                setSeverity('success');
                setMsg('Your buyer account Registered successfully');
                setOpen(true);
                let timing = setInterval(() => {
                    navigate('/login');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            } else if (registerRes?.status === '201' && registerRes?.user?.role === 1) {
                setSeverity('success');
                setMsg('Your seller account Registered successfully');
                setOpen(true);
                let timing = setInterval(() => {
                    navigate('/login');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            } else if (registerRes.status === '400') {
                // alert("wrong password");
                console.log(registerRes);
                setSeverity('success');
                setMsg('You have entered wrong password');
                setOpen(true);
                let timing = setInterval(() => {
                    navigate('/login');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            } else if (registerRes.status === '309') {
                setSeverity('info');
                setMsg('User not registered please sign up');
                setOpen(true);
                let timing = setInterval(() => {
                    //   setIsloading(!isLoading);
                    navigate('/login');
                }, 5000);
                return () => {
                    clearInterval(timing);
                };
            }
        }
    }, [registerRes]);
    let items = { fname, lname, phonno, password, dob, email, role: roleId, userlanguage };

    console.log('items in register', items, typeof roleId, roleId);
    let handleSubmit1 = async (e: any) => {
        // e.preventDefault();
        // setIsloading(!isLoading);
        // saga dispatch
        dispatch({ type: 'REGISTER_USER', payload: items });
        console.log('items for register', items);
    };
    return (
        <>
            <BannerMessage open={open} onClose={handleClose} severity={severity} msg={msg} />
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                // validationSchema={Yup.object().shape({
                //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                //     password: Yup.string().max(255).required('Password is required')
                // })}
                onSubmit={
                    handleSubmit1
                    // async (values, { setErrors, setStatus, setSubmitting }) => {
                    // try {
                    //     await firebaseRegister(values.email, values.password).then(
                    //         () => {
                    //             // WARNING: do not set any formik state here as formik might be already destroyed here. You may get following error by doing so.
                    //             // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application.
                    //             // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
                    //             // github issue: https://github.com/formium/formik/issues/2430
                    //         },
                    //         (err: any) => {
                    //             if (scriptedRef.current) {
                    //                 setStatus({ success: false });
                    //                 setErrors({ submit: err.message });
                    //                 setSubmitting(false);
                    //             }
                    //         }
                    //     );
                    // } catch (err: any) {
                    //     console.error(err);
                    //     if (scriptedRef.current) {
                    //         setStatus({ success: false });
                    //         setErrors({ submit: err.message });
                    //         setSubmitting(false);
                    //     }
                    // }
                }
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="fname"
                                    type="text"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    defaultValue=""
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lname"
                                    type="text"
                                    defaultValue=""
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    sx={{ ...theme.typography.customInput }}
                                />
                            </Grid>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={handleBlur}
                                // onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>
                        {/* ================================================================================ */}
                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="Phone no."
                                margin="normal"
                                name="phonno"
                                value={phonno}
                                onChange={(e) => setPhoneno(e.target.value)}
                                type="number"
                                defaultValue=""
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>
                        {/* ================================================================================== */}

                        <Grid item xs={12} sm={12}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                margin="normal"
                                name="Date of Birth"
                                type="date"
                                // onChange={handleDateChange}
                                // defaultValue="12/30/2022"
                                sx={{ ...theme.typography.customInput }}
                            />
                        </Grid>

                        {/* =============================================================== */}

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Prefer Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userlanguage}
                                label="Prefer Language"
                                onChange={handleLangChange}
                            >
                                <MenuItem value={'en'}>English</MenuItem>
                                <MenuItem value={'spa'}>Spanish</MenuItem>
                            </Select>
                        </FormControl>

                        {/* =============================================================== */}
                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                // onChange={(e) => {
                                //     handleChange(e);
                                //     changePassword(e.target.value);
                                // }}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {/* ================================================================================== */}
                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box
                                                style={{ backgroundColor: level?.color }}
                                                sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
