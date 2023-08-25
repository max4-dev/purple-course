import { HeaderProps } from "./Header.props";
import styles from "./Sidebar.module.css";
import cn from 'classnames';

const Header = ({ ...props }: HeaderProps) => {
  return (
    <div {...props}>
      Header
    </div> 
  );
};
 
export default Header;