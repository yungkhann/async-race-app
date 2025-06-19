import Button from '../ui/Button/Button';

interface CarFormProps {
  mode: 'create' | 'update';
  onSubmit: () => void;
  onNameChange: (value: string) => void;
  onColorChange: (value: string) => void;
  color: string;
  colorMap: Record<string, string>;
}

const CarForm: React.FC<CarFormProps> = ({
  mode,
  onSubmit,
  onNameChange,
  onColorChange,
  color,
  colorMap,
}) => {
  const isCreate = mode === 'create';

  return (
    <div className={isCreate ? 'create' : 'update'}>
      <Button
        onClick={onSubmit}
        color={isCreate ? colorMap['blue'] : colorMap['yellow']}
      >
        {isCreate ? 'Create Car' : 'Update Car'}
      </Button>
      <input
        type="text"
        className="input-text"
        placeholder="Type car brand"
        onChange={(e) => onNameChange(e.target.value)}
      />
      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
    </div>
  );
};

export default CarForm;
