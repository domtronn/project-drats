<script>
  import IoIosClose from 'svelte-icons/io/IoIosClose.svelte'
  import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte'

  import { onMount } from 'svelte'
  import Color from 'color'

  export let onSubmit = _ => _

  let value = ''
  let players = []
  const colors = [
    ['#e8d032', '#1721d2', '#0C152E', '#f2f3f7'],
    ['#e0906d', '#4f07b4', '#0C152E', '#f2f3f7'],
    ['#a8fafa', '#fc5aac', '#0C152E', '#f2f3f7'],
    ['#9bf290', '#f36a49', '#0C152E', '#f2f3f7'],
    ['#8fffa2', '#792afe', '#0C152E', '#f2f3f7']
  ]

  const onKeyPress = (e) => {
    if (e.charCode === 13 && e.shiftKey && players.length) return onSubmit(players)
    if (e.charCode === 13) return addPlayer()
  }

  const addPlayer = () => {
    if (!value.length) return
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
  input, button, p, div {
    margin-top: 0;
    margin-bottom: 24px;
  }

  p {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
  }

  p button, .icon, div > input { margin: 0; }

  input + button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
  }

  div {
    position: relative;
  }

  .swatch, .swatch div {
    margin-top: 0;
    margin-bottom: 0;
  }

</style>

<h1>Drats!</h1>

<div>
  <input
    on:keypress={onKeyPress}
    bind:value={value}
    />
  <button
    class='icon'
    on:click={addPlayer}
    disabled={addDisabled}
    >
    <MdPersonAdd />
  </button>
</div>

{#each players as p, i}
  <p>
    <span>{p}</span>
    <button class='icon' on:click={removePlayer(i)}>
      <IoIosClose />
    </button>
  </p>
{/each}

<button
  class="block primary"
  on:click={() => onSubmit(players)}
  disabled={submitDisabled}
  >
  Start game
</button>

{#each colors as c}
  <div class='swatch'>
    <input
      name="theme"
      type="radio"
      on:click={() => setTheme(c)}
    />
    <div>
      <span>
        <span style="background-color: {c[0]}" >
          <span style="background-color: {c[1]}" > </span>
        </span>
      </span>
    </div>
  </div>
{/each}
