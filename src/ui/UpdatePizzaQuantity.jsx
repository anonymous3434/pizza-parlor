import { useDispatch } from 'react-redux';
import Button from './Button';
import { decreaseItem, increaseItem } from '../features/cart/cartSlice';

function UpdatePizzaQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseItem(pizzaId))}>
        -
      </Button>
      <p>{quantity}</p>
      <Button type="round" onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdatePizzaQuantity;
