<script>
  import { onMount } from 'svelte'
  export let onSubmit = _ => _

  let value = ''
  let players = []
  const colors = [
    ['#e8d032', '#1721d2', '#141414', 'white'],
    ['#e0906d', '#4f07b4', '#2b2b2b', '#dee7e5'],
    ['#fc5aac', '#a8fafa', '#141414', 'white'],
    ['#9bf290', '#f36a49', '#141414', 'white'],
    ['#792afe', '#8fffa2', '#141414', 'white']
  ]

  const addPlayer = () => {
    players = players.concat(value)
    value = ''
  }

  const removePlayer = (i) => () => {
    players = players.filter((_, j) => j !== i)
  }

  const setTheme = ([primary, secondary, dark, light]) => {
    const doc = document.documentElement
    doc.style.setProperty('--primary', primary)
    doc.style.setProperty('--secondary', secondary)
    dark && doc.style.setProperty('--dark', dark)
    light && doc.style.setProperty('--light', light)
  }

  $: addDisabled = value.length === 0
  $: submitDisabled = players.length === 0

  onMount(() => {
    setTheme(colors[0])
  })

</script>

<style>
  div {
    border-radius: 16px;
    position: absolute;
    padding: 16px 32px;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  button {
    display: block;
  }

  button p {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
</style>

<div>
  <h1>Drats!</h1>
  {#each players as p, i}
    <span>{p} <button on:click={removePlayer(i)}>x</button></span>
  {/each}
  <input bind:value={value} />
  <pre>{value}</pre>
  <button
    on:click={addPlayer}
    disabled={addDisabled}
  >
    Add another player
  </button>
  <button
    on:click={() => onSubmit(players)}
    disabled={submitDisabled}
  >
    Start game
  </button>

  {#each colors as c}
    <button
      on:click={() => setTheme(c)}
      >
      <p style="background-color: {c[0]}"/>
      <p style="background-color: {c[1]}"/>
    </button>
  {/each}

</div>
