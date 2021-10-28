<script>
  import { Client } from 'boardgame.io/client'
  import { Debug } from 'boardgame.io/debug';
  import { Darts } from './game.js'

  import Game from './Game.svelte'
  import GameForm from './GameForm.svelte'

  import Card from './components/Card.svelte'
  import Board from './components/Board.svelte'
  import ConfettiWinner from './components/ConfettiSvelte.svelte'
  import Fireworks from './components/Fireworks.svelte'

  import GiDart from 'svelte-icons/gi/GiDart.svelte'

  let game, gameover, state, players

  const startGame = (p) => {
    players = p
    game = Client({ game: Darts, numPlayers: p.length })
    game.start()
    state = game.getState()
  }

  const move = (f = _ => _) => (...args) => {
    f(...args)
    state = game.getState()
  }

  $: gameover = state && state.ctx.gameover

</script>

<style>
  main {
    height: 100vh;
    width: 100vw;

    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr 15fr 1fr;
    gap: 0px 0px;
    grid-template-areas:
      ". ."
      "Form Dartboard"
      ". .";
  }

  .icon {
    color: var(--primary-1);
    width: 64px;
    margin: 0 auto 12px;
  }
</style>

<main>
  {#if !state || !players}
    <Card>
      <div class='icon'><GiDart /></div>
      <GameForm onSubmit={startGame} />
    </Card>
    <Board />
  {:else}
    <Card>
      <div class='icon'><GiDart /></div>
      <Game state={state} players={players} />
    </Card>
    <Board onClick={move(game && game.moves.hitDart)}/>
  {/if}


  {#if gameover}
    <ConfettiWinner
      amount={50}
      winner="Dom"
      onReset={startGame}
      />
    <Fireworks />
  {/if}
</main>
