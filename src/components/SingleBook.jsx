import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Grid, ButtonBase } from '@mui/material';
import { styled } from '@mui/material';

const SingleBook = () => {
  const [singleBook, setSingleBook] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    const fetchSingleBook = () => {
      fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`, {
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setSingleBook(result);
        })
        .catch(console.error);
    };
    fetchSingleBook();
  }, [bookId]);

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        marginTop: 5,
        padding: 4,
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
      }}
    >
      <Grid
        container
        spacing={8}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <Grid item>
          <ButtonBase sx={{ width: 350, height: 450, marginBottom: '-25px' }}>
            <Img src={singleBook.coverimage} alt={singleBook.title} width='350' height='450' />
          </ButtonBase>
        </Grid>

        <Grid item xs={2} sm container sx={{ justifyContent: 'center', alignItem: 'center' }}>
          <Grid item xs container direction='column' spacing={4}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                Description: {singleBook.description}
              </Typography>
              <br></br>

              <Typography variant='body2' gutterBottom align='center' sx={{ fontWeight: 'bold' }}>
                {singleBook.title}
              </Typography>

              <Typography variant='body2' gutterBottom align='center'>
                By: {singleBook.author}
              </Typography>

              <Typography variant='body2' gutterBottom align='center'>
                Available: {singleBook.coverimage ? 'Yes' : 'No'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleBook;
