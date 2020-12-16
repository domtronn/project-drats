<script>
  export let players, scores, throws, active
  console.log(players)
</script>

<style>
  table {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: 32px;
    padding: 32px;
  }

  th {
    font-size: 1.5em;
  }

  th.active {
    font-weight: bold;
    color: red;
  }

  tr { width: auto; }
  td, th { width: 120px; }

  span {
    margin: 0 8px;
  }

  span.bust {
    color: red;
  }

</style>

<table>
  <tr class='players'>
    {#each players as player, i}
      {#if i == active}
        <th class='active'>{player}</th>
      {:else}
        <th>{player}</th>
      {/if}
    {/each}
  </tr>

  <tr class='scores'>
    {#each scores as score}
      <td>{score}</td>
    {/each}
  </tr>

  {#each throws as ts}
    <tr>
      {#each ts as t}
        <td>
          {#each t as s}
            {#if s.bust}
              <span class='bust'>
                {s.txt}
              </span>
            {:else}
              <span>
                {s.txt}
              </span>
            {/if}
          {/each}
        </td>
      {/each}
    </tr>
  {/each}
</table>
