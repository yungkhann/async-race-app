import Button from '../ui/Button/Button';
import { colorMap } from '../../constants/constants';

interface RaceControlsProps {
  onStart: () => void;
  onReset: () => void;
}

const RaceControls: React.FC<RaceControlsProps> = ({ onStart, onReset }) => {
  return (
    <div className="race_btns">
      <Button onClick={onStart} color={colorMap['green']}>
        Race
      </Button>
      <Button onClick={onReset} color={colorMap['red']}>
        Reset
      </Button>
    </div>
  );
};

export default RaceControls;
