"use server";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

function invalidValue(value) {
  return !value || value.trim() === "";
}

function invalidEmail(value) {
  return (
    !value ||
    (value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      value.trim() === "")
  );
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    invalidValue(meal.creator) ||
    invalidEmail(meal.creator_email) ||
    invalidValue(meal.title) ||
    invalidValue(meal.summary) ||
    invalidValue(meal.instructions) ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Pleace enter all the data correctly",
    };
  }

  await saveMeal(meal);
  redirect("/meals");
}
