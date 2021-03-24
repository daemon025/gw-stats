export class PlayerListModel {
    /**
     *
     */
    constructor(
        public countryCode: string,
        public name: string,
        public wins: number,
        public loses: number,
        public winrate: number,
        public winStreak: number) {
        this.countryCode = countryCode.toLocaleLowerCase();
    }
}
