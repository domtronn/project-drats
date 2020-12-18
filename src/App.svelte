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
</style>

<main>
  {#if !state || !players}
    <Card>
      <GameForm onSubmit={startGame} />
    </Card>
    <Board />
  {:else}
    <Card>
      <Game state={state} players={players} />
    </Card>
    <Board onClick={move(game && game.moves.hitDart)}/>
  {/if}

{#if gameover}
  <ConfettiWinner
    amount={50}
    winner="Dom"
    />
  <Fireworks />
{/if}
</main>
