import { ProfileIcon } from "../../../models/player";

export class Survivor {
    name: string;
    image: string;
    country: string;
    rarity: SurvivorRarity;
    profileIcon: ProfileIcon;
    team: number;
    avg: number;

    constructor(name: string, country: string, rarity: number, profileIcon: ProfileIcon, team: number, avg: number) {
        this.name = name;
        this.country = country.toLowerCase();
        this.rarity =  (rarity >= 0 ? rarity : 0) as SurvivorRarity;
        this.image = 'https://cdn.discordapp.com/avatars/700755950427963473/59f16c95794ba16ca7d29fe927bb7a2a.png?size=256';
        this.profileIcon = profileIcon;
        this.team = team;
        this.avg = avg;
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