import styles from "./navbar.module.css";
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [mobileSubOpen, setMobileSubMenuOpen] = useState<boolean>(false);
    const [desktopMenuOpen, setDesktopMenuOpen] = useState<boolean>(false);
    const [desktopSubOpen, setDesktopSubMenuOpen] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);

    const mobileMenuRef = useRef<HTMLDivElement | null>(null);
    const desktopMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const closeDropDownMenu = (event: MouseEvent) => {
            const target = event.target as Node;

            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target)
            ) {
                setMobileSubMenuOpen(false);
                setMobileMenuOpen(false);
            }

            if (
                desktopMenuRef.current &&
                !desktopMenuRef.current.contains(target)
            ) {
                setDesktopSubMenuOpen(false);
                setDesktopMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", closeDropDownMenu);
        return () => {
            document.removeEventListener("mousedown", closeDropDownMenu);
        };
    }, []);

    const openDesktopSubMenu = (): void => setDesktopSubMenuOpen(true);
    const openMobileSubMenu = (): void => setMobileSubMenuOpen(true);

    const closeDesktopSubMenu = (): void => setDesktopSubMenuOpen(false);
    const closeMobileSubMenu = (): void => setMobileSubMenuOpen(false);

    type MenuRenderer = () => JSX.Element | null;

    const desktopMenu: MenuRenderer = () => {
        if (!desktopMenuOpen || desktopSubOpen) return null;

        return (
            <div className={`${styles.dropdown_menu} ${styles.dropdown_right}`}>
                <div className={styles.dropdown_profile}>
                    <div className={styles.profile_circle_small} />
                    <span>My Profile</span>

                    <button
                        className={`${styles.arrow_btn} ${styles.forward_btn}`}
                        onClick={openDesktopSubMenu}
                    >
                        <img src={forwardArrowIcon} alt="forward" />
                    </button>
                </div>

                <div className={styles.dropdown_divider} />

                <button
                    className={styles.dropdown_item}
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
            <div className={styles.dropdown_menu}>
                <div className={styles.dropdown_profile}>
                    <div className={styles.profile_circle_small} />
                    <span>My Profile</span>

                    <button
                        className={`${styles.arrow_btn} ${styles.forward_btn}`}
                        onClick={openMobileSubMenu}
                    >
                        <img src={forwardArrowIcon} alt="forward" />
                    </button>
                </div>

                <div className={styles.dropdown_divider} />

                <button
                    className={styles.dropdown_item}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <img src={smallScreenFriendsChatIcon} alt="friends" />
                    Friends
                </button>

                <button
                    className={styles.dropdown_item}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <img src={smallScreenGroupChatIcon} alt="group" />
                    Group Chat
                </button>
            </div>
        );
    };

    const desktopSubMenu: MenuRenderer = () => {
        if (!desktopMenuOpen || !desktopSubOpen) return null;

        return (
            <div className={`${styles.dropdown_menu} ${styles.dropdown_right}`}>
                <div className={styles.dropdown_profile}>
                    <button
                        className={`${styles.arrow_btn} ${styles.back_btn}`}
                        onClick={closeDesktopSubMenu}
                    >
                        <img src={backwardArrowIcon} alt="back" />
                    </button>

                    <span>My Profile</span>
                </div>

                <div className={styles.dropdown_divider} />

                <div className={styles.dropdown_item}>Username</div>
                <div className={styles.dropdown_item}>Email</div>
                <div className={styles.dropdown_item}>UserId</div>
            </div>
        );
    };

    const mobileSubMenu: MenuRenderer = () => {
        if (!mobileMenuOpen || !mobileSubOpen) return null;

        return (
            <div className={styles.dropdown_menu}>
                <div className={styles.dropdown_profile}>
                    <button
                        className={`${styles.arrow_btn} ${styles.back_btn}`}
                        onClick={closeMobileSubMenu}
                    >
                        <img src={backwardArrowIcon} alt="back" />
                    </button>

                    <span>My Profile</span>
                </div>

                <div className={styles.dropdown_divider} />

                <div className={styles.dropdown_item}>Username</div>
                <div className={styles.dropdown_item}>Email</div>
                <div className={styles.dropdown_item}>UserId</div>
            </div>
        );
    };

    return (
        <div className={styles.navbar}>
            {/* LEFT */}
            <div className={styles.nav_left} ref={mobileMenuRef}>
                <button
                    className={`${styles.icon_btn} ${styles.hamburger_btn}`}
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                >
                    <img
                        src={mobileMenuOpen ? closeIcon : HamburgerMenuIcon}
                        alt="menu"
                    />
                </button>

                {mobileMenu()}
                {mobileSubMenu()}

                <button className={`${styles.icon_btn} ${styles.desktop_only}`}>
                    <img src={GroupChatIcon} alt="group" title="Groups" />
                </button>

                <button className={`${styles.icon_btn} ${styles.desktop_only}`}>
                    <img src={FriendChatIcon} alt="friends" title="Friends" />
                </button>
            </div>

            {/* CENTER */}
            <div
                className={`${styles.nav_center} ${
                    searchOpen ? styles.search_open : ""
                }`}
            >
                <button
                    className={`${styles.icon_btn} ${styles.search_toggle_btn}`}
                    onClick={() => setSearchOpen((prev) => !prev)}
                >
                    <img
                        src={searchOpen ? closeIcon : searchIcon}
                        alt="search"
                    />
                </button>

                <div className={styles.search_box}>
                    <img src={userSearchIcon} alt="search" />
                    <input placeholder="Enter Friend's ID" />
                    <img src={InfoIcon} alt="info" title="Each ID is unique" />
                </div>
            </div>

            {/* RIGHT */}
            <div
                className={`${styles.nav_right} ${styles.desktop_only}`}
                ref={desktopMenuRef}
            >
                <div
                    className={styles.profile_circle}
                    onClick={() => setDesktopMenuOpen((prev) => !prev)}
                />

                {desktopMenu()}
                {desktopSubMenu()}
            </div>
        </div>
    );
};

export default Navbar;
