import { jsx as _jsx } from "react/jsx-runtime";
import { ListLoader } from 'listLoader';
import BaseList from 'List/Base';
/**
 * @link List/List
 * @description Плоский список
 */
export default function List({ items, source, idProperty, displayProperty, filter, navigation, itemTemplate, onItemClick, dataLoadCallback, itemsContainerPadding, itemPadding, canDrag, backgroundColor = 'var(--default_background_color)', borderRadius = true, showScrollBar, showShadow, showUpBtn, orientation, showNavBtns, }) {
    const style = {
        background: backgroundColor,
        borderRadius: borderRadius ? 4 : 0,
        width: '100%',
        height: '100%',
    };
    /**
     * Обертка над элементом списка
     */
    const ListWrapper = ({ items }) => {
        return (_jsx(BaseList, { items: items, idProperty: idProperty, displayProperty: displayProperty, onItemClick: onItemClick, itemTemplate: itemTemplate, itemsContainerPadding: itemsContainerPadding, itemPadding: itemPadding, canDrag: canDrag, orientation: orientation }));
    };
    return (_jsx("section", Object.assign({ className: "list", style: style }, { children: _jsx(ListLoader, Object.assign({ source: source, filter: filter, navigation: navigation, items: items, dataLoadCallback: dataLoadCallback, showScrollBar: showScrollBar, showShadow: showShadow, showNavBtns: showNavBtns, showUpBtn: showUpBtn, orientation: orientation }, { children: ListWrapper })) })));
}
