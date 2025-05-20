import { useDispatch } from 'react-redux';
import Button from './Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteItem } from '../features/cart/cartSlice';

function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch(),
    handleDeleteItem = () => {
      dispatch(deleteItem(pizzaId));
    };
  return (
    <Button
      onClick={handleDeleteItem}
      type="small"
      className="flex items-center gap-1"
    >
      Delete <DeleteIcon sx={{ fontSize: '14px' }} />
    </Button>
  );
}

export default DeleteItem;
