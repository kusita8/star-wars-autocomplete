import { FC, useMemo } from "react";
import { Person } from "../../../types/Person.interface";
import { getClassNames } from "../../../utils/getClassNames";
import { ListItem } from "../../atoms/ListItem/ListItem";
import "./List.css";

interface ListProps {
  persons?: Person[];
  loading?: boolean;
  search?: string;
}

export const List: FC<ListProps> = ({ persons, loading, search }) => {
  const content = useMemo(() => {
    if (loading) return null;

    if (persons && persons.length > 0) {
      return persons?.map((person) => (
        <ListItem search={search} key={person.name} person={person} />
      ));
    }

    return <p className="list__empty-results">No results found for {search}</p>;
  }, [loading, persons]);

  return <div className={getClassNames("list", loading && "list--loading")}>{content}</div>;
};
