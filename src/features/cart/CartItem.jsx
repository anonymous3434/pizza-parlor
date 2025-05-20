import { formatCurrency } from '../../utilities/helpers';
import DeleteItem from '../../ui/DeleteItem';
import UpdatePizzaQuantity from '../../ui/UpdatePizzaQuantity';
import { useSelector } from 'react-redux';
import { getCurrentPizzaQuantity } from './cartSlice';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item,
    currentPizzaQuantity = useSelector(getCurrentPizzaQuantity(pizzaId));

  return (
    <li className="items-center justify-between py-4 sm:flex">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <UpdatePizzaQuantity
          pizzaId={pizzaId}
          quantity={currentPizzaQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
