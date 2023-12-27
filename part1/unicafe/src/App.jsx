import { useState } from 'react';

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => (setGood(good + 1));
  const handleNeutral = () => (setNeutral(neutral + 1)); 
  const handleBad = () => (setBad(bad + 1)); 

  function getTotal(){
    return good + neutral + bad;
  }

  function getAvg(){
    return (good - bad) / getTotal();
  }

  function getPositive(){
    return good * 100 / getTotal();
  }

  if (getTotal() == 0) {
    return (
      <div>
      <div><h1>give feedback</h1></div>
      <div>
        <Button 
        text="good"
        handleClick={handleGood} />

        <Button 
        text="neutral"
        handleClick={handleNeutral} />

        <Button 
        text="bad"
        handleClick={handleBad} />
      </div>
      <div>
        <div><h1>statistics</h1></div>
        <div><h3>no feedback given</h3></div>
      </div>
    </div>
    );
  }

  return (
    <div>
      <div><h1>give feedback</h1></div>
      <div>
        <Button 
        text="good"
        handleClick={handleGood} />

        <Button 
        text="neutral"
        handleClick={handleNeutral} />

        <Button 
        text="bad"
        handleClick={handleBad} />
      </div>
      <div>
        <div><h1>statistics</h1></div>
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <StatisticLine
                  text="good"
                  value={good}
                />
              </tr>
              <tr>
                <StatisticLine
                  text="neutral"
                  value={neutral}
                />
              </tr>
              <tr>
                <StatisticLine
                  text="bad"
                  value={bad}
                />
              </tr>
              <tr>
                <StatisticLine
                  text="all"
                  value={getTotal()}
                />
              </tr>
              <tr>
                <StatisticLine
                  text="average"
                  value={getAvg()}
                />
              </tr>
              <tr>
                <StatisticLine
                  text="positive"
                  value={getPositive()}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Button = ({ text, handleClick }) => (<button onClick={handleClick}>{text}</button>);

const StatisticLine = ({ text, value }) => (<><td>{text}</td><td>{value}</td></>);

export default App