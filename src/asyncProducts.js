const route = '/img/';

const products = [
    {
        id: '1',
        name: 'Wilson Combinada Hombre',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Negro y Blanco',
        size: '40',
        price: '30.000',
        image:  `${route}zapa-wilson_1.png`,
        stock: 10
    },
    {
        id: '2',
        name: 'Wilson Combinada Hombre',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Negro y Celeste',
        size: '41',
        price: '29.300',
        image: `${route}zapa-wilson_2.png`,
        stock: 12
    },
    {
        id: '3',
        name: 'Wilson Combinada Mujer',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Rosa y Blanco',
        size: '38',
        price: '28.500',
        image: `${route}zapa-wilson_3.png`,
        stock: 15
    },
    {
        id: '4',
        name: 'Wilson Combinada Mixta',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Naranja',
        size: '43',
        price: '27.800',
        image: `${route}zapa-wilson_4.png`,
        stock: 20
    },
    {
        id: '5',
        name: 'Head',
        category: 'Tubo de Pelotas',
        description: 'Tubo de Pelotas x 3 Profesionales',
        size: '--',
        price: '5.800',
        image: `${route}tubo_pelotas_1.png`,
        stock: 60
    },
    {
        id: '6',
        name: 'Penn',
        category: 'Tubo de Pelotas',
        description: 'Tubo de Pelotas x 3 Profesionales',
        size: '--',
        price: '4.700',
        image: `${route}tubo_pelotas_2.png`,
        stock: 125
    }
    ,
    {
        id: '7',
        name: 'Raqueta De Tenis',
        category: 'Raqueta',
        description: 'Raqueta De Tenis Babolat Pure Aero Grip 2 (4 1/4) Color:Amarillo',
        size: '4 1/4',
        price: '95.299',
        image: `${route}raqueta01.png`,
        stock: 15
    },
    {
        id: '8',
        name: 'Raqueta De Tenis',
        category: 'Raqueta',
        description: 'Raqueta De Tenis Babolat Pure Aero Rafa - Tamaño Del Grip:4 3/8',
        size: '4 3/8',
        price: '99.999',
        image: `${route}raqueta02.png`,
        stock: 12
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}
