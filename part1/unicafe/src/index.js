import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistic = ({ text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad}) => {
  const getTotal = () => good + neutral + bad

  const getAverage = () => {
    const average = ((good * 1) + (bad * (-1)))/getTotal()
    return Number.isNaN(average) ? 0 : average
  }

  const getPositivePercentage = () => {
    const positivePercentage = good/getTotal() * 100
    return Number.isNaN(positivePercentage) ? 0 : positivePercentage
  }

  if (good || neutral || bad) {
    return (
      <div>
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={getTotal()} />
            <Statistic text='average' value={getAverage()} />
            <Statistic text='positive' value={getPositivePercentage() + '%'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>No feedback given</div>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)