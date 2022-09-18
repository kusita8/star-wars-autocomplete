import { useEffect, useState } from "react";
import { Person } from "../types/Person.interface";
import { getStarWarsPersons } from "../services/starWarsPersons";

export const useStarWarsData = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Person[]>();
  const [error, setError] = useState(false);

  const fetchData = async (name?: string) => {
    setLoading(true);

    try {
      const data = await getStarWarsPersons(name);

      setData(data.results);
      setError(false);
    } catch {
      // TODO: handle errors globally, show a proper toast error message
      alert("An error occurred, please try again later");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    loading,
    data,
    error,
    fetchData,
  };
};
