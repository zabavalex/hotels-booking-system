import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';

function setupColors(type: 'border' | 'background') {
  const isBorder = type === 'border';
  return [
    `hsla(347, 100%, 69%, ${isBorder ? 1 : 0.2})`,
    `hsla(204, 82%, 57%, ${isBorder ? 1 : 0.2})`,
    `hsla(43, 100%, 67%, ${isBorder ? 1 : 0.2})`,
  ];
}

interface Props {
  labels: string[];
  values: number[];
}

const TransChart = ({ labels, values }: Props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      options: {
        aspectRatio: 3,
        legend: {
          display: false,
        },
        tooltips: {
          enabled: false,
        },
      },
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: setupColors('background'),
            borderColor: setupColors('border'),
            borderWidth: 1,
          },
        ],
      },
    });
    return () => {
      chart.destroy();
    };
  }, [labels, values]);

  return <canvas ref={canvasRef} />;
};

export default TransChart;
