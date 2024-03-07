import  { useState } from 'react';

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        <p>{props.text}</p>
      </td>
      <td>
        <p>{props.value}</p>
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const x = props.all !== 0 ? (
    <div>
      <h1>Statistics</h1>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={0.5} />
      <StatisticLine text="positive" value={props.positivePercentage + "%"} />
    </div>
  ) : (
    <div>
      <h1>Statistics</h1>
      <p>No feedback is given</p>
    </div>
  );

  return x;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
    setPositivePercentage(((good + 1) / (all + 1)) * 100);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setPositivePercentage((good / (all + 1)) * 100);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setPositivePercentage((good / (all + 1)) * 100);
  };

  return (
    <div>
      <h1>give feedbacks</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} positivePercentage={positivePercentage} />
    </div>
  );
};

export default App;
