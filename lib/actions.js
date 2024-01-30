"use server";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

function isInvalidText() {
  meal.title.trim() === "";
}

export async function shareMeal(formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (isInvalidText(meal.title)) {
    throw new Error("Invalid input");
  }

  await saveMeal(meal);
  redirect("/meals");
}
