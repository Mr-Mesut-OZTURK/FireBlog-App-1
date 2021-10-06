import React, { useState, useEffect, useContext } from 'react'
import { DataContext } from '../../context/DataContext'
import { useHistory, useParams } from 'react-router'
import { Container, Typography, TextField, Button } from '@mui/material'


import * as Yup from 'yup';
import { useFormik } from 'formik';


import { auth, updatePost } from '../../helper/firebase';

const exampleData = {
    comments: [],
    content: "deneme",
    imgUrl: "https://cdnuploads.aa.com.tr/uploads/PhotoGallery/2020/06/26/thumbs_b2_60a632b2b2697bce69ab60bf0f73bdf8.jpg",
    likes: ['yakup@gmail.com', 'mesut8311006@gmail.com'],
    time: "27.09.2021 08:27:17",
    title: "Kelebeğin Rüyası",
    writer: "mesut8311006@gmail.com",

}


const UpdatePost = () => {

    const history = useHistory()
    const { id } = useParams()
    // console.log(id)

    const { posts } = useContext(DataContext)
    // console.log(posts.filter((item) =>console.log(item.id, postId)))


    const [data, setData] = useState(posts.length?posts.filter((item) =>item.id===id)[0].data():exampleData)
    
    
    
    
    
    useEffect(() => {
        
        setData(posts.length?posts.filter((item) =>item.id===id)[0].data():exampleData)
        console.log(data)

    }, [])



    const formik = useFormik({
        initialValues: {
            title: data.title,
            imgUrl: data.imgUrl,
            content: data.content,
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
            // console.log(data)
            // console.log(formik.values)
            if (
                (formik.values.title !== "") &&
                (formik.values.imgUrl !== "") &&
                (formik.values.content !== "")
            ){
                updatePost(data, values, id)
                history.push("/profile")
                setTimeout(()=>{
                    window.location.reload()
                },1000)
            }
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
                UPDATE POST
            </Typography>

            <TextField
                id="title"
                name="title"
                type="text"
                // label="Title"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                // label="Image url..."
                variant="outlined"
                value={formik.values.imgUrl}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                // label="content"
                variant="outlined"
                multiline
                minRows={5}
                value={formik.values.content}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
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


export default UpdatePost
