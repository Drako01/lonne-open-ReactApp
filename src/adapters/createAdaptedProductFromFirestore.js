export const createAdaptedProductFromFirestore = (doc) => {
    const data = doc.data()

    const productAdapted = {
        id: doc.id,
        name: data.name,
        image: data.image,
        price: data.price,
        size: data.size,
        stock: data.stock,
        category: data.category,
        description: data.description
    }

    return productAdapted
}

