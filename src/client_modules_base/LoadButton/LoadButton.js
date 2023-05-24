import { jsx as _jsx } from "react/jsx-runtime";
import { LoadButtonType } from 'LoadButton/constants';
import { useState } from 'react';
import { selectFiles } from 'LoadButton/selectFiles';
import { Button } from 'button';
import { translate } from 'base_utils/translate';
/**
 * @link LoadButton/LoadButton
 * @description Кнопка загрузки файла
 */
export default function LoadButton({ type = LoadButtonType.BUTTON, loadCallback, progressCallback, extensions, multiSelect = false, }) {
    const [isDropEnter, setIsDropEnter] = useState(false);
    const fileTypes = {
        img: ['jpg', 'jpeg', 'png', 'gif'],
        text: ['txt'],
    };
    /**
     * Обработка выбранных файлов
     * @param loadFiles
     */
    const loadFile = () => {
        selectFiles(multiSelect, extensions).then((loadFiles) => {
            Array.from(loadFiles).forEach((file, index) => {
                let reader = new FileReader();
                const id = ++index;
                const [name, ext] = file.name.split('.');
                const fileData = {
                    id,
                    name,
                    ext,
                    type: file.type,
                    createDate: file.lastModified,
                    size: file.size,
                    progress: '0%',
                    data: null,
                    error: null,
                };
                const cleanExt = ext.toLowerCase();
                if (false && fileTypes.img.includes(cleanExt)) {
                    reader.readAsDataURL(file);
                }
                else if (false && fileTypes.text.includes(cleanExt)) {
                    reader.readAsText(file);
                    reader.addEventListener;
                }
                else {
                    reader.readAsArrayBuffer(file);
                }
                reader.onprogress = function (e) {
                    const { total, loaded } = e;
                    fileData.progress = `${(loaded / total) * 100}%`;
                    progressCallback ? progressCallback(fileData) : null;
                    return;
                };
                reader.onload = function () {
                    fileData.data = reader.result;
                    loadCallback ? loadCallback(fileData) : null;
                };
                reader.onerror = function () {
                    fileData.error = reader.error;
                    loadCallback ? loadCallback(fileData) : null;
                };
            });
        });
    };
    /**
     * Событие по дефолту
     * @param e
     */
    const preventDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    /**
     * Событие выбора файлов dropArea
     * @param e
     */
    const onDrop = (e) => {
        preventDefault(e);
        setIsDropEnter(false);
        loadFile();
    };
    /**
     * Стиль кнопки
     */
    const style = {
        dropArea: {
            height: '100%',
            display: 'flex',
            minHeight: 30,
            minWidth: 30,
            border: `1px ${isDropEnter ? 'dashed' : 'solid'}`,
            borderRadius: 4,
            alignItems: 'center',
            background: isDropEnter
                ? 'var(--light_grey_background_color)'
                : 'var(--default_background_color)',
            padding: 6,
            justifyContent: 'center',
            userSelect: 'none',
        },
    };
    return (_jsx("section", Object.assign({ className: `loadButton__type-${type}` }, { children: type === LoadButtonType.BUTTON ? (_jsx(Button, { icon: "ti-upload", onClick: loadFile })) : (_jsx("div", Object.assign({ style: style.dropArea, onDragEnter: () => setIsDropEnter(true), onDragLeave: () => setIsDropEnter(false), onDragOver: (e) => preventDefault(e), onDrop: onDrop }, { children: translate('Переместите файлы для загрузки') }))) })));
}
