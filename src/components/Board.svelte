<script>
  export let onClick = _ => _

  function handleClick (e) {
    onClick(
      +e.target.getAttribute('data-score'),
      e.target.id
    )
  }

  const primSecoColorF = i => i % 2 ? 'primary' : 'secondary'
  const lightDarkColorF = i => i % 2 ? 'dark' : 'light'
  const boxShadowF = i => i % 2 ? '' : `box-shadow: var(--inner);`
  const scoresClockwise = [6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9,
                         12, 5, 20, 1, 18, 4, 13]

  const model = [
    {
      id: 'double',
      path: 'M 170.55,0 A 170.55,170.55 0 0 1 162.20269,52.70285 L 0,0 z',
      scoreF: i => scoresClockwise[i] * 2,
      colorF: primSecoColorF,
      boxShadowF: i => 'box-shadow: var(--emboss);'
    },
    {
      id: 'outer',
      path: 'M 161.45,0 A 161.45,161.45 0 0 1 153.54807,49.890794 L 0,0 z',
      scoreF: i => scoresClockwise[i],
      colorF: lightDarkColorF,
      boxShadowF: i => 'box-shadow: var(--emboss);'
    },
    {
      id: 'triple',
      path: 'M 107.55,0 A 107.55,107.55 0 0 1 102.28613,33.234779 L 0,0 z',
      scoreF: i => scoresClockwise[i] * 3,
      colorF: primSecoColorF,
      boxShadowF: i => 'box-shadow: var(--emboss);'
    },
    {
      id: 'inner',
      path: 'M 98.449997,0 A 98.449997,98.449997 0 0 1 93.631511,30.422723 L 0,0 z',
      scoreF: i => scoresClockwise[i],
      colorF: lightDarkColorF,
      boxShadowF: i => 'box-shadow: var(--emboss);'
    }
  ]
</script>

<style>
  svg {
    margin: 0 auto;
    grid-area: Dartboard;
    height: 100%;
    width: auto;
  }

  path {
    transition: fill 0.2s ease-in-out, transform 0.2s ease-in;
  }
</style>

