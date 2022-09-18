import { ChangeEvent, useRef } from "react";
import { useStarWarsData } from "../../../hooks/useStarWarsData";
import { debounce } from "../../../utils/debounce";
import { Input } from "../../atoms/Input/Input";
import { List } from "../../molecules/List/List";
import "./StarWarsAutocomplete.css";

export const StarWarsAutocomplete = () => {
  const { data, loading, error, fetchData } = useStarWarsData();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
    await fetchData(e.target.value);
  }, 300);

  return (
    <div className="starWarsAutocomplete">
      <Input ref={inputRef} label="Name" onChange={handleSearch} />
      {!error && <List search={inputRef.current?.value} persons={data} loading={loading} />}
    </div>
  );
};
