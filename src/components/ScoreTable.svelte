<script>
  export let players, scores, throws, active
</script>

<style>
  table {
    margin: 0 auto;
  }

  th {
    font-size: 1.5em;
  }

  .active {
    font-weight: bold;
    color: var(--primary-1);
  }

  tr { width: auto; }
  td, th { width: 120px; }

  span {
    margin: 0 8px;
  }

  span.bust {
    color: var(--primary-1);
  }

  .scores td {
    font-size: 3em;
    font-weight: bold;
    margin: 0;
  }

</style>

<table>
  <tr class='players'>
    {#each players as player, i}
      <th class:active={i == active}>
        {player}
      </th>
    {/each}
  </tr>

  <tr class='scores'>
    {#each scores as score, i}
      <td class:active={i == active}>
        {score}
      </td>
    {/each}
  </tr>

  {#each throws as ts}
    <tr>
      {#each ts as t}
        <td>
          {#each t as s}
            <span class:bust={s.bust}>
              {s.txt}
            </span>
          {/each}
        </td>
      {/each}
    </tr>
  {/each}
</table>
