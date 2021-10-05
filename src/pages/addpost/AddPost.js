import React, { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { addData, auth, getData } from '../../helper/firebase';
import { DataContext } from '../../context/DataContext';


const AddPost = () => {

  const { setPosts } = useContext(DataContext)

  useEffect(()=> {
    const data = getData(setPosts)
    // console.log("object")
    return data
  }, [setPosts])

  const userEmail = auth.currentUser.email

  const formik = useFormik({
    initialValues: {
      title: "",
      imgUrl: "",
      content: "",
      writer: "",
      time: "",
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, 'Must be 30 characters or less')
        .required('Required'),
      imgUrl: Yup.string()
        // .max(20, 'Must be 20 characters or less')
        .required('Required'),
      content: Yup.string().required('Required'),
    }),

    onSubmit: values => {
      values.time = new Date().toLocaleString()
      values.writer = userEmail
      alert(JSON.stringify(values, null, 2));
      addData(values)
      // console.log(values)
    },

  });

  return (

    <Container
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gridGap: 20,
        maxWidth: "500px",
        boxShadow: "0 0 10px 0 black",
        p: 5,
        my: 10,

      }}
    >
      <Typography
        align="center"
        variant="h3"
      >
        ADD POST
      </Typography>

      <TextField
        id="title"
        name="title"
        type="text"
        label="Title"
        variant="outlined"
        {...formik.getFieldProps('title')}
      />
      {formik.touched.title && formik.errors.title ? (
        <Typography
          sx={{
            color: "red",
            pl: 3,
            mt: -2,
          }}
        >{formik.errors.title}</Typography>
      ) : null}

      <TextField
        id="imgUrl"
        type="text"
        name="imgUrl"
        label="Image url..."
        variant="outlined"
        {...formik.getFieldProps('imgUrl')}
      />
      {formik.touched.imgUrl && formik.errors.imgUrl ? (
        <Typography
          sx={{
            color: "red",
            pl: 3,
            mt: -2,
          }}
        >{formik.errors.imgUrl}</Typography>
      ) : null}

      <TextField
        id="content"
        type="textarea"
        name="content"
        label="content"
        variant="outlined"
        multiline
        minRows={5}
        {...formik.getFieldProps('content')} />
      {formik.touched.content && formik.errors.content ? (
        <Typography
          sx={{
            color: "red",
            pl: 3,
            mt: -2,
          }}
        >{formik.errors.content}</Typography>
      ) : null}

      <Button variant="contained" type="submit">Submit</Button>

    </Container>

  );
};


export default AddPost
