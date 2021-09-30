import React from 'react'

import { useFormik } from 'formik';

// import alertify from 'alertifyjs';

import Button from "@mui/material/Button"
import { Container, Typography,TextField } from '@mui/material';
import {  Box } from '@mui/system';

import { register } from '../../helper/firebase';


const validate = values => {

    const errors = {}

    // if (!values.firstName) {
    //     errors.firstName = "required"
    // } else if (values.firstName.length > 15) {
    //     errors.firstName = "Must be 15 character or less"
    // }

    if (!values.email) {
        errors.email = "required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password1) {
        errors.password1 = "required"
    } else if (values.password1.length < 6) {
        errors.password1 = "Must be 5 character or less"
    }

    if (!values.password2) {
        errors.password2 = "required"
    } else if (values.password2.length < 6) {
        errors.password2 = "Must be 5 character or less"
    }

    if (values.password1 !== values.password2) {
        errors.password1 = "2 password must be equal"
        errors.password2 = "2 password must be equal"
    }

    return errors
}



const Register = () => {

    const formik = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password1: "",
            password2: ""
        },
        validate: validate,
        onSubmit: values => {
            // alertify.succes("Submit is success!...")
            console.log(values)
            register(values.email, values.password1)            
        }
    })


    return (
        <Container sx={{ with: "100%",pt:7 }}>
            <Typography
                align="center"
                variant="h3"
            >
            Register
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
                            mt:-2,
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
                            color:"red",
                            pl: 3,
                            mt:-2,
                        }}
                    >
                    {formik.errors.email}</Typography>
                ) : null}


                <TextField
                    id="password1"
                    name="password1"
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password1}
                />
                {formik.touched.password1 && formik.errors.password1 ? (
                    <Typography
                        sx={{
                            color: "red",
                            pl: 3,
                            mt:-2,
                        }}
                    >
                    {formik.errors.password1}</Typography>
                ) : null}

                <TextField
                    id="password2"
                    name="password2"
                    type="password"
                    label="Password again..."
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password2}
                />
                {formik.touched.password2 && formik.errors.password2 ? (
                    <Typography
                        sx={{
                            color: "red",
                            pl: 3,
                            mt:-2,
                        }}
                    >
                    {formik.errors.password2}</Typography>
                ) : null}

                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{padding:2}}
                >
                    Register
                </Button>

            </Box>
        </Container>
    )
}

export default Register

