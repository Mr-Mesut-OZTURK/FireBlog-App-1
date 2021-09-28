import React, {useContext} from 'react';
import AuthContext from '../../context/AuthContext';

import { Formik } from 'formik';
import * as Yup from 'yup';

import Button from "@mui/material/Button"
import { Container, Typography, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { loginWithEmail, loginWithGoogle } from '../../helper/firebase';


const Login = () => {

    const value = useContext(AuthContext)
    console.log(value)

    const googleClick = () => {
       loginWithGoogle()
    }

    return (

        <Formik
            initialValues={{ firstName: '', password: '', email: '' }}

            validationSchema={Yup.object({
                firstName: Yup.string(),
                    // .max(15, 'Must be 15 characters or less')
                    // .required('Required'),
                email: Yup.string()
                    .email('Invalid email address')
                    .required('Required'),
                password: Yup.string()
                    .max(20, 'Must be 6 characters or much')
                    .required('Required'),
            })}

            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);

                loginWithEmail(values.email, values.password)
            }}
        >
            {formik => (
                <Container sx={{ with: "100%", pt: 7 }}>
                    <Typography
                        align="center"
                        variant="h3"
                    >
                        Login
                    </Typography>

                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                            maxWidth: 600,
                            minWidth: 300,
                            padding: "auto",
                            display: 'flex',
                            flexDirection: "column",
                            gridGap: 20,
                            p: 5,
                            margin: "auto"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="Name"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            disabled
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <Typography
                                sx={{
                                    color: "red",
                                    pl: 3,
                                    mt: -2,
                                }}
                            >
                                {formik.errors.firstName}</Typography>
                        ) : null}

                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <Typography
                                sx={{
                                    color: "red",
                                    pl: 3,
                                    mt: -2,
                                }}
                            >
                                {formik.errors.email}</Typography>
                        ) : null}

                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <Typography
                                sx={{
                                    color: "red",
                                    pl: 3,
                                    mt: -2,
                                }}
                            >
                                {formik.errors.password}</Typography>
                        ) : null}

                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                            sx={{ padding: 2 }}
                        >
                            Submit
                        </Button>

                        <Button
                            // type="submit"
                            // variant="contained"
                            size="large"
                            sx={{ padding: 2 }}
                            onClick={googleClick}
                        >
                            with Google
                        </Button>
                    </Box>

                </Container>

            )}
        </Formik>

    );
};


export default Login;
