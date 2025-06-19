import Button from '../ui/Button/Button';

interface PaginationControlsProps {
  page: number;
  totalCount: number;
  onPrev: () => void;
  onNext: () => void;
  disabledNext: boolean;
  colorMap: Record<string, string>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  page,
  totalCount,
  onPrev,
  onNext,
  disabledNext,
  colorMap,
}) => {
  return (
    <div className="pagination">
      <Button onClick={onPrev} color={colorMap['gray']} disabled={page === 1}>
        Prev
      </Button>
      <span>Page {page}</span>
      <Button onClick={onNext} color={colorMap['gray']} disabled={disabledNext}>
        Next
      </Button>
      <span className="garage-count">Garage ({totalCount})</span>
    </div>
  );
};

export default PaginationControls;
