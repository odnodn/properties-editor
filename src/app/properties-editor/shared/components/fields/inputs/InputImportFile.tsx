import React, { useState, useCallback } from 'react';

import { IProperties, IFileContent } from '../../../interfaces';
import { FieldWrapper } from '../field-wrapper/FieldWrapper';
import { InputFile } from '../../input-file/InputFile';

interface InputImportFileProps extends IProperties<IFileContent> {
    onChange?(data: IProperties<IFileContent>): void;
}
export const InputImportFile: React.FC<InputImportFileProps> = ({ onChange, ...props }) => {
    const [value, setValue] = useState(props.value);

    const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileReader = new FileReader();

            let file: IFileContent = {
                content: undefined,
                name: e.target.files ? e.target.files.item(0)?.name : undefined,
                size: e.target.files ? e.target.files.item(0)?.size : undefined,
                type: e.target.files ? e.target.files.item(0)?.type : undefined,
                lastModified: e.target.files ? e.target.files.item(0)?.lastModified : undefined,
            }

            fileReader.addEventListener("load", (event) => {
                if (event.target && onChange) {
                    file.content = event.target.result;
                    setValue(file);
                    onChange({ ...props, value: file });
                }
            });

            fileReader.readAsDataURL(e.target.files[0]);
        }
    }, [onChange, props]);

    const handleOnBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
        if (props.value !== value && onChange) {
            onChange({ ...props, value });
        }
    }, [onChange, props, value]);

    return (
        <FieldWrapper
            minWidth={60}
            id={props.id || ''}
            name={props.name || ''}
            information={props.information}
            nameHasError={props.nameHasError}
            nameHasWarning={props.nameHasWarning}
        >
            {inputId => (
                <InputFile
                    className={`full-width background-bars border-radius outline-none`}
                    disabled={props.editValueDisabled}
                    autoFocus={props.focusOnRender}
                    fileMaxSize={props.fileMaxSize}
                    fileName={props.value?.name}
                    onChange={handleOnChange}
                    onBlur={handleOnBlur}
                    id={inputId}
                    style={{
                        textDecoration: props.valueHasError ? `var(--text-underline-error)` : props.valueHasWarning ? `var(--text-underline-warning)` : undefined,
                        border: props.valueHasError ? 'var(--input-border-error)' : props.valueHasWarning ? 'var(--input-border-warning)' : 'var(--input-border)',
                    }}
                />
            )}
        </FieldWrapper>
    );
}
