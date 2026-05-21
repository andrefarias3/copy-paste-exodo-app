import { useState } from "react";
import { MainData } from "../../models/types";
import "./ItemList.scss"
import { NumericFormat } from 'react-number-format';

interface ItemListProps {
    initialData: MainData
    onDataChange?: (data: MainData) => void
}

export default function ItemList({ initialData, onDataChange }: ItemListProps) {
    const [mainData, setMainData] = useState<MainData>(initialData)

    const handleUpdateValue = (groupIndex: number, itemIndex: number, value: number) => {
        const updatedData: MainData = {
            ...mainData,
            groups: mainData.groups.map((group, gIdx) =>
                gIdx === groupIndex
                    ? {
                        ...group,
                        itemList: group.itemList.map((item, iIdx) =>
                            iIdx === itemIndex ? { ...item, value } : item
                        )
                    }
                    : group
            )
        }
        setMainData(updatedData)
        onDataChange?.(updatedData)
    }

    const normalizeNumberInput = (rawValue: string) => {
        if (rawValue === "") return 0
        const normalized = rawValue.replace(/^0+(?=\d)/, "")
        return Number(normalized)
    }

    const formatNumberForInput = (value: number) => {
        return value.toString().replace(/^0+(?=\d)/, "")
    }

    const handleBlurValue = (groupIndex: number, itemIndex: number, rawValue: string) => {
        const normalized = normalizeNumberInput(rawValue)
        handleUpdateValue(groupIndex, itemIndex, normalized)
    }

    const handleUpdatePrice = (groupIndex: number, itemIndex: number, price: number) => {
        const updatedData: MainData = {
            ...mainData,
            groups: mainData.groups.map((group, gIdx) =>
                gIdx === groupIndex
                    ? {
                        ...group,
                        itemList: group.itemList.map((item, iIdx) =>
                            iIdx === itemIndex ? { ...item, price } : item
                        )
                    }
                    : group)
        }
        setMainData(updatedData)
        onDataChange?.(updatedData)
    }

    const handleUpdateCliente = (clientName: string) => {
        const updatedData: MainData = {
            ...mainData,
            clientName: clientName
        }
        setMainData(updatedData)
        onDataChange?.(updatedData)
    }

    const handleKeyDown = (groupIndex: number, itemIndex: number, key: string, value: number) => {
        if (key === 'ArrowUp') {
            handleUpdatePrice(groupIndex, itemIndex, value + 1);
        } else if (key === 'ArrowDown') {
            handleUpdatePrice(groupIndex, itemIndex, value - 1);
        }
    };

    return (
        <div className="list">
            <div className="group">
                <span>Cliente </span>
                <input type="text"
                    value={mainData.clientName}
                    onChange={(e) => handleUpdateCliente(e.target.value)}
                />
            </div>
            {mainData.groups.map((group, groupIndex) => (
                <div className="group" key={groupIndex}>
                    <h2>{group.mainLabel}</h2>
                    {group.itemList.map((item, itemIndex) => (
                        <div className="item" key={itemIndex}>
                            <label key={`label-${groupIndex}-${itemIndex}`}>{item.label}</label>
                            <div className="priceContainer">
                                <NumericFormat key={`price-${groupIndex}-${itemIndex}`}
                                    value={item.price}
                                    onValueChange={(values) => handleUpdatePrice(groupIndex, itemIndex, values.floatValue || 0)}
                                    className="input-value"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    onKeyDown={(ev) => handleKeyDown(groupIndex, itemIndex, ev.key, item.price)}
                                    prefix={'R$ '}
                                />
                                x
                                <input key={`value-${groupIndex}-${itemIndex}`}
                                    type="number"
                                    value={formatNumberForInput(item.value)}
                                    min={0}
                                    onChange={(e) => handleUpdateValue(groupIndex, itemIndex, normalizeNumberInput(e.target.value))}
                                    onBlur={(e) => handleBlurValue(groupIndex, itemIndex, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
