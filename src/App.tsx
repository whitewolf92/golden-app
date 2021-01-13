import React, { useState } from "react";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import "./App.scss";

import { requestData } from "./redux";
import { ApiData } from "./interfaces";

interface DataState {
  data: ApiData[];
  isError: boolean;
  errorMsg: string;
}

interface GridItemProps {
  className: string;
  imageUrl: string;
  mainText: string;
  style: any;
  spanStyle: any;
  linkHref: string;
  linkText: string;
}

const SpecialSpan = ({
  style,
  mainText
}: {
  style: object;
  mainText: string;
}) => (
  <span
    className="main-content"
    style={style}
    dangerouslySetInnerHTML={{ __html: mainText }}
  />
);

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const typedUseSelector: TypedUseSelectorHook<DataState> = useSelector;

  const { data, isError, errorMsg } = typedUseSelector(state => state);

  const [toggle, setToggle] = useState(false);

  const handleToggle = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    setToggle(!toggle);
  };

  React.useEffect(() => {
    dispatch(requestData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GridItem = ({
    className,
    imageUrl,
    mainText,
    style,
    spanStyle,
    linkHref,
    linkText
  }: GridItemProps) => {
    return (
      <div
        className={className}
        style={{ backgroundImage: `url(${imageUrl})`, ...style }}
      >
        {mainText && <SpecialSpan style={spanStyle} mainText={mainText} />}
        <div />
        {linkHref && linkHref.length > 0 && (
          <a className="explore-link" href={linkHref}>
            {linkText}
          </a>
        )}
      </div>
    );
  };

  const toggleImage: string = toggle
    ? "global/toggle.png"
    : "global/hamburger.png";

  return (
    <div className="app">
      <header className={`app-header ${toggle ? "active" : ""}`}>
        <ul className="menu">
          <li className="logo-holder">
            <img
              className="logo"
              src="global/logo-small.png"
              alt="logo small"
            />
          </li>
          <li className="item">
            <div className="mobile-btn-holder">
              <a href="#" className="btn btn-white">
                Login
              </a>
              <a href="#" className="btn btn-red">
                Sign up
              </a>
            </div>
          </li>
          <li className="item active">
            <a href="#">Home</a>
          </li>
          <li className="item">
            <a href="#">RPG</a>
          </li>
          <li className="item">
            <a href="#">Arcade</a>
          </li>
          <li className="item item--flex-one">
            <a href="#">Brain Games</a>
          </li>
          <li className="item text--center">
            <a href="#" className="btn btn-white display-hide-mobile">
              Login
            </a>
            <a href="#">Support</a>
          </li>
          <li className="item text--center padding-right-0">
            <a href="#" className="btn btn-red display-hide-mobile">
              Sign up
            </a>
            <a href="#">Contact Us</a>
          </li>
          <li className="toggle">
            <img
              className="toggle-image"
              src={`${toggleImage}`}
              onClick={handleToggle}
              alt="toggle"
            />
          </li>
        </ul>
      </header>
      <main>
        <div className="grid-container">
          {isError && <h1 className="error-message">{errorMsg.toString()}</h1>}
          {!isError &&
            data.map((item: ApiData, index: number) => (
              <GridItem
                key={index}
                className={`item-${index + 1}`}
                imageUrl={item.src}
                mainText={item.mainText}
                style={item.style}
                spanStyle={item.spanStyle}
                linkHref={item.linkHref}
                linkText={item.linkText}
              />
            ))}
        </div>
      </main>
      <footer>
        <div className="footer-board">
          <div className="footer-board-col">
            <img
              className="footer-logo"
              src="global/logo-small.png"
              alt="footer logo"
            />
          </div>
          <div className="footer-board-col">
            <ul className="footer-menu">
              <li className="strong">Contact us</li>
              <li>Help Centre</li>
              <li>The Group</li>
              <li>Affliates</li>
            </ul>
          </div>
          <div className="footer-board-col">
            <ul className="footer-menu">
              <li className="strong">Information</li>
              <li>Terms & Conditions</li>
              <li>Payment Methods</li>
              <li>Bonus Terms</li>
              <li>Responsible Gaming</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
