import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
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
export async function createCabin(newCabinObj) {
  const imageName = `${Math.random()}-${newCabinObj.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://dwwurjjcuqaotnysxatb.supabase.co/storage/v1/object/public/cabinImages/cabin-001.jpg
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  // 1. create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabinObj, image: imagePath }])
    .select();

  console.log(data);
  if (error) {
    throw new Error(
      "Cabins could not be created at the moment. Please Try again"
    );
  }

  // 2. Where there is no error above, upload the image
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
