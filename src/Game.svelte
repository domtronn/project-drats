<script>
  export let state, players

  import ScoreTable from './components/ScoreTable.svelte'
  import { DartsStub } from './game'

  $: ctx = state.ctx
  $: player = state.ctx.currentPlayer
  $: scores = state.G.scores
  $: throws = state.G.throws[0].map((_, i) => state.G.throws.map(ts => ts[i] || []))

  $: hint = state.G.scores[player] <= 170
    ? DartsStub.getCheckoutHint(state.G.scores[player], 3 - state.ctx.numMoves)
    : ''

</script>

<style>
  h2 {
    text-align: center;
    position: absolute;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);

    transition: filter 0.2s ease-in-out;
    filter: blur(9px);
  }

  h2:hover {
    cursor: pointer;
    filter: blur(0px);
  }
</style>

<ScoreTable
  active={player}
  players={players}
  scores={scores}
  throws={throws}
  />

{#if hint && hint[0]}
  <h2>{hint[0]}</h2>
{/if}
