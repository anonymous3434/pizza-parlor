import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utilities/helpers';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { additem, getCurrentPizzaQuantity } from '../cart/cartSlice';
import DeleteItem from '../../ui/DeleteItem';
import UpdatePizzaQuantity from '../../ui/UpdatePizzaQuantity';
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza,
    currentQuantity = useSelector(getCurrentPizzaQuantity(id)),
    handleClick = () => {
      const newItem = {
        pizzaId: id,
        name,
        quantity: 1,
        unitPrice,
        totalPrice: unitPrice * 1,
      };
      dispatch(additem(newItem));
    };
  const inCart = currentQuantity > 0;
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity70 grayscale' : ''}`}
      />
      <div className="mt-0.5 flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="font-medium uppercase text-stone-400">Sold out</p>
          )}
          <div className="flex gap-4">
            {!soldOut && !inCart && (
              <Button type="small" onClick={handleClick}>
                Add to cart <ShoppingCartIcon sx={{ fontSize: 18 }} />
              </Button>
            )}
            {inCart && (
              <>
                <UpdatePizzaQuantity pizzaId={id} quantity={currentQuantity} />
                <DeleteItem pizzaId={id} />
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
