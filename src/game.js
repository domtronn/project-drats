import { INVALID_MOVE } from 'boardgame.io/core'
import dartsCore from 'darts-scorer-core'

const { Darts501Game: G501 } = dartsCore.default.games

const scoreToThrow = (score, id) => {
  if (id === 'double-bull') return 'DB'
  if (id === 'single-bull') return 'SB'
  if (id.startsWith('triple')) return `T${score / 3}`
  if (id.startsWith('double')) return `D${score / 2}`
  return score
}

export const DartsStub = new G501(['stub'])
export const Darts = {
  minPlayers: 1,
  maxPlayers: 4,

  setup: ({ numPlayers }, {
    points = 301,
    doubleIn = true,
    doubleOut = true
  } = {}) => ({
    doubleOut,
    lastDart: '',
    startingScore: points,
    scores: Array(numPlayers)
      .fill(points),
    throws: Array(numPlayers)
      .fill([])
  }),

  moves: {
    noop: () => {},

    hitDart: (G, ctx, score, id) => {
      console.log(G, ctx, score, id)
      if (score > 60 || score < 0) return INVALID_MOVE

      /**
       * Prevent singles and triples for double in
       */
      if (
        G.scores[+ctx.currentPlayer] === G.startingScore &&
          G.doubleIn &&
          !id.startsWith('double')
      ) return

      G.lastDart = id

      const currscore = G.scores[+ctx.currentPlayer]

      let bust = true
      if (G.doubleOut && score === currscore && id.startsWith('double'))
        bust = false
      if (G.doubleOut && score < currscore - 1)
        bust = false
      if (!G.doubleOut && score <= currscore)
        bust = false

      const dartThrow = { val: score, txt: scoreToThrow(score, id), bust }

      const modTurn = Math.ceil(ctx.turn / ctx.numPlayers) - 1
      G.throws[+ctx.currentPlayer][modTurn]
        ? G.throws[+ctx.currentPlayer][modTurn].push(dartThrow)
        : G.throws[+ctx.currentPlayer].push([dartThrow])

      if (!bust) G.scores[+ctx.currentPlayer] -= score
      else ctx.numMoves === 2
        ? ctx.events.endTurn()
        : ctx.events.endPhase()
    }
  },

  endIf: (G, ctx) => {
    if (
      (G.doubleOut && G.lastDart.startsWith('double')) &&
      G.scores[+ctx.currentPlayer] === 0
    )
      return { winner: ctx.currentPlayer }

    if (!G.doubleOut && G.scores[+ctx.currentPlayer === 0])
      return { winner: ctx.currentPlayer }

  },

  turn: {
    moveLimit: 3
  }
}
