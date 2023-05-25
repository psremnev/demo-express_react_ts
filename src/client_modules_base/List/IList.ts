import { ORIENTATION, IScrollContainer } from 'scrollContainer';
import { IListLoader } from 'listLoader';
import { IListItem, TId } from 'src/client_modules_base/List/IListItem';

export interface IList extends IListBase, IScrollContainer, IListLoader {
  backgroundColor?: string;
  borderRadius?: boolean;
}

export interface IListBase {
  idProperty?: string;
  displayProperty?: string;
  items?: object[];
  itemTemplate?: Function;
  onItemClick?: Function;
  expandedCallback?: Function;
  dataLoadCallback?: Function;
  itemsContainerPadding?: IPadding;
  itemPadding?: IPadding;
  canDrag?: boolean;
  orientation?: ORIENTATION;
}

export interface IPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
