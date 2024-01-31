"use server";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";

function invalidValue() {
  return (value) => !value || value.trim() !== "";
}

function invalidEmail() {
  return (value) =>
    !value ||
    (value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      value.trim() !== "");
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

  if (invalidValue(meal.name)) {
    return { message: "Please enter your name correctly" };
  }

  if (invalidEmail(meal.email)) {
    return { message: "Please enter the email correctly" };
  }

  if (invalidValue(meal.title)) {
    return { message: "Please enter the title correctly" };
  }

  if (invalidValue(meal.summary)) {
    return { message: "Please enter the summary correctly" };
  }
  if (invalidValue(meal.instructions)) {
    return { message: "Please enter the instructions correctly" };
  }

  if (invalidValue(meal.image)) {
    return { message: "Please pick some image" };
  }
  // if (
  //   invalidValue(
  //     meal.title || meal.summary || meal.instructions || meal.name || meal.image
  //   ) ||
  //   invalidEmail(meal.email)
  // ) {
  //   return {
  //     message: "Pleace enter all the data correctly",
  //   };
  // }

  await saveMeal(meal);
  redirect("/meals");
}
