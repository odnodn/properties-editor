import React, { useState, useEffect, useRef } from 'react';
import { IconMoreInfo } from 'code-easy-components';

import { IProperties, TypeValues } from '../interfaces';
import { CustomInputFile } from './CustomInputFile';
import { ExpressionInput } from './ExpressionInput';
import { DefaultSwitch } from './DefaultSwitch';
import { Resizer } from './Resizer';
import { Assign } from './Assign';


const css_prop_item: React.CSSProperties = {
    justifyContent: 'space-between',
    height: 'min-content',
    alignItems: 'center',
}
interface PropItemProps extends IProperties {
    onclick?(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void;
    onChangeInputWidth(width: number): void;
    onChange?(data: IProperties): void;
    inputWidth: number;
}
export const PropItem: React.FC<PropItemProps> = (props) => { // Extende outra interface

    const { inputWidth, onChange = () => { }, onChangeInputWidth, valueHasError = false, nameHasError = false } = props;
    const containerWidth = useRef<any>(null);

    const [container, setContainer] = useState<{ width: number }>({ width: 200 });
    useEffect(() => {
        if (containerWidth.current) {
            setContainer({ width: containerWidth.current.offsetWidth || 0 });
        }
    }, []);

    if (containerWidth.current) {
        containerWidth.current.addEventListener('resizer', () => {
            setContainer({ width: containerWidth.current.offsetWidth || 0 });
        });
    }

    const [state, setState] = useState<IProperties>({
        editValueDisabled: props.editValueDisabled,
        editNameDisabled: props.editNameDisabled,
        propertieType: props.propertieType,
        valueHasError: props.valueHasError,
        nameHasError: props.nameHasError,
        information: props.information,
        suggestions: props.suggestions,
        openEditor: props.openEditor,
        value: props.value,
        type: props.type,
        name: props.name,
        id: props.id,
    });

    useEffect(() => {
        setState({
            editValueDisabled: props.editValueDisabled,
            editNameDisabled: props.editNameDisabled,
            propertieType: props.propertieType,
            valueHasError: props.valueHasError,
            nameHasError: props.nameHasError,
            information: props.information,
            suggestions: props.suggestions,
            openEditor: props.openEditor,
            value: props.value,
            type: props.type,
            name: props.name,
            id: props.id,
        });
    }, [props]);

    const css_prop_item_label: React.CSSProperties = {
        textDecoration: nameHasError ? `var(--text-underline-error)` : undefined,
        width: (container.width - inputWidth),
        textOverflow: 'ellipsis',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        textAlign: 'start',
        overflow: 'hidden',
    }

    const minWidth = 60;
    const css_prop_item_input: React.CSSProperties = {
        textDecoration: valueHasError ? `var(--text-underline-error)` : undefined,
        border: valueHasError ? 'var(--input-border-error)' : 'var(--input-border)',
    }

    const onkeyPress = (e: any) => {
        if (e.keyCode === 13) {
            onChange(state);
        }
    }

    switch (state.type) {
        case TypeValues.viewOnly:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <label
                            style={{
                                ...css_prop_item_input,
                                backgroundColor: 'transparent',
                                textOverflow: 'ellipsis',
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                textAlign: 'start',
                                overflow: 'hidden',
                                border: 'none',
                            }}
                            key={'prop_key_' + state.id}
                            id={'prop_id_' + state.id}
                            children={state.value}
                        />
                    </div>
                </div>
            );

        case TypeValues.string:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <input
                            className="full-width background-bars"
                            onChange={e => setState({ ...state, value: e.target.value })}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            onBlur={_ => onChange(state)}
                            key={'prop_key_' + state.id}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                            value={state.value}
                            autoComplete='off'
                        />
                    </div>
                </div>
            );

