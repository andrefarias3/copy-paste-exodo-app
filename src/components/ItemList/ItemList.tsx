import { useState } from "react";
import { MainData } from "../../models/types";
import "./ItemList.scss"

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

    return (
        <div className="list">
            {mainData.groups.map((group, groupIndex) => (
                <div className="group" key={groupIndex}>
                    <h2>{group.mainLabel}</h2>
                    {group.itemList.map((item, itemIndex) => (
                        <div className="item" key={itemIndex}>
                            <label>{item.label}</label>
                            <input
                                type="number"
                                value={formatNumberForInput(item.value)}
                                min={0}
                                onChange={(e) => handleUpdateValue(groupIndex, itemIndex, normalizeNumberInput(e.target.value))}
                                onBlur={(e) => handleBlurValue(groupIndex, itemIndex, e.target.value)}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
