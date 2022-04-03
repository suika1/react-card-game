//shuffles an array
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};


//mocks for images
export const CARDS4x4 = [
    {image: '4-1.jpg'},
    {image: '4-2.jpg'},
    {image: '4-3.jpg'},
    {image: '4-4.jpg'},

    {image: '4-5.jpg'},
    {image: '4-6.png'},
    {image: '4-7.png'},
    {image: '4-8.jpg'},

    {image: '4-1.jpg'},
    {image: '4-2.jpg'},
    {image: '4-3.jpg'},
    {image: '4-4.jpg'},

    {image: '4-5.jpg'},
    {image: '4-6.png'},
    {image: '4-7.png'},
    {image: '4-8.jpg'}
];

const CARDS6x6 = [
    { image: '6-1.jpg' },
    { image: '6-2.jpg' },
    { image: '6-3.jpg' },
    { image: '6-4.jpg' },
    { image: '6-5.jpg' },
    { image: '6-6.jpg' },

    { image: '6-7.jpg' },
    { image: '6-8.jpg' },
    { image: '6-9.jpg' },
    { image: '6-10.jpg' },
    { image: '6-11.jpg' },
    { image: '6-12.jpg' },

    { image: '6-13.jpg' },
    { image: '6-14.jpg' },
    { image: '6-15.jpg' },
    { image: '6-16.jpg' },
    { image: '6-17.jpg' },
    { image: '6-18.jpg' },

    { image: '6-1.jpg' },
    { image: '6-2.jpg' },
    { image: '6-3.jpg' },
    { image: '6-4.jpg' },
    { image: '6-5.jpg' },
    { image: '6-6.jpg' },

    { image: '6-7.jpg' },
    { image: '6-8.jpg' },
    { image: '6-9.jpg' },
    { image: '6-10.jpg' },
    { image: '6-11.jpg' },
    { image: '6-12.jpg' },

    { image: '6-13.jpg' },
    { image: '6-14.jpg' },
    { image: '6-15.jpg' },
    { image: '6-16.jpg' },
    { image: '6-17.jpg' },
    { image: '6-18.jpg' },
];

export const CARDS = [CARDS4x4, CARDS6x6];

//mock for shirts
export const SHIRTS = [
    { image: 's1.png' },
    { image: 's2.png' },
];
