import { Button, Card, CardActions, CardContent, Grid, Icon, Typography } from '@mui/material';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import { Link } from 'react-router-dom';

function GameInfo({ game, title, to }) {
  return (
    <Grid item xs={4}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent sx={{ pb: 0 }}>
          <Grid container pt={2}>
            <MDBox
              display='grid'
              justifyContent='center'
              alignItems='center'
              bgColor='info'
              color='white'
              width='2rem'
              height='2rem'
              shadow='md'
              borderRadius='lg'
              variant='gradient'
              mr={2}
              px={2}
            >
              <Icon fontSize='default'>casino</Icon>
            </MDBox>
            <Typography variant='h4' component='div' sx={{ mb: 2 }}>
              {title}
            </Typography>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Bets
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.bets ? game.bets : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Bets Amount ($)
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.bet_amounts ? game.bet_amounts : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Wins
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.wins ? game.wins : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Wins Amount ($)
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.win_amounts ? game.win_amounts : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Losses
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.loses ? game.loses : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Losses Amount ($)
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.lose_amounts ? game.lose_amounts : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Sessions Started
              </Typography>
              <Typography variant='h5' component='div' sx={{ mb: 1.5, fontSize: '16px' }}>
                {game?.sessions_started ? game.sessions_started : 0}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h5' component='div' sx={{ color: '#8b92a3', fontWeight: '400', fontSize: '18px' }}>
                Sessions Ended
              </Typography>
              <Typography variant='h5' component='div' sx={{ fontSize: '16px' }}>
                {game?.sessions_ended ? game.sessions_ended : 0}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
          <MDButton component={Link} size='small' color='info' to={to}>
            Show tables
          </MDButton>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default GameInfo;
