import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error("Cabins cannot be loaded at the moment. Please Try again");
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("Cabins cannot be deleted at the moment. Please Try again");
  }

  return data;
}

export async function createEditCabin(newCabinObj, id) {
  const hasImagePath = newCabinObj.image?.startsWith?.(supabaseUrl);
  // console.log(hasImagePath);
  const imageName = `${Math.random()}-${newCabinObj.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabinObj.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;

  let query = supabase.from("cabins");

  // 1. create the cabin
  if (!id) query = query.insert([{ ...newCabinObj, image: imagePath }]);

  // 2. edit the cabin
  if (id)
    query = query.update({ ...newCabinObj, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    throw new Error(
      "Cabins could not be created at the moment. Please Try again"
    );
  }

  // 2. Where there is no error above, upload the image
  if(hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabinObj.image);

  // 3. Prevent upload where error in uploading image
  if (storageError) {
    console.log("mmm");
    console.log(data.id);
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("Image could not be uploaded, hence cabin not created");
  }

  return data;
}
