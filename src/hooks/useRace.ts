import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setCarVelocities,
  setCarRaceStatus,
  setCarPositions,
  setRaceStarted,
  resetRaceState,
} from '../pages/garage/garageSlice';
import { addWinner } from '../pages//winners/winnersSlice';
import type { Car } from '../types/types';

export const useRace = () => {
  const dispatch = useAppDispatch();
  const { carVelocities, carRaceStatus, raceStarted, carPositions } =
    useAppSelector((state) => state.garage);
  const { cars } = useAppSelector((state) => state.garage);

  const [winnerBanner, setWinnerBanner] = useState<string | null>(null);
  const winnerTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (raceStarted && Object.keys(carVelocities).length === cars.length) {
      const distance = 1000000;
      const scale = 0.002;

      const finishTimes = cars.map((car) => ({
        id: car.id,
        name: car.name,
        time: (distance / (carVelocities[car.id] || 1)) * scale,
      }));

      const winner = finishTimes.reduce(
        (min, car) => (car.time < min.time ? car : min),
        finishTimes[0],
      );

      dispatch(
        addWinner({
          id: winner.id,
          name: winner.name,
          time: winner.time,
          color: cars.find((c) => c.id === winner.id)?.color,
        }),
      );

      const positions: { [id: number]: number } = {};
      cars.forEach((car) => {
        positions[car.id] = 80;
      });
      dispatch(setCarPositions(positions));

      if (winnerTimeout.current) clearTimeout(winnerTimeout.current);
      winnerTimeout.current = setTimeout(() => {
        setWinnerBanner(`${winner.name} wins in ${winner.time.toFixed(2)}s!`);
      }, winner.time * 1000);
    }

    return () => {
      if (winnerTimeout.current) clearTimeout(winnerTimeout.current);
    };
  }, [raceStarted, carVelocities, cars]);

  const startRace = async () => {
    const velocities: { [id: number]: number } = {};
    const status: { [id: number]: boolean } = {};

    await Promise.all(
      cars.map(async (car) => {
        const res = await fetch(
          `http://localhost:3000/engine?id=${car.id}&status=started`,
          { method: 'PATCH' },
        );
        const data = await res.json();
        velocities[car.id] = data.velocity;
        status[car.id] = true;
      }),
    );

    dispatch(setCarVelocities(velocities));
    dispatch(setCarRaceStatus(status));
    dispatch(setRaceStarted(true));
  };

  const driveOne = async (car: Car) => {
    const res = await fetch(
      `http://localhost:3000/engine?id=${car.id}&status=started`,
      { method: 'PATCH' },
    );
    const data = await res.json();
    dispatch(setCarVelocities({ ...carVelocities, [car.id]: data.velocity }));
    dispatch(setCarRaceStatus({ ...carRaceStatus, [car.id]: true }));
    dispatch(setCarPositions({ ...carPositions, [car.id]: 80 }));
    dispatch(setRaceStarted(true));
  };

  const stopOne = async (car: Car) => {
    await fetch(`http://localhost:3000/engine?id=${car.id}&status=stopped`, {
      method: 'PATCH',
    });
    dispatch(setCarRaceStatus({ ...carRaceStatus, [car.id]: false }));
    dispatch(setCarPositions({ ...carPositions, [car.id]: 0 }));
  };

  const reset = () => {
    dispatch(resetRaceState());
    setWinnerBanner(null);
  };

  return {
    startRace,
    driveOne,
    stopOne,
    reset,
    winnerBanner,
  };
};