<svg
  xmlns:svg="http://www.w3.org/2000/svg"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 453 453"
  id="dartboard"
  >
  <g id="board"
     transform="translate(226.5,226.5)">
    <g id="base">
      <path
        on:click={handleClick}
        id="boardbase"
        data-score="0"
        style="fill:var(--dark);"
        d="M 226.5 0 A 226.5 226.5 0 1 1  -226.5,2.7737334e-14 A 226.5 226.5 0 1 1  226.5 -5.5474668e-14 z"
        />
    </g>

    <g id="inside">
      {#each model as segment}
        <g id="{segment.id}">
          {#each Array(20).fill() as _, i}
            <path
              on:click={handleClick}
              d="{segment.path}"
              id="{segment.id}-{i}"
              data-score="{segment.scoreF(i)}"
              style="{boxShadowF(i)}; transform:rotate({- 9 + (i * 18)}deg); fill:var(--{segment.colorF(i)})"
              />
            {/each}
          </g>
        {/each}

      <path
        on:click={handleClick}
        id="single-bull"
        data-score="25"
        style="fill:var(--secondary)"
        d="M 16.450001 0 A 16.450001 16.450001 0 1 1  -16.450001,2.0144775e-15 A 16.450001 16.450001 0 1 1  16.450001 -4.0289551e-15 z"/>
      <path
        on:click={handleClick}
        id="double-bull"
        data-score="50"
        style="fill:var(--primary)"
        d="M 6.9000001 0 A 6.9000001 6.9000001 0 1 1  -6.9000001,8.449784e-16 A 6.9000001 6.9000001 0 1 1  6.9000001 -1.6899568e-15 z"
        />
    </g>

    <g id="numbers"
       style="font-size:22px;fill:var(--light);font-family:'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif">
      <text xml:space="preserve"
            x="-16.95171"
            y="-187.82498"
            id="text6007"><tspan id="tspan6009"
                                 x="-16.95171"
                                 y="-187.82498">20</tspan></text>
      <text xml:space="preserve"
            x="51.872234"
            y="-180.36624"
            id="text6895"><tspan id="tspan6897"
                                 x="51.872234"
                                 y="-180.36624">1</tspan></text>
      <text xml:space="preserve"
            x="100.0151"
            y="-150.53122"
            id="text6903"><tspan x="100.0151"
                                 y="-150.53122"
                                 id="tspan6907">18</tspan></text>
      <text xml:space="preserve"
            x="153.24347"
            y="-103.74449"
            id="text6911"><tspan id="tspan6913"
                                 x="153.24347"
                                 y="-103.74449">4</tspan></text>
      <text xml:space="preserve"
            x="173.92455"
            y="-45.769642"
            id="text6915"><tspan id="tspan6917"
                                 x="173.92455"
                                 y="-45.769642">13</tspan></text>
      <text xml:space="preserve"
            x="187.14688"
            y="9.1538963"
            id="text6966"><tspan id="tspan6968"
                                 x="187.14688"
                                 y="9.1538963">6</tspan><tspan x="187.14688"
                                                               y="37.153896"
                                                               id="tspan6970"/></text>
      <text xml:space="preserve"
            x="171.5513"
            y="67.467781"
            id="text6923"><tspan id="tspan6925"
                                 x="171.5513"
                                 y="67.467781">10</tspan></text>
      <text xml:space="preserve"
            x="142.7334"
            y="127.13781"
            id="text6927"><tspan id="tspan6929"
                                 x="142.7334"
                                 y="127.13781">15</tspan></text>
      <text xml:space="preserve"
            x="106.11771"
            y="169.85611"
            id="text6931"><tspan id="tspan6933"
                                 x="106.11771"
                                 y="169.85611">2</tspan></text>
      <text xml:space="preserve"
            x="42.718311"
            y="196.63982"
            id="text6975"><tspan id="tspan6977"
                                 x="42.718311"
                                 y="196.63982">17</tspan></text>
      <text xml:space="preserve"
            x="-6.1026163"
            y="208.16699"
            id="text6979"><tspan id="tspan6981"
                                 x="-6.1026163"
                                 y="208.16699">3</tspan></text>
      <text xml:space="preserve"
            x="-74.248497"
            y="199.01306"
            id="text6983"><tspan id="tspan6985"
                                 x="-70.248497"
                                 y="198.01306">19</tspan></text>
      <text xml:space="preserve"
            x="-123.74748"
            y="173.24644"
            id="text6987"><tspan id="tspan6989"
                                 x="-123.74748"
                                 y="173.24644">7</tspan></text>
      <text xml:space="preserve"
            x="-174.94165"
            y="127.13781"
            id="text6991"><tspan id="tspan6993"
                                 x="-174.94165"
                                 y="127.13781">16</tspan></text>
      <text xml:space="preserve"
            x="-193.58855"
            y="72.892326"
            id="text6995"><tspan id="tspan6997"
                                 x="-193.58855"
                                 y="72.892326">8</tspan></text>
      <text xml:space="preserve"
            x="-214.60867"
            y="8.8148642"
            id="text7011"><tspan id="tspan7013"
                                 x="-205.60867"
                                 y="8.8148642">11</tspan></text>
      <text xml:space="preserve"
            x="-208.50606"
            y="-48.820953"
            id="text7015"><tspan id="tspan7017"
                                 x="-200.50606"
                                 y="-48.820953">14</tspan></text>
      <text xml:space="preserve"
            x="-165.10965"
            y="-109.50809"
            id="text7019"><tspan id="tspan7021"
                                 x="-165.10965"
                                 y="-109.50809">9</tspan></text>
      <text xml:space="preserve"
            x="-134.25755"
            y="-152.22639"
            id="text7023"><tspan id="tspan7025"
                                 x="-134.25755"
                                 y="-152.22639">12</tspan></text>
      <text xml:space="preserve"
            x="-67.467812"
            y="-178.67107"
            id="text7027"><tspan id="tspan7029"
                                 x="-67.467812"
                                 y="-178.67107">5</tspan></text>
    </g>
  </g>
</svg>
