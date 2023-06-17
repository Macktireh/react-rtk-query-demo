import styled from "styled-components";

import { theme } from "@/constant/theme";
import { Link } from "react-router-dom";

const _Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 100px;
  padding: 10px;
  margin: 10px 0;
  nav {
    ul {
      display: flex;
      gap: 20px;
      a {
        cursor: pointer;
        text-decoration: none;
        padding: 10px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.secondary};
        transition: all 0.2s ease;
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

export const Header = () => {
  return (
    <_Header theme={theme}>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </ul>
      </nav>
      <h1>Vite + React + Redux Toolkit + RTK Query</h1>
    </_Header>
  );
};
