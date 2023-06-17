import styled from "styled-components";

import { theme } from "@/constant/theme";

const _Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  strong {
    font-size: 1.2rem;
  }
  p {
    line-height: 1.5rem;
  }
  small {
    text-align: right;
    font-style: italic;
  }
`;

export const PostCard: React.FC<IPost> = ({ title, body }) => {
  return (
    <_Container theme={theme}>
      <strong>{title}</strong>
      <p>{body}</p>
      <small>Jhon Doe</small>
    </_Container>
  );
};
