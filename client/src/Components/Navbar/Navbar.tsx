import "./navbar.css";
import {
    InfoIcon,
    FriendChatIcon,
    GroupChatIcon,
    HamburgerMenuIcon,
    smallScreenFriendsChatIcon,
    smallScreenGroupChatIcon,
    userSearchIcon,
    closeIcon,
    searchIcon,
    logoutIcon,
    forwardArrowIcon,
    backwardArrowIcon,
} from "@/assets/icons/navbar/index.assets.icons.navbar";
import { JSX, useState, useEffect, useRef } from "react";

const Navbar: React.FC = () => {
    // useState hook
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [mobileSubOpen, setMobileSubMenuOpen] = useState<boolean>(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
    const [desktopSubOpen, setDesktopSubMenuOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    // dropdown menu should be close whenever user clicks outside it for better user experience

    // useRef hook
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const desktopMenuRef = useRef<HTMLDivElement | null>(null);

    // useEffect
    useEffect(() => {
        const closeDropDownMenu = (event: MouseEvent) => {
            const target = event.target as Node;
            // menubar
            // if renders on mobile
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target)
            ) {
                setMobileSubMenuOpen(false);
                setMobileMenuOpen(false);
            }
            // if renders on desktop
            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(target)
            ) {
                setDesktopSubMenuOpen(false);
                setDesktopMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", closeDropDownMenu);
        // cleanup
        return () => {
            document.removeEventListener("mousedown", closeDropDownMenu);
        };
    }, []);

    // handlers
    const openDesktopSubMenu = (): void => setDesktopSubMenuOpen(true);
    const openMobileSubMenu = (): void => setMobileSubMenuOpen(true);

    const closeDesktopSubMenu = (): void => setDesktopSubMenuOpen(false);
    const closeMobileSubMenu = (): void => setMobileSubMenuOpen(false);

    type MenuRenderer = () => JSX.Element | null;

    // main menu
    const desktopMenu: MenuRenderer = () => {
        if (!desktopMenuOpen || desktopSubOpen) return null;

        return (
            <div className="dropdown-menu dropdown-right">
                <div className="dropdown-profile">
                    <div className="profile-circle-small" />
                    <span>My Profile</span>

                    <button
                        className="arrow-btn forward-btn"
                        onClick={openDesktopSubMenu}
                    >
                        <img src={forwardArrowIcon} alt="forward" />
                    </button>
                </div>

                <div className="dropdown-divider" />

                <button
                    className="dropdown-item"
                    onClick={() => setDesktopMenuOpen(false)}
                >
                    <img
                        src={logoutIcon}
                        alt="logout"
                        style={{ transform: "rotate(180deg)" }}
                    />
                    LogOut
                </button>
            </div>
        );
    };

    const mobileMenu: MenuRenderer = () => {
        if (!mobileMenuOpen || mobileSubOpen) return null;

        return (
            <div className="dropdown-menu">
                <div className="dropdown-profile">
                    <div className="profile-circle-small" />
                    <span>My Profile</span>

                    <button
                        className="arrow-btn forward-btn"
                        onClick={openMobileSubMenu}
                    >
                        <img src={forwardArrowIcon} alt="forward" />
                    </button>
                </div>

                <div className="dropdown-divider" />

                <button
                    className="dropdown-item"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <img src={smallScreenFriendsChatIcon} alt="friends" />
                    Friends
                </button>

                <button
                    className="dropdown-item"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <img src={smallScreenGroupChatIcon} alt="group" />
                    Group Chat
                </button>
            </div>
        );
    };

    // sub menu
    const desktopSubMenu: MenuRenderer = () => {
        if (!desktopMenuOpen || !desktopSubOpen) return null;

        return (
            <div className="dropdown-menu dropdown-right">
                <div className="dropdown-profile">
                    <button
                        className="arrow-btn back-btn"
                        onClick={closeDesktopSubMenu}
                    >
                        <img src={backwardArrowIcon} alt="back" />
                    </button>

                    <span>My Profile</span>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-item">Username</div>
                <div className="dropdown-item">Email</div>
                <div className="dropdown-item">UserId</div>
            </div>
        );
    };

    const mobileSubMenu: MenuRenderer = () => {
        if (!mobileMenuOpen || !mobileSubOpen) return null;

        return (
            <div className="dropdown-menu">
                <div className="dropdown-profile">
                    <button
                        className="arrow-btn back-btn"
                        onClick={closeMobileSubMenu}
                    >
                        <img src={backwardArrowIcon} alt="back" />
                    </button>

                    <span>My Profile</span>
                </div>

                <div className="dropdown-divider" />

                <div className="dropdown-item">Username</div>
                <div className="dropdown-item">Email</div>
                <div className="dropdown-item">UserId</div>
            </div>
        );
    };

    return (
        <div className="navbar">
            {/* LEFT */}
            <div className="nav-left" ref={mobileMenuRef}>
                <button
                    className="icon-btn hamburger-btn"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                    <img
                        src={mobileMenuOpen ? closeIcon : HamburgerMenuIcon}
                        alt="menu"
                    />
                </button>

                {mobileMenu()}
                {mobileSubMenu()}

                <button className="icon-btn desktop-only">
                    <img src={GroupChatIcon} alt="group" title="Groups" />
                </button>

                <button className="icon-btn desktop-only">
                    <img src={FriendChatIcon} alt="friends" title="Friends" />
                </button>
            </div>

            {/* CENTER */}
            <div className={`nav-center ${searchOpen ? "search-open" : ""}`}>
                <button
                    className="icon-btn search-toggle-btn"
                    onClick={() => setSearchOpen((prev) => !prev)}
                >
                    <img
                        src={searchOpen ? closeIcon : searchIcon}
                        alt="search"
                    />
                </button>

                <div className="search-box">
                    <img src={userSearchIcon} alt="search" />
                    <input placeholder="Enter Friend's ID" />
                    <img src={InfoIcon} alt="info" title="Each ID is unique" />
                </div>
            </div>

            {/* RIGHT */}
            <div className="nav-right desktop-only" ref={desktopMenuRef}>
                <div
                    className="profile-circle"
                    onClick={() => setDesktopMenuOpen((prev) => !prev)}
                />

                {desktopMenu()}
                {desktopSubMenu()}
            </div>
        </div>
    );
};

export default Navbar;