        case TypeValues.expression:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <ExpressionInput
                            className="full-width background-bars"
                            onChange={e => setState({ ...state, value: e.target.value })}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            openEditor={state.openEditor}
                            onBlur={_ => onChange(state)}
                            key={'prop_key_' + state.id}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                            value={state.value}
                        />
                    </div>
                </div>
            );

        case TypeValues.bigstring:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <textarea
                            className="full-width background-bars"
                            style={{ ...css_prop_item_input, height: '50px', resize: 'vertical' }}
                            onChange={e => setState({ ...state, value: e.target.value })}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            onBlur={_ => onChange(state)}
                            key={'prop_key_' + state.id}
                            id={'prop_id_' + state.id}
                            value={state.value}
                            autoComplete='off'
                        />
                    </div>
                </div>
            );

        case TypeValues.number:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <input
                            className="full-width background-bars"
                            onChange={e => setState({ ...state, value: e.target.value })}
                            disabled={state.editValueDisabled}
                            onKeyDown={(e) => onkeyPress(e)}
                            onBlur={_ => onChange(state)}
                            key={'prop_key_' + state.id}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                            value={state.value}
                            autoComplete='off'
                            type='number'
                        />
                    </div>
                </div>
            );

        case TypeValues.binary:
            return (
                <div ref={containerWidth} key={'prop_item_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <div style={{ width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}>
                        <CustomInputFile
                            className="full-width background-bars border-radius outline-none"
                            onChange={(e) => {

                                if (e.target.files && e.target.files[0]) {
                                    var fileReader = new FileReader();

                                    let file: any = {
                                        content: undefined,
                                        name: e.target.files ? e.target.files.item(0)?.name : undefined,
                                        size: e.target.files ? e.target.files.item(0)?.size : undefined,
                                        type: e.target.files ? e.target.files.item(0)?.type : undefined,
                                        lastModified: e.target.files ? e.target.files.item(0)?.lastModified : undefined,
                                    }

                                    fileReader.addEventListener("load", (event) => {
                                        if (event.target) {
                                            file.content = `${event.target.result}`;
                                            state.value = file;
                                            setState(state);
                                            onChange(state);
                                        }
                                    });

                                    fileReader.readAsDataURL(e.target.files[0]);

                                }
                            }}
                            disabled={state.editValueDisabled}
                            key={'prop_key_' + state.id}
                            style={css_prop_item_input}
                            id={'prop_id_' + state.id}
                            tabIndex={0}
                        />
                    </div>
                </div>
            );

        case TypeValues.boolean:
            return (
                <div ref={containerWidth} key={'prop_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <DefaultSwitch
                        checked={state.value}
                        hasError={valueHasError}
                        id={'prop_id_' + state.id}
                        desabled={state.editValueDisabled}
                        onChange={value => setState({ ...state, value })}
                    />
                </div>
            );

        case TypeValues.assign:
            return (
                <Assign
                    id={state.id}
                    name={state.name}
                    type={state.type}
                    value={state.value}
                    nameHasError={nameHasError}
                    openEditor={state.openEditor}
                    valueHasError={valueHasError}
                    onBlur={_ => onChange(state)}
                    key={'assign_key_' + state.id}
                    information={state.information}
                    onKeyDown={(e) => onkeyPress(e)}
                    propertieType={state.propertieType}
                    editNameDisabled={state.editNameDisabled}
                    editValueDisabled={state.editValueDisabled}
                    onChangeName={name => setState({ ...state, name })}
                    onChangeValue={value => setState({ ...state, value })}
                />
            );

        case TypeValues.selection:
            return (
                <div ref={containerWidth} key={'prop_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <select
                        style={{ ...css_prop_item_input, width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}
                        onChange={e => {
                            setState({ ...state, value: e.target.value });
                            onChange({ ...state, value: e.target.value });
                        }}
                        disabled={state.editValueDisabled}
                        className={"background-bars"}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    >
                        <option value={"undefined"}>Selecione</option>
                        {state.suggestions?.map((item, index) => {
                            return (
                                <option
                                    disabled={item.disabled}
                                    children={item.label}
                                    value={item.value}
                                    key={index}
                                />
                            );
                        })}
                    </select>
                </div>
            );

        case TypeValues.yesNoSelection:
            return (
                <div ref={containerWidth} key={'prop_key_' + state.id} style={css_prop_item} className="padding-s padding-bottom-none">
                    <label htmlFor={'prop_id_' + state.id} className="flex1 " style={css_prop_item_label} info-message={state.information}>
                        {state.name}
                        {(state.information !== "" && state.information !== undefined) && <img className="margin-left-xs" aria-label="teste" width={10} height={10} src={IconMoreInfo} alt="info-icon" />}
                    </label>
                    <Resizer onChange={newWidth => onChangeInputWidth(newWidth)} />
                    <select
                        style={{ ...css_prop_item_input, width: inputWidth ? `${inputWidth}px` : '70%', minWidth: minWidth, maxWidth: '90%' }}
                        onDoubleClick={_ => setState({ ...state, value: (state.value === "true" ? "false" : "true") })}
                        onChange={e => {
                            setState({ ...state, value: e.target.value });
                            onChange({ ...state, value: e.target.value });
                        }}
                        disabled={state.editValueDisabled}
                        className={"background-bars"}
                        key={'prop_key_' + state.id}
                        id={'prop_id_' + state.id}
                        value={state.value}
                    >
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                    </select>
                </div>
            );

        default:
            return <></>;
    }

}
