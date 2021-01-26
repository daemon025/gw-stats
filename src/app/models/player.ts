export class Player {
    /**
     *
     */
    constructor(
        public id: number, 
        public name: string,
        public active: boolean, 
        public profileIcon: ProfileIcon, 
        public countryCode: string,
        public difficulty: number) {
    }
}

export class ProfileIcon {
    /**
     *
     */
    constructor(
        public border: number,
        public color: number,
        public icon: number) {   
    }
}