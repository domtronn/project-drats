<script>
  import { onMount } from 'svelte'
  import IoIosStar from 'svelte-icons/io/IoIosStar.svelte'

  export let amount = 400, winner, onReset = _ => _

  let confetti = [...Array(amount)]
      .map((_, i) => {
        const initX = Math.random() * 100
        return {
          i: i,
          initX: initX,
          x: initX,
          y: -(Math.random() * 40) - Math.random() * 100,
          r: 0.1 + Math.random() * 1,
          opacity: Math.random(),
          speed: (Math.random() / 2) + 0.5,
        };
      })
    .sort((a, b) => a.r - b.r);

  onMount(() => {
    let frame
    function loop() {
      frame = requestAnimationFrame(loop)

      confetti = confetti.map(c => {
        c.y += c.speed * c.r
        c.x = c.initX + Math.sin(c.y / 10)
        c.opacity += c.speed / 100
        if (c.y > 120) c.y = -20
        return c
      })
    }
    loop()

    return () => cancelAnimationFrame(frame)
  })
</script>

<style>
  body {
    overflow: hidden;
  }

  span {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-size: 5vw;
  }

  .container {
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .card {
    padding: 64px;
  }

</style>

<div class='container'>
  <div class='card'>
    <h1>{winner}</h1>
    <button
      on:click={onReset}
      class='block primary'
      >
      Start new game
    </button>
  </div>
</div>

{#each confetti as c}
  <span style="background-color: var(--t{c.i % 9}); opacity: {Math.abs((c.opacity % 1) - 0.5) + 0.5}; left: {c.x}%; top: {c.y}%; transform: scale({c.r})"></span>
{/each}
