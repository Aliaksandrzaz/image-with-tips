interface IConfig {
    displayType: string,
    image: {
        x: number,
        y: number
    },
    previousPart: string,
    tips: {
        point: {
            x: number,
            y: number,
        },
        description: {
            x: number,
            y: number,
            label: string
        },
        nextPart: string,
        id: number,
    }[],
    order?: {
        x: number,
        y: number
    }
}

declare var config: IConfig;
