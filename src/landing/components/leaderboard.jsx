import styled from "styled-components";
import { useLeaderboard } from "../../hooks/use-leaderboard";
import { Icon } from "../../components/icon/icon";
import { Colors } from "../../utils/style-helpers/color-styles";
import { Text } from "../../components/atoms/text";

export const Leaderboard = () => {
  const { leaderboard, isLeaderboardEmpty } = useLeaderboard();

  if (isLeaderboardEmpty()) return <></>;

  return (
    <S.Table>
      <S.Header>
        <Icon name="trophy" size={30} color="#F26856" />
        <S.h1>Points Leaderboard</S.h1>
      </S.Header>
      {getTopFive(leaderboard).map((entry, index) => (
        <S.ListItem key={entry[0]}>
          <S.Bullet>{index + 1}</S.Bullet>
          <Text textalign="left" color={Colors.tertiary} ellipsis="true">
            {entry[0]}
          </Text>
          <Text textalign="right" color={Colors.tertiary}>
            {entry[1]}
          </Text>
        </S.ListItem>
      ))}
    </S.Table>
  );
};

const getTopFive = (leaderboard) => {
  const entries = Object.entries(leaderboard)
    .sort((entryA, entryB) => entryB[1] - entryA[1])
    .splice(0, 5);

  return entries;
};

const S = {
  Table: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 8px;
    padding: 0 1rem;
    box-shadow: 0 7px 30px rgba(62, 9, 11, 0.3);
    max-width: 22rem;

    & :last-child {
      border-radius: 0 0 8px 8px;
    }
  `,
  Header: styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    background: ${Colors.primary};
    align-items: center;
    padding: 0 1rem;
    border-radius: 8px 8px 0 0;
  `,
  h1: styled.h1`
    font-size: 18px;
    padding: 0.8rem 0.8rem 1.2rem;
    color: white;
  `,
  ListItem: styled.div`
    display: grid;
    padding: 0.8rem 1rem 1.2rem;
    width: 100%;
    background: ${Colors.surface};
    grid-template-columns: 1fr 3fr 2fr;
    align-items: center;
    transition: 0.1s linear;

    &:hover {
      transform: scaleX(1.1);
    }
  `,
  Bullet: styled.span`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
};
