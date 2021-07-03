import { ProfileIcon } from "../../../models/player";
import { DaysStats, WinLoseStats } from "../../../models/player-stats";

export class Survivor {
    id: number;
    name: string;
    country: string;
    rarity: SurvivorRarity;
    profileIcon: ProfileIcon;
    team: number;
    avg: number;
    winLoseStats: WinLoseStats;
    daysStats: DaysStats[];

    constructor(id: number, name: string, country: string, rarity: number, profileIcon: ProfileIcon, team: number, avg: number, 
        winLoseStats: WinLoseStats, daysStats: DaysStats[]) {

        this.id = id;
        this.name = name;
        this.country = country.toLowerCase();
        this.rarity =  (rarity >= 0 ? rarity : 0) as SurvivorRarity;
        this.profileIcon = profileIcon;
        this.team = team;
        this.avg = avg;
        this.winLoseStats = winLoseStats;
        this.daysStats = daysStats;
    }

    get starColors(): string[] {
        let result: string[] = [];
        if (this.rarity < SurvivorRarity.Elite) {
            for (var i = 0; i <= this.rarity; i++)
                result.push('grey-icon');
            return result;
        }
        const pinkStars = this.rarity - SurvivorRarity.Legendary;
        for (var i = 0; i < 5 - pinkStars; i++)
            result.push('grey-icon');
        for (var i = 0; i < pinkStars; i++)
            result.push('pink-icon');

        return result;
    }

    get rarityColor(): string {
        return `survivor-rarity-${SurvivorRarity[this.rarity].toLowerCase()}`;
    }
}

export enum SurvivorRarity {
    Common, Uncommon, Rare, Epic, Legendary, Elite, Elite2, Elite3, Elite4, Elite5
}