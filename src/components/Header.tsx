import { Link, useMatch } from "react-router-dom";
import { styled } from "styled-components";
import {
  motion,
  useScroll,
  useAnimationControls,
  useMotionValueEvent,
} from "framer-motion";

import { LogoPath } from "../util/logoPathData";
import { useState } from "react";

const Nav = styled(motion.nav)`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.span`
  color: white;
  display: flex;
  position: relative;
  align-items: center;
  svg {
    height: 25px;
  }
`;

const Underline = styled(motion.span)`
  position: absolute;
  width: 35px;
  height: 1px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 5px 10px;
  padding-left: 38px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const navVariants = {
  start: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

const inputVariants = {
  start: {
    scaleX: 0,
  },
  animate: {
    scaleX: 1,
  },
};

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

const Header = () => {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const inputAnimation = useAnimationControls();
  const navAnimation = useAnimationControls();
  const { scrollYProgress } = useScroll();
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start("start").catch((err) => {
        console.log(err);
      });
    } else {
      inputAnimation.start("animate").catch((err) => {
        console.log(err);
      });
    }

    setSearchOpen((prev) => !prev);
  };

  useMotionValueEvent(scrollYProgress, "change", (y) => {
    if (y < 0.1) {
      navAnimation.start("start").catch((err) => {
        console.log(err);
      });
    } else {
      navAnimation.start("scroll").catch((err) => {
        console.log(err);
      });
    }
  });

  return (
    <Nav variants={navVariants} initial="start" animate={navAnimation}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d={LogoPath} />
        </Logo>
        <Items>
          <Item>
            <Link to={"/"}>
              Home {homeMatch && <Underline layoutId="underline" />}
            </Link>
          </Item>
          <Item>
            <Link to={"/tv"}>
              TV Shows {tvMatch && <Underline layoutId="underline" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            variants={inputVariants}
            initial="start"
            transition={{ type: "linear" }}
            animate={inputAnimation}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Col>
    </Nav>
  );
};

export default Header;
