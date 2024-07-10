export interface Team {
  name: string;
  logo: string;
  score: number | null;
}

export enum Sport {
  FOOTBALL = "football",
  BASKETBALL = "basketball",
  NFL = "nfl",
  RUGBY = "rugby",
  BASEBALL = "baseball",
  MMA = "mma",
}

export enum EventType {
  FIXTURE = "fixture",
  LEAGUE = "league",
  STANDINGS = "standings",
}


export interface League {
  name: string;
  logo: string;
}



export interface DatedLeague extends League {
  startDate: Date;
  endDate: Date;
}


export interface Standing {
  name: string;
  rank: number;
}
export enum BetType {
  FTR = 'Full Time Result',
  OUTRIGHTS = 'Outright',
  FR = 'Final Result',
}


export interface Market {
  id: number;
  name: string;
  betType: BetType;
  result: boolean | null;
}



export interface EventDetailsFixture {
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  time: string;
}



export interface EventDetailsLeague {
  league: DatedLeague;
  standings: Standing[];
}

interface EventBase {
  sport: Sport;
  id: number;
  leagueId: number;
  season: string;
  status: string;
  markets: Market[];
  date: Date;
}

export interface FixtureEvent extends EventBase {
  eventType: EventType.FIXTURE;
  eventDetails: EventDetailsFixture;
}

// TODO should a standings event be a separate type?
export interface LeagueEvent extends EventBase {
  eventType: EventType.LEAGUE | EventType.STANDINGS;
  eventDetails: EventDetailsLeague;
}

export type Event = FixtureEvent | LeagueEvent;

export type Events = {
  [sport in Sport]?: Event[];
};

export interface EventCanister<TEventType = EventType> {
  event: TEventType extends EventType.FIXTURE ? FixtureEvent : LeagueEvent;
  canisterID: string;
}
