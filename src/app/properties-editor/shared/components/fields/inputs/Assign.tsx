import React, { useCallback, useState } from 'react';

import { IProperties, ISuggestion } from './../../../interfaces';
import { ExpressionInput } from './../../';

interface IAssignProps extends IProperties<string> {
    onChange?(data: IProperties<string>): void;
    onKeyDown?(e: any): void;
}
export const Assign: React.FC<IAssignProps> = (props) => {
    const [value, setValue] = useState(props.value);
    const [name, setName] = useState(props.name);

    const css_prop_item_input_name: React.CSSProperties = {
        border: props.nameHasError ? 'var(--input-border-error)' : props.nameHasWarning ? 'var(--input-border-warning)' : 'var(--input-border)',
        textDecoration: props.nameHasError ? `var(--text-underline-error)` : props.nameHasWarning ? `var(--text-underline-warning)` : undefined,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: (
            (
                (!props.editNameDisabled && !props.editValueDisabled) ||
                (props.editNameDisabled && props.editValueDisabled)
            ) ||
            (!props.editNameDisabled && props.editValueDisabled)
        ) ? 0 : undefined,
    }
    const css_prop_item_input_value: React.CSSProperties = {
        textDecoration: props.valueHasError ? `var(--text-underline-error)` : props.valueHasError ? `var(--text-underline-warning)` : undefined,
        border: props.valueHasError ? 'var(--input-border-error)' : props.valueHasWarning ? 'var(--input-border-warning)' : 'var(--input-border)',
        ...((!props.valueHasError && (!props.valueHasWarning || props.nameHasWarning)) ? { borderTop: 0 } : {}),
        borderTopLeftRadius: 0,
        paddingLeft: 30,

        borderTopRightRadius: (
            (
                (!props.editNameDisabled && !props.editValueDisabled) ||
                (props.editNameDisabled && props.editValueDisabled)
            ) ||
            (props.editNameDisabled && !props.editValueDisabled)
        ) ? 0 : undefined,
    }

    const handleOnChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.useOnChange && props.onChange) {
            props.onChange({ ...props, name: e.currentTarget.value });
            setName(e.currentTarget.value);
        } else {
            setName(e.currentTarget.value);
        }
    }, [props]);

    const handleOnChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.useOnChange && props.onChange) {
            props.onChange({ ...props, value: e.currentTarget.value });
            setValue(e.currentTarget.value);
        } else if (e.currentTarget.value !== value) {
            setValue(e.currentTarget.value);
        }
    }, [props, value]);

    const handleOnSelectSuggestName = useCallback((option: ISuggestion<string>) => {
        if (option.name !== name && props.onChange) {
            props.onChange({ ...props, name: option.value });
            setName(option.value);
        } else if (option.value !== name) {
            setName(option.value);
        }
    }, [props, name]);

    const handleOnSelectSuggestValue = useCallback((option: ISuggestion<string>) => {
        if (option.value !== value && props.onChange) {
            props.onChange({ ...props, value: option.value });
            setValue(option.value);
        } else if (option.value !== value) {
            setValue(option.value);
        }
    }, [props, value]);

    return (
        <div className="flex-column padding-s padding-bottom-none">
            <ExpressionInput
                value={name}
                placeholder={'Propertie'}
                onKeyDown={props.onKeyDown}
                onChange={handleOnChangeName}
                id={'name_prop_id_' + props.id}
                autoFocus={props.focusOnRender}
                style={css_prop_item_input_name}
                disabled={props.editNameDisabled}
                key={'name_prop_key_' + props.id}
                suggestions={props.nameSuggestions}
                onPickerClick={props.onPickerNameClick}
                onSelectSuggest={handleOnSelectSuggestName}
                onBlur={e => {
                    if (props.value !== value && props.onChange) {
                        props.onChange({ ...props, value });
                    }
                }}
            />
            <div style={{ alignItems: 'center' }}>
                <span children='=' onClick={props.onPickerValueClick} style={{ marginRight: -10, marginLeft: 10, width: 0, zIndex: 1, cursor: 'pointer' }} />
                <ExpressionInput
                    value={value}
                    placeholder={'Value'}
                    onKeyDown={props.onKeyDown}
                    onChange={handleOnChangeValue}
                    suggestions={props.suggestions}
                    id={'value_prop_id_' + props.id}
                    style={css_prop_item_input_value}
                    key={'value_prop_key_' + props.id}
                    disabled={props.editValueDisabled}
                    onPickerClick={props.onPickerValueClick}
                    onSelectSuggest={handleOnSelectSuggestValue}
                    onBlur={e => {
                        if (props.value !== value && props.onChange) {
                            props.onChange({ ...props, value });
                        }
                    }}
                />
            </div>
        </div>
    );

}
