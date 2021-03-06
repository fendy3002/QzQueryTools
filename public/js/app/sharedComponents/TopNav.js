import React from 'react'

var TopNav = ({host}) => <header className="main-header">
    <a href={host} className="logo">
        <span className="logo-mini"><b>Qz</b>Q</span>
        <span className="logo-lg"><b>Qz</b>QueryTools</span>
    </a>
    <nav className="navbar navbar-static-top">
    	<a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
			<span className="sr-only">Toggle navigation</span>
			<span className="icon-bar"></span>
			<span className="icon-bar"></span>
			<span className="icon-bar"></span>
		</a>
    </nav>
</header>;

export default TopNav;
