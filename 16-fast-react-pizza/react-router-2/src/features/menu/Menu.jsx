import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();

  return (
    <h1>
      {menu.map((eachMenu) => (
        <MenuItem pizza={eachMenu} key={eachMenu.id} />
      ))}
    </h1>
  );
}

export async function loader() {
  const menu = getMenu();
  return menu;
}
export default Menu;
