import React, { useEffect, useState } from "react";
import { useSocketContext } from "../socket";
import styled from "styled-components";
import { OptionCard } from "./components/option-card";
import { ResultArea } from "./components/result-area";
import { useLeaderboard } from "../hooks/use-leaderboard";
import { Scorecard } from "./components/score-card";

export const GameArea = ({ username, players, roomId }) => {
  const [userScore, setUserScore] = useState(0);
  const [oppScore, setOppScore] = useState(0);
  const [userSelection, setUserSelection] = useState(undefined);
  const [opponentSelection, setOpponentSelection] = useState(undefined);
  const user = players.p1 === username ? "p1" : "p2";
  const opponent = players.p1 === username ? "p2" : "p1";
  const { socket } = useSocketContext();
  const { updateLeaderboard, leaderboard } = useLeaderboard();

  useEffect(() => {
    const currentUserHigh =
      leaderboard && leaderboard[username] ? leaderboard[username] : 0;
    const currentOppHigh =
      leaderboard && leaderboard[players[opponent]]
        ? leaderboard[players[opponent]]
        : 0;
    if (userScore > currentUserHigh) updateLeaderboard(username, userScore);
    if (oppScore > currentOppHigh)
      updateLeaderboard(players[opponent], oppScore);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userScore, oppScore]);

  useEffect(() => {
    socket.on(`playerChoice`, addOpponentChoice);

    socket.on("decision", onDecision);

    return () => {
      socket.off("decision", onDecision);
      socket.off("playerChoice", addOpponentChoice);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addOpponentChoice = ({ value, player }) => {
    if (player === opponent) setOpponentSelection(value);
  };

  const onDecision = ({ winner }) => {
    setTimeout(() => {
      if (user === winner) declareWinner();
      else if (winner === "d") declareDraw();
      else declareLoser();

      setUserSelection(undefined);
      setOpponentSelection(undefined);
    }, 2500);
  };

  const onOptionSelect = (value) => {
    if (userSelection) {
      alert("Please wait for your opponent to make their move");
      return;
    }
    setUserSelection(value);
    if (user === "p1") {
      socket.emit("p1Choice", { value, roomId });
    } else {
      socket.emit("p2Choice", { value, roomId });
    }
  };

  const declareDraw = () => {};

  const declareWinner = () => {
    setUserScore((prev) => prev + 1);
  };

  const declareLoser = () => {
    setOppScore((prev) => prev + 1);
  };

  return (
    <S.GameArea>
      <Scorecard
        user={username}
        userScore={userScore}
        opp={players[opponent]}
        oppScore={oppScore}
      />
      <S.Game>
        <OptionCard
          cardType="rock"
          isChoice={userSelection === "rock"}
          onClick={() => onOptionSelect("rock")}
        />
        <OptionCard
          cardType="paper"
          isChoice={userSelection === "paper"}
          onClick={() => onOptionSelect("paper")}
        />
        <OptionCard
          cardType="scissor"
          isChoice={userSelection === "scissor"}
          onClick={() => onOptionSelect("scissor")}
        />
      </S.Game>
      <ResultArea
        userSelection={userSelection}
        oppositionSelection={opponentSelection}
      />
    </S.GameArea>
  );
};

const S = {
  GameArea: styled.main`
    width: 100%;
    height: 100%;
    margin-block: 2rem 0;
  `,
  Game: styled.div`
    width: 50%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: 5rem;
    align-items: center;

    @media (max-width: 650px) {
      flex-direction: column;
      gap: 3rem;
    }
  `,
};
