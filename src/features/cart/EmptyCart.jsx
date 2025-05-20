import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
function EmptyCart() {
  return (
    <div className="bg-cyan-100 px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold">
        Your cart is still empty. Start adding some pizzas :)
      </p>
      <div className="mt-10 flex items-center justify-center">
        <video autoPlay loop muted>
          <source src="/videos/emptyCart.webm" type="video/webm" />
        </video>
      </div>
    </div>
  );
}

export default EmptyCart;
