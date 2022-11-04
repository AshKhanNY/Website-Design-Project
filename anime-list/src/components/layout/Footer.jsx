import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {

    return(
        <div className="wrap" data-nav-2>
            <div className="footer" data-nav-2>
                <div className="container" data-nav-2>
                    <div className="theme-selector">
                        <h2 data-nav-2>Site Theme</h2>
                        <div className="el-tooltip theme-preview default" data-nav-2 aria-describedby="el-tooltip-1107" tabIndex="0">A</div>
                        <div className="el-tooltip theme-preview dark" data-nav-2 aria-describedby="el-tooltip-1107" tabIndex="0">A</div>
                    </div>
                    <div className="links" data-nav-2>
                        <section data-nav-2>
                            <Link to="/" data-nav-2>Example Link</Link>
                            <Link to="/" data-nav-2>Example Link</Link>
                            <Link to="/" data-nav-2>Example Link</Link>
                        </section>
                        <section data-nav-2>
                            <Link to="/" data-nav-2>Example Link</Link>
                            <Link to="/" data-nav-2>Example Link</Link>
                            <Link to="/" data-nav-2>Example Link</Link>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;