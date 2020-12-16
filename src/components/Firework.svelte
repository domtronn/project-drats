<script>
  import { onMount } from 'svelte'
  export let duration = 100, delay = 0, opacityDuration = duration * 40

  const gravity = 0.2
  const tdelta = 0.7
  let lights = []

  const reset = () => {
    const [x, y] = [
      window.innerWidth * ((Math.random() / 2) + 0.25),
      window.innerHeight * ((Math.random() / 2)),
    ]

    return [...Array(36)]
      .map((_, i) => {
        return {
          i: i,
          x0: x, y0: y, x: x, y: y,
          direction: i % 2 ? -1 : 1,
          theta: Math.PI / 18 - ~~(i / 2),
          v0: 1 + Math.random() * 6,
          t: 0,
          opacity: 1,
        }
      })
  }

  onMount(() => {
    let frame, t0
    lights = reset()

    function loop (t) {
      frame = requestAnimationFrame(loop)

      if (lights[0].t > duration) return lights = reset()

      lights = lights.map(l => ({
        ...l,
        t: l.t + tdelta,
        x: l.x0 + ((l.v0 * l.t * Math.cos(l.theta)) * l.direction),
        y: l.y0 - ((l.v0 * l.t * Math.sin(l.theta)) - (0.5 * gravity * l.t * l.t)),
        opacity: l.opacity - (l.t / opacityDuration)
      }))
    }

    setTimeout(loop, delay)

    return () => cancelAnimationFrame(frame)
  })

</script>

<style>
  span {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
</style>

{#each lights as l}
  <span style="background-color: var(--{l.i % 2 ? 'primary' : 'secondary'}); opacity: {l.opacity}; top: {l.y}px; left: {l.x}px;" />
{/each}
