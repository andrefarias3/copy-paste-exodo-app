import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { MainData } from "../../models/types"
import "./ActionButtons.scss"
import logoCopyPaste from "../../assets/copy-paste.png"
import logoExodo from "../../assets/exodo_white.jpeg"

interface ActionButtonsProps {
    mainData: MainData
    phone: string
}

export default function ActionButtons({ mainData, phone }: ActionButtonsProps) {

    const allValuesAreZero = mainData.groups.every(group =>
        group.itemList.every(item => item.value === 0)
    )

    const getMessageBody = () => {
        let message = `Lista de Pedidos:\n`

        mainData.groups.forEach(group => {
            if (group.itemList.some(item => item.value > 0)) {

                message += `\n${group.mainLabel}\n`

                group.itemList.forEach(item => {
                    if (item.value !== 0) {
                        message += `  ${item.label}: ${item.value}\n`
                    }
                })

                message += " "
            }
        })

        return message
    }

    const getTableBody = () => {
        const body: (string | number)[][] = []
        mainData.groups.forEach(group => {
            if (group.itemList.some(item => item.value > 0)) {
                body.push([group.mainLabel,]);

                group.itemList.forEach(item => {

                    if (item.value !== 0) {
                        body.push([item.label, item.value])
                    }
                })
            }

        })
        return body
    }

    const sendWhatsapp = () => {
        const message = getMessageBody()
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }

    const copyData = async () => {
        try {
            const message = getMessageBody()
            await navigator.clipboard.writeText(message);
            window.alert("Pedido copiado para a área de transferência!");
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF()

        const imgRight = new Image()
        imgRight.src = logoCopyPaste

        const pageWidth = doc.internal.pageSize.getWidth()
        const imageWidth = 50
        const imageRightX = pageWidth - imageWidth - 16;
        doc.addImage(imgRight, "PNG", imageRightX, 10, imageWidth, 20)

        const imgLeft = new Image()
        imgLeft.src = logoExodo

        doc.addImage(imgLeft, "PNG", 15, 10, imageWidth, 25)

        autoTable(doc, {
            startY: 40,
            head: [["Item", "Quantidade"]],
            body: getTableBody(),
            didParseCell: (data) => {
                const rowData = data.row.raw as (string | number)[]
                if (rowData.length === 1 || rowData[1] === undefined || rowData[1] === "") {
                    data.cell.styles.fontStyle = "bolditalic"
                    data.cell.styles.textColor = [0, 0, 139]
                }
            }
        })

        const pageHeight = doc.internal.pageSize.getHeight()
        const dateY = pageHeight - 15

        const today = new Date()
        const day = String(today.getDate()).padStart(2, '0')
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const year = today.getFullYear()
        const dateStr = `${day}/${month}/${year}`
        doc.setFontSize(10)

        doc.text(`${dateStr}`, pageWidth / 2, dateY, { align: "center" })

        doc.save("pedidos_Color_Cola.pdf")
    }

    return (
        <div className="buttons">
            <button className="whatsapp" onClick={sendWhatsapp} disabled={allValuesAreZero}>Enviar WhatsApp</button>
            <button className="copy" onClick={copyData} disabled={allValuesAreZero}>Copiar Pedido</button>
            <button className="print" onClick={generatePDF} disabled={allValuesAreZero}>Gerar PDF</button>
        </div>
    )
}
