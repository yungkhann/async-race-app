import './winners.scss';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Button from '../../components/ui/Button/Button';
import { clearWinners } from './winnersSlice';
import { Link } from 'react-router-dom';
import CarComponent from '../../components/Car/Car';

const Winners = () => {
  const winners = useAppSelector((state) => state.winners.list);
  const dispatch = useAppDispatch();

  return (
    <div className="winners-page">
      <h2>🏆 WinnersList</h2>

      {winners.length === 0 ? (
        <p className="empty-text">
          No winners yet. Start a race to see results.
        </p>
      ) : (
        <table className="winners-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Car</th>
              <th>Name</th>
              <th>Wins</th>
              <th>Best time (s)</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={`${winner.id}-${index}`}>
                <td>{index + 1}</td>
                <td>
                  <CarComponent color={winner.color} />
                </td>
                <td>{winner.name}</td>
                <td>{winner.wins ?? 1}</td>
                <td>{winner.time.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="actions">
        <Button onClick={() => dispatch(clearWinners())} color="red">
          Clear Winners
        </Button>
        <Button color="blue">
          <Link to="/garage" className="winners-link">
            Back to Garage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Winners;
