import { Grid } from '@mui/material';
import DashboardNavbar from 'components/DashboardNavbar';
import MDBox from 'components/MDBox';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { useEffect, useState } from 'react';
import { getGameTables } from 'services/tables';
import GameInfo from './game-info';

function CasinoGames() {
  let casinoId = window.location.pathname.split('/').pop();

  const [blackjackTables, setBlackjackTables] = useState();
  const [baccaratTables, setBaccaratTables] = useState();
  const [rouletteTables, setRouletteTables] = useState();
  const [slots, setSlots] = useState();
  const [jetpack, setJetpack] = useState();
  const [crash, setCrash] = useState();

  useEffect(() => {
    getGameTables('blackjack', casinoId).then((res) => setBlackjackTables(res));
    getGameTables('baccarat', casinoId).then((res) => setBaccaratTables(res));
    getGameTables('roulette', casinoId).then((res) => setRouletteTables(res));
    getGameTables('slots', casinoId).then((res) => setSlots(res));
    getGameTables('jetpack', casinoId).then((res) => setJetpack(res));
    getGameTables('crash', casinoId).then((res) => setCrash(res));
  }, []);

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox display='flex' justifyContent='space-between' alignItems='center'>
          <Grid container spacing={2} direction='row' justify='center' alignItems='stretch'>
            <GameInfo title='Blackjack' game={blackjackTables} to={`/blackjack-sessions/${casinoId}`}></GameInfo>
            <GameInfo title='Baccarat' game={baccaratTables} to={`/baccarat-sessions/${casinoId}`}></GameInfo>
            <GameInfo title='Roulette' game={rouletteTables} to={`/roulette-sessions/${casinoId}`}></GameInfo>
            <GameInfo title='Slots' game={slots} to={`/slot-sessions/${casinoId}`}></GameInfo>
            <GameInfo title='Jetpack' game={jetpack} to={`/jetpack-sessions/${casinoId}`}></GameInfo>
            <GameInfo title='Crash' game={crash} to={`/crash-sessions/${casinoId}`}></GameInfo>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default CasinoGames;
