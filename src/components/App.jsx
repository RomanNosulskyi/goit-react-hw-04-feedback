import { useState } from 'react';
import { OnFeedbackOptions } from './Feedback/FeedbackOptions/FeedbackOptions';
import { OnStats } from '../components/Feedback/Statistics/Statistics';
import { Notification } from '../components/Feedback/Notification/Notification';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const params = {
    good,
    neutral,
    bad,
  };
  const options = Object.keys(params);

  const countTotalFeedback = (good, neutral, bad) => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = (
    good,
    neutral,
    bad,
    countTotalFeedback
  ) => {
    const summ = (good * 100) / countTotalFeedback(good, neutral, bad);
    return Math.round(summ);
  };

  const onLeaveFeedback = type => {
    switch (type) {
      case `good`:
        setGood(PrevState => PrevState + 1);
        break;
      case `neutral`:
        setNeutral(PrevState => PrevState + 1);
        break;
      case `bad`:
        setBad(PrevState => PrevState + 1);
        break;
      default:
        return;
    }
  };
  return (
    <>
      <OnFeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      {countTotalFeedback(good, neutral, bad) !== 0 ? (
        <OnStats
          positivePercentage={countPositiveFeedbackPercentage(
            good,
            bad,
            neutral,
            countTotalFeedback
          )}
          good={good}
          bad={bad}
          neutral={neutral}
          total={countTotalFeedback(good, neutral, bad)}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};
export { App };
