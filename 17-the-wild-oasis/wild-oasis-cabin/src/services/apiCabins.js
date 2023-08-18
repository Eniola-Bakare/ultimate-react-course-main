import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins cannot be loaded at the moment. Please Try again");
  }

  return data;
}
export async function deleteCabin( id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins cannot be deleted at the moment. Please Try again");
  }

  return data;
}
