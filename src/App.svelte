<script>
  import { Client } from 'boardgame.io/client'
  import { Debug } from 'boardgame.io/debug';
  import { Darts } from './game.js'

  import Game from './Game.svelte'
  import GameForm from './GameForm.svelte'

  import Board from './components/Board.svelte'
  import ConfettiWinner from './components/ConfettiSvelte.svelte'
  import Fireworks from './components/Fireworks.svelte'

  let game, gameover, state

  const startGame = (players) => {
    game = Client({ game: Darts, numPlayers: players.length })
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
</style>

<main>

{#if !state}
  <GameForm onSubmit={startGame} />
  <Board />
{:else}
  <Game state={state} />
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
