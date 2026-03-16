import logo from "../../assets/copy-paste.png"
import "./HeaderLogo.scss"

export default function HeaderLogo() {
    return (
        <header>
            <div className="logo-container">
                <img className="logo" src={logo} />
            </div>
        </header>
    )
}