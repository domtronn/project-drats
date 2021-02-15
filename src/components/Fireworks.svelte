<script>
  import Firework from './Firework.svelte'
  export let amount = 4

  const fireworks = [...Array(amount)]
</script>

{#each fireworks as _, i}
  <Firework
    duration={100 + (Math.random() * 60)}
    opacityDuration={2000}
    delay={i * ((Math.random() * 100) + 600)}
  />
{/each}
