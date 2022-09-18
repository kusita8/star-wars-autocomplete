import { ApiResponse } from "../types/ApiResponse.type";
import { Person } from "../types/Person.interface";

export const getStarWarsPersons = async (name?: string): Promise<ApiResponse<Person[]>> => {
  const data = await fetch(`https://swapi.dev/api/people${name ? `?search=${name}` : ""}`);
  return data.json();
};
