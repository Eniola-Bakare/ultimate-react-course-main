import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y-5 divide-stone-200 px-4">
      {menu.map((eachMenu) => (
        <MenuItem pizza={eachMenu} key={eachMenu.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = getMenu();
  return menu;
}
export default Menu;
