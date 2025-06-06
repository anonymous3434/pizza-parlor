import { useLoaderData } from 'react-router-dom';
import { getMenu, getOrder } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
function Menu() {
  const menu = useLoaderData();
  return (
    <ul className="list-none divide-y divide-stone-300 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}
export async function loader() {
  const menu = await getMenu();

  return menu;
}

export default Menu;
