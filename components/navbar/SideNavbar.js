export default function SideNavbar({children}) {
    return <>
        <nav className="nav flex-column">
            {children}
        </nav>
    </>
}