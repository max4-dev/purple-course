import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import cn from 'classnames';
import Input from "../Input/Input";
import { Button } from "../Button/Button";
import { useState } from "react";
import SearchIcon from './search.svg'
import { useRouter } from "next/router";

const Search = ({className, ...props}: SearchProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: 'search',
      query: {
        q: search
      }
    })
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  }

  return ( 
    <div className={cn(className, styles.search)} {...props}>
      <Input className={styles.input} placeholder="Поиск..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} />
      <Button className={styles.button} appearance={"primary"} onClick={goToSearch}>
        <SearchIcon />
      </Button>
    </div>
   );
};
 
export default Search;