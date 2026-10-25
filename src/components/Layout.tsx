import { Link, NavLink, Outlet } from 'react-router-dom';
import { Icon } from './Icon';

export function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand" aria-label="SpareDukaan home">
          <span className="brand__mark">
            <Icon name="shop" size={20} strokeWidth={2.2} />
          </span>
          <span className="brand__name">SpareDukaan</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/#counter" className="nav__link nav__link--strong">
            Spare Parts
          </NavLink>
          <NavLink to="/#counter" className="nav__link nav__link--strong">
            Accessories
          </NavLink>
          <a href="/#brands" className="nav__link">
            Phone brands
          </a>
          <a href="#help" className="nav__link">
            Help
          </a>
        </nav>
        <div className="header__actions">
          <a href="#track" className="nav__link">
            <Icon name="box" size={18} /> Track order
          </a>
          <a href="#account" className="iconbtn iconbtn--ghost" aria-label="Account">
            <Icon name="user" size={20} />
          </a>
          <a href="#cart" className="iconbtn iconbtn--cream" aria-label="Cart">
            <Icon name="cart" size={20} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">SpareDukaan</span>
        <nav className="footer__nav" aria-label="Footer">
          <a href="#shipping">Shipping</a>
          <a href="#returns">Returns</a>
          <a href="#privacy">Privacy</a>
          <a href="#contact">Contact</a>
          <a href="#model-help">Find your model code</a>
        </nav>
        <span>[BUSINESS NAME] · [GSTIN] · [SUPPORT HOURS]</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="page">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
