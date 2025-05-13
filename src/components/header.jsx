import  { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { NavLink } from "react-router-dom";
import LoginToggle from "./LoginToggle";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const styles = {
    scrollToTop: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
    },
    scrollButton: {
      backgroundColor: "#0d9488",
      color: "white",
      border: "none",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease",
    },
    a: {
      textDecoration: "none !important",
    },
    scrollButtonHover: {
      backgroundColor: "#0d9488",
      transform: "translateY(-3px)",
    },
    arrowIcon: {
      width: "24px",
      height: "24px",
    },
    a:{
      textDecoration:"none !important", 
    }
  };

  const buttonStyle = {
    ...styles.scrollButton,
    ...(isHovered && styles.scrollButtonHover),
  };

  return (
    <div style={styles.scrollToTop}>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.arrowIcon}
          >
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s ease",
      backgroundColor: "white",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      width: "90%",
      margin: "0 auto",
    },
    scrolledHeader: {
      width: "100%",
      margin: "0 auto",
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(5px)",
      WebkitBackdropFilter: "blur(5px)",
    },
    navbarScrolled: {
      width: "100%",
      margin: "0 auto",
      backgroundColor: "rgba(255, 255, 255, 0.466)",
    },
    logoutButton: {
      backgroundColor: "#4e5153",
      border: "1px solid #4e5153",
      color: "#d6cfcf",
      marginLeft: "10px",
      transition: "all 0.3s",
    },
    logoutButtonHover: {
      backgroundColor: "#1487d3",
      border: "1px solid #1487d3",
    },
    title: {
      fontWeight: "bold",
      color: "#333",
      transition: "all 0.3s",
    },
    navLink: {
      color: "#333",
      fontWeight: 400,
      padding: "0.4rem 0.6rem",
      textDecoration: "none",
    },
    navLinkHover: {
      color: "#4c8565",
    },
    activeNavLink: {
      color: "#4c8565", // تم تغيير اللون هنا من #0d6efd إلى #4c8565
      fontWeight: "bold",
    },
    dropdownMenu: {
      border: "none",
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
    },
    dropdownItem: {
      padding: "0.5rem 1.5rem",
    },
    activeDropdownItem: {
      color: "#4c8565", // تم تغيير اللون هنا من #0d6efd إلى #4c8565
      backgroundColor: "transparent",
      fontWeight: "bold",
    },
    searchInput: {
      borderRadius: "20px",
      padding: "0.5rem 1rem",
    },
    navItem: {
      margin: "0 15px",
      textDecoration: "none",
      color: "#080808",
    },
    navItemHover: {
      color: "#4c8565", // تم تغيير اللون هنا من #2622e9 إلى #4c8565
    },
    link: {
      textDecoration: "none !important",
      color: "inherit !important"
    },
  };

  return (
    <>
      <header
        className="sticky-top"
        style={{
          ...styles.header,
          ...(isScrolled ? styles.scrolledHeader : {}),
        }}
      >
        <div className="container-fluid">
          <div
            className={`row display-flex py-2 ${
              isScrolled ? "d-none" : "bg-dark"
            }`} style={{justifyContent:"space-between"}}
          >
            <div className="col-md-8 d-flex align-items-center" >
              <h5 className="date text-white mb-0">
                {new Date().toLocaleDateString("ar-EG", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h5>{" "}
            </div>
            < LoginToggle />
          </div>

          <div className={`row align-items-center ${isScrolled ? "py-2" : "py-3"}`}>
            <div className="col-md-8">
              <a href="/"  style={{ textDecoration: 'none' }}>
                <h2 className="mb-0" style={styles.title}>
                  لمحة <span style={{color:'#0d9488'}}>NEWS</span>
                </h2>
              </a>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="ادخل كلمة البحث"
                className="form-control"
                style={styles.searchInput}
              />
            </div>
          </div>
          <nav
            className={`navbar navbar-expand-lg navbar-light ${
              isScrolled ? "py-1" : "py-2"
            }`}
            style={{
              ...(isScrolled ? styles.navbarScrolled : {}),
            }}
          >
            <div className="container-fluid">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  {[
                    { path: "/", name: "الصفحة الرئيسية" },
                    { path: "/Urgent", name: "الأخبار العاجلة" },
                    { path: "/sport", name: "الرياضة" },
                    { path: "/weather", name: "الطقس" },
                    { path: "/disasters", name: "الكوارث" },
                    { path: "/health", name: "الصحة" },
                  ].map((item) => (
                    <li
                      key={item.path}
                      className="nav-item"
                      style={styles.navItem}
                    >
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => 
                          isActive ? "nav-link active" : "nav-link"
                        }
                        style={({ isActive }) => 
                          isActive 
                            ? {...styles.navLink, ...styles.activeNavLink}
                            : styles.navLink
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}

                  <li className="nav-item dropdown" style={styles.navItem}>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={styles.navLink}
                    >
                      المناطق
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                      style={styles.dropdownMenu}
                    >
                      {[
                        { path: "/regions/north", name: "غزة" },
                        { path: "/regions/south", name: "مصر" },
                        { path: "/regions/east", name: "سوريا" },
                      ].map((region) => (
                        <li key={region.path}>
                          <NavLink
                            to={region.path}
                            className={({ isActive }) => 
                              isActive ? "dropdown-item active" : "dropdown-item"
                            }
                            style={({ isActive }) => 
                              isActive 
                                ? {...styles.dropdownItem, ...styles.activeDropdownItem}
                                : styles.dropdownItem
                            }
                          >
                            {region.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>

                  <li className="nav-item" style={styles.navItem}>
                    <NavLink
                      to="/advertise"
                      className={({ isActive }) => 
                        isActive ? "nav-link active" : "nav-link"
                      }
                      style={({ isActive }) => 
                        isActive 
                          ? {...styles.navLink, ...styles.activeNavLink}
                          : styles.navLink
                      }
                    >
                      أعلن معنا
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <ScrollToTopButton />
    </>
  );
};

export default Header;