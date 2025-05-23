import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import Store from '../../store';
import { formatCurrency } from '../../utilities/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false),
    cart = useSelector(getCart),
    navigation = useNavigation(),
    isSubmitting = navigation.state === 'submitting',
    formErrors = useActionData(),
    dispatch = useDispatch(),
    {
      userName,
      status: addressStatus,
      position,
      address,
      error: addressError,
    } = useSelector((state) => state.user),
    isLoadingPosition = addressStatus === 'loading',
    totalPrice = useSelector(getTotalCartPrice),
    priorityPrice = withPriority ? totalPrice * 0.2 : 0,
    totalCartPrice = totalPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-4 flex flex-col gap-2 sm:flex-row">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              disabled={isLoadingPosition}
              defaultValue={address}
              placeholder={isLoadingPosition ? 'loading address...' : ''}
            />
            {addressError && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position?.latitude && !position?.longitude && (
            <Button
              type="small"
              className="absolute right-[5px] top-10 z-50 sm:top-[7px]"
              disabled={isLoadingPosition}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Position
            </Button>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to get your order on priority?</label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="positon"
          value={
            position.latitude
              ? `${position.latitude},${position.longitude}`
              : ''
          }
        />
        <div>
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      'Please give us you correct phone number. We might need it to contanct you';
  }
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  Store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
