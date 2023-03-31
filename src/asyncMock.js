const route = '/img/';

const products = [
    {
        id: '1',
        name: 'Wilson Combinada Hombre',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Negro y Blanco',
        size: '40',
        price: 29999,
        image: `${route}zapa-wilson_1.png`,
        stock: 10
    },
    {
        id: '2',
        name: 'Wilson Combinada Hombre',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Negro y Celeste',
        size: '41',
        price: 29300,
        image: `${route}zapa-wilson_2.png`,
        stock: 12
    },
    {
        id: '3',
        name: 'Wilson Combinada Mujer',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Rosa y Blanco',
        size: '38',
        price: 28500,
        image: `${route}zapa-wilson_3.png`,
        stock: 15
    },
    {
        id: '4',
        name: 'Wilson Combinada Mixta',
        category: 'Zapatillas',
        description: 'Zapatillas de tenis en Naranja',
        size: '43',
        price: 27800,
        image: `${route}zapa-wilson_4.png`,
        stock: 20
    },
    {
        id: '5',
        name: 'Tubo Head',
        category: 'Tubos',
        description: 'Tubo de Pelotas x 3 Profesionales',
        size: '--',
        price: 5800,
        image: `${route}tubo_pelotas_1.png`,
        stock: 60
    },
    {
        id: '6',
        name: 'Tubo Penn',
        category: 'Tubos',
        description: 'Tubo de Pelotas x 3 Profesionales',
        size: '--',
        price: 4700,
        image: `${route}tubo_pelotas_2.png`,
        stock: 125
    },
    {
        id: '7',
        name: 'Raqueta De Tenis',
        category: 'Raquetas',
        description: 'Raqueta De Tenis Babolat Pure Aero Grip 2 (4 1/4) Color:Amarillo',
        size: '4 1/4',
        price: 95299,
        image: `${route}raqueta01.png`,
        stock: 15
    },
    {
        id: '8',
        name: 'Raqueta De Tenis',
        category: 'Raquetas',
        description: 'Raqueta De Tenis Babolat Pure Aero Rafa - Tamaño Del Grip:4 3/8',
        size: '4 3/8',
        price: 99999,
        image: `${route}raqueta02.png`,
        stock: 12
    },
    {
        id: '9',
        name: 'Remera Deportiva Hombre',
        category: 'Remeras',
        description: 'Camiseta Nike Dri-Fit Academy',
        size: 'XL',
        price: 8750,
        image: `${route}remera01.png`,
        stock: 52
    },
    {
        id: '10',
        name: 'Remera Deportiva Hombre',
        category: 'Remeras',
        description: 'Remera Deportiva Hombre Lycra Ejercicio Sport Premiun Import',
        size: 'L',
        price: 5860,
        image: `${route}remera02.png`,
        stock: 50
    },
    {
        id: '11',
        name: 'Muñequeras Diadora',
        category: 'Munequeras',
        description: 'Muñequeras Diadora Algodon Deportivo Larga X Par (2 Unid.)',
        size: '--',
        price: 860,
        image: `${route}munequera01.png`,
        stock: 150
    },
    {
        id: '12',
        name: 'Muñequeras Doble Wilson',
        category: 'Munequeras',
        description: 'Par Muñequeras Doble Wilson Tenis Padel Paddle Tennis',
        size: '--',
        price: 4990,
        image: `${route}munequera02.png`,
        stock: 250
    },
    {
        id: '13',
        name: 'Vincha Nike Swoosh Negra',
        category: 'Vinchas',
        description: 'Vincha Nike Swoosh Negra - Material: 70% Algodón, 19% Poliamida, 7% Poliéster, 4% Caucho',
        size: '--',
        price: 3639,
        image: `${route}vincha01.png`,
        stock: 210
    },
    {
        id: '14',
        name: 'Vincha Adidas Toalla',
        category: 'Vinchas',
        description: 'Vincha adidas Toalla Reversibles Absorbentes Tenis Padel',
        size: '--',
        price: 6790,
        image: `${route}vincha02.png`,
        stock: 350
    },
    {
        id: '15',
        name: 'Vincha Nike Swoosh Negra',
        category: 'Vinchas',
        description: 'Vincha Nike Swoosh Negra - Material: 70% Algodón, 19% Poliamida, 7% Poliéster, 4% Caucho',
        size: '--',
        price: 3639,
        image: `${route}vincha01.png`,
        stock: 210
    },
    {
        id: '16',
        name: 'Vincha Adidas Toalla',
        category: 'Vinchas',
        description: 'Vincha adidas Toalla Reversibles Absorbentes Tenis Padel',
        size: '--',
        price: 6895,
        image: `${route}vincha02.png`,
        stock: 350
    },
    {
        id: '17',
        name: 'Muñequeras Diadora',
        category: 'Munequeras',
        description: 'Muñequeras Diadora Algodon Deportivo Larga X Par (2 Unid.)',
        size: '--',
        price: 870,
        image: `${route}munequera01.png`,
        stock: 150
    },
    {
        id: '18',
        name: 'Muñequeras Doble Wilson',
        category: 'Munequeras',
        description: 'Par Muñequeras Doble Wilson Tenis Padel Paddle Tennis',
        size: '--',
        price: 5100,
        image: `${route}munequera02.png`,
        stock: 250
    },
    {
        id: '19',
        name: 'Remera Deportiva Hombre',
        category: 'Remeras',
        description: 'Camiseta Nike Dri-Fit Academy',
        size: 'XL',
        price: 8750,
        image: `${route}remera01.png`,
        stock: 52
    },
    {
        id: '20',
        name: 'Remera Deportiva Hombre',
        category: 'Remeras',
        description: 'Remera Deportiva Hombre Lycra Ejercicio Sport Premiun Import',
        size: 'L',
        price: 5860,
        image: `${route}remera02.png`,
        stock: 50
    },
    {
        id: '21',
        name: 'Raqueta De Tenis',
        category: 'Raquetas',
        description: 'Raqueta De Tenis Babolat Pure Aero Rafa - Tamaño Del Grip:4 3/8',
        size: '4 3/8',
        price: 99999,
        image: `${route}raqueta02.png`,
        stock: 12
    },
    {
        id: '22',
        name: 'Raqueta De Tenis',
        category: 'Raquetas',
        description: 'Raqueta De Tenis Babolat Pure Aero Rafa - Tamaño Del Grip:4 3/8',
        size: '4 3/8',
        price: 99999,
        image: `${route}raqueta02.png`,
        stock: 12
    },
    {
        id: '23',
        name: 'Tubo Head',
        category: 'Tubos',
        description: 'Tubo de Pelotas x 3 Profesionales',
        size: '--',
        price: 5800,
        image: `${route}tubo_pelotas_1.png`,
        stock: 60
    },
    {
        id: '24',
        name: 'Tubo Penn',
        category: 'Tubos',
        description: 'Tubo de Pelotas x 3 Profesionales',
        size: '--',
        price: 4700,
        image: `${route}tubo_pelotas_2.png`,
        stock: 125
    }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 500)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 500)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 500)
    })
}