<script>
  export let state

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

<ScoreTable
  active={player}
  players={Object.keys(scores)}
  scores={scores}
  throws={throws}
  />

{#if hint && hint[0]}
  <h2>{hint[0]}</h2>
{/if}
