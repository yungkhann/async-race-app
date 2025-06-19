import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchCars, createCar, updateCar, removeCar } from './thunk';
import { generateCars } from '../winners/thunk';

import { usePagination } from '../../hooks/usePagination';
import { useRace } from '../../hooks/useRace';

import type { Car } from '../../types/types';
import { colorMap } from '../../constants/constants';

import CarLane from '../../components/CarLane/CarLane';
import RaceControls from '../../components/RaceControls/RaceControls';
import CarForm from '../../components/CarForm/CarForm';
import WinnerBanner from '../../components/WinnerBanner/WinnerBanner';
import PaginationControls from '../../components/Pagination/Pagination';
import Button from '../../components/ui/Button/Button';

import './garage.scss';

const Garage = () => {
  const dispatch = useAppDispatch();

  const { carVelocities, carRaceStatus, raceStarted, carPositions } =
    useAppSelector((state) => state.garage);
  const { cars, totalCount } = useAppSelector((state) => state.garage);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const { page, goToNextPage, goToPrevPage, disabled } = usePagination();
  const [createCarName, setCreateCarName] = useState('');
  const [createCarColor, setCreateCarColor] = useState('#000000');

  const [updateCarName, setUpdateCarName] = useState('');
  const [updateCarColor, setUpdateCarColor] = useState('#000000');

  const { startRace, driveOne, stopOne, reset, winnerBanner } = useRace();

  useEffect(() => {
    dispatch(fetchCars(page));
  }, [page]);

  const create = async () => {
    if (!createCarName.trim()) return;
    await dispatch(createCar({ name: createCarName, color: createCarColor }));
    dispatch(fetchCars(page));
  };

  const update = async () => {
    if (!updateCarName.trim() || selectedCarId === null) return;

    await dispatch(
      updateCar({
        id: selectedCarId,
        name: updateCarName,
        color: updateCarColor,
      }),
    );
    dispatch(fetchCars(page));
  };

  const select = (car: Car) => {
    setSelectedCarId(car.id);
    setUpdateCarName(car.name);
    setUpdateCarColor(car.color);
  };

  const handleGenerateCars = async () => {
    await dispatch(generateCars());
    dispatch(fetchCars(page));
  };
  const handleRemoveCar = async (id: number) => {
    await dispatch(removeCar(id));

    const remainingCars = cars.length - 1;

    const shouldGoBack = remainingCars === 0 && page > 1;

    const newPage = shouldGoBack ? page - 1 : page;

    dispatch(fetchCars(newPage));

    if (shouldGoBack && typeof goToPrevPage === 'function') {
      goToPrevPage();
    }
  };

  return (
    <div className="garage">
      {winnerBanner && <WinnerBanner text={winnerBanner} />}
      <div className="city">
        <div className="toolbar">
          <RaceControls onStart={startRace} onReset={reset} />
          <CarForm
            mode="create"
            onSubmit={create}
            onNameChange={setCreateCarName}
            onColorChange={setCreateCarColor}
            color={createCarColor}
            colorMap={colorMap}
          />

          <CarForm
            mode="update"
            onSubmit={update}
            onNameChange={setUpdateCarName}
            onColorChange={setUpdateCarColor}
            color={updateCarColor}
            colorMap={colorMap}
          />
          <div className="top_panel">
            <Button onClick={handleGenerateCars} color={colorMap['purple']}>
              Generate cars
            </Button>
            <Button color={colorMap['blue']}>
              {' '}
              <Link to="/winners" className="winners-link">
                Winners
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="racetrack">
        <ul className="lane-labels">
          {cars.map((car) => (
            <li key={car.id} className="lane-label">
              <span>{car.name}</span>
            </li>
          ))}
        </ul>
        <div>
          <ul>
            {cars.map((car) => {
              return (
                <CarLane
                  car={car}
                  selectedCarId={selectedCarId}
                  velocity={carVelocities[car.id] || 1}
                  raceStatus={carRaceStatus[car.id] || false}
                  position={carPositions[car.id] ?? 0}
                  raceStarted={raceStarted}
                  duration={(1000000 / (carVelocities[car.id] || 1)) * 0.002}
                  colorMap={colorMap}
                  driveOne={driveOne}
                  stopOne={stopOne}
                  select={select}
                  remove={handleRemoveCar}
                />
              );
            })}
          </ul>
          <div className="finishline"></div>
        </div>
      </div>
      <PaginationControls
        page={page}
        totalCount={totalCount}
        onPrev={goToPrevPage}
        onNext={() => dispatch(goToNextPage)}
        disabledNext={disabled}
        colorMap={colorMap}
      />
    </div>
  );
};

export default Garage;
