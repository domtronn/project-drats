<script>
  import { onMount } from 'svelte'
  import Color from 'color'

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
    ;[...Array(9)]
      .forEach((_, i) => {
        doc.style.setProperty(`--t${i}`, Color(primary).mix(Color(secondary), i / 8).saturate(0.5).hex())
      })

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
    grid-area: Form;

    border-radius: 16px;
    padding: 16px 32px;
    margin: 32px;

    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  input, button {
    margin-bottom: 8px;
  }

  input {
    border: none;
    outline: none;
    background-color: #fafafa;
    padding: 16px;
    width: calc(100% - 32px);
  }

  button {
    border: none;
    outline: none;
  }

  p button {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: white;
    background-color: var(--primary);
  }

  button:hover:not([disabled]) {
    cursor: pointer;
  }

  button.btn {
    width: 100%;
    padding: 16px 32px;
    border-radius: 8px;
    display: block;
  }

  button:disabled,
  button[disabled]
  {
    border: 2px solid #c2c2c2;
    color: #c2c2c2;
  }

  .secondary {
    font-weight: bold;
    border: 2px solid var(--secondary);
    color: var(--secondary);
  }

  .primary {
    font-weight: bold;
    border: 2px solid var(--primary);
    color: var(--primary);
  }

  button.swatch {
    display: inline-block;
    margin: 8px;

    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    transition: transform 0.2s ease-in-out;
  }

  button.swatch:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  button.swatch p {
    margin: 0;
    width: 46px;
    height: 46px;
    transform: rotate(45deg);
    position: absolute;
    top: 9px;
    left: 9px;
  }
</style>

<div>
  <h1>Drats!</h1>
  {#each players as p, i}
    <p>{p} <button on:click={removePlayer(i)}>x</button></p>
  {/each}
  <input bind:value={value} />

  <button
    class='btn secondary'
    on:click={addPlayer}
    disabled={addDisabled}
  >
    Add another player
  </button>
  <button
    class="btn primary"
    on:click={() => onSubmit(players)}
    disabled={submitDisabled}
  >
    Start game
  </button>

  {#each colors as c}
    <button
      class="swatch"
      on:click={() => setTheme(c)}
      style="background-color: {c[0]};"
      >
      <p style="background-color: {c[1]};" />
    </button>
  {/each}

</div>
