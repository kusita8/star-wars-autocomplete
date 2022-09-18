import { FC, useMemo } from "react";
import { Person } from "../../../types/Person.interface";
import "./ListItem.css";

interface ListItemProps {
  person: Person;
  search?: string;
}

export const ListItem: FC<ListItemProps> = ({ person, search }) => {
  const formattedSearch = search?.trim().toLocaleLowerCase();

  const linkText = useMemo(() => {
    if (!formattedSearch) return person.name;

    return person.name
      .split("")
      .map((letter) => {
        if (letter === " ") {
          return "\xa0";
        } else if (formattedSearch.includes(letter.toLocaleLowerCase())) {
          return `<span class="listItem__highlight">${letter}</span>`;
        }
        return letter;
      })
      .join("");
  }, [formattedSearch]);

  return (
    <a
      className="listItem"
      href={person.url}
      target="_blank"
      rel="noopener noreferrer"
      dangerouslySetInnerHTML={{ __html: linkText }}
    />
  );
};
