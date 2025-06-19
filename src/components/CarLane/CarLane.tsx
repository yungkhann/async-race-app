import Button from '../ui/Button/Button';
import CarComponent from '../Car/Car';
import type { Car } from '../../types/types';

interface CarLaneProps {
  car: Car;
  selectedCarId: number | null;
  velocity: number;
  raceStatus: boolean;
  position: number;
  raceStarted: boolean;
  duration: number;
  colorMap: Record<string, string>;
  driveOne: (car: Car) => void;
  stopOne: (car: Car) => void;
  select: (car: Car) => void;
  remove: (id: number) => void;
}

const CarLane = ({
  car,
  colorMap,
  raceStatus,
  position,
  duration,
  raceStarted,
  selectedCarId,
  select,
  driveOne,
  stopOne,
  remove,
}: CarLaneProps) => {
  return (
    <li className="car-lane">
      <div className="car-btns">
        <div className="mini-controls">
          <Button
            color={colorMap['green']}
            className="mini"
            onClick={() => driveOne(car)}
            disabled={raceStatus}
          >
            A
          </Button>
          <Button
            color={colorMap['red']}
            className="mini"
            onClick={() => stopOne(car)}
            disabled={!raceStatus}
          >
            B
          </Button>
        </div>

        <div className="action-controls">
          <Button
            color={
              selectedCarId === car.id ? colorMap['orange'] : colorMap['gray']
            }
            onClick={() => select(car)}
          >
            Select
          </Button>

          <Button color={colorMap['red']} onClick={() => remove(car.id)}>
            Remove
          </Button>
        </div>
      </div>

      <div
        className={`car${raceStatus ? ' racing' : ''}`}
        style={{
          transition: raceStarted ? `left ${duration}s linear` : 'none',
          left: `${position}vw`,
        }}
      >
        <CarComponent color={car.color} />
      </div>
    </li>
  );
};

export default CarLane;
