import React from 'react';

export const getKey = () => Math.round(Date.now() * Math.random());
export const getRandom = (num) => Math.floor(Math.random() * num) + 1;
export const pipeNumComma = (num) => `${num}`.split('').reverse().reduce(pipeNum, []).reverse().join('');

const pipeNum = (t, n, i, a) => {
  t.push(n);
  if ((i + 1) % 3 === 0 && i !== a.length - 1) { t.push(',') }
  return t;
}

const residentsFormat = (array) => {
  const residents = array.map((e, i) => <article key={getKey()}>{e}</article>);
  return (
    <section className="residents">
      {residents}
    </section>
  );
}

export const formatData = (key, value) => {
  switch (key) {
    case 'population':
      if (isNaN(parseInt(value, 0))) {
        return value;
      }
      return pipeNumComma(value);
    case 'residents':
      return residentsFormat(value);
    default:
      return value;
  }
}
