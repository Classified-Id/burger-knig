export type TGameState = 'start' | 'game' | 'end';
export enum EnemyType {
  asteroid = 'asteroid',
  bomb = 'bomb',
  pirate = 'pirate',
}

export type TPlayer = {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
};

export type TBaseEnemy = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: EnemyType;
};

export type TPirate = TBaseEnemy & {
  coefficient: 1 | -1;
};

export type TBomb = TBaseEnemy & {
  coefficient: number;
};

export type TEnemy = TBaseEnemy | TPirate | TBomb;

export type IGameInitState = {
  gameState: TGameState;
  gameSpeed: number;
  player: TPlayer;
  enemies: TEnemy[];
  maxEnemyCount: number;
  hitsCount: number;
};
