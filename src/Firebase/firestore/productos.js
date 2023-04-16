import { getDocs, collection, query, where, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { createAdaptedProductFromFirestore } from '../../adapters/createAdaptedProductFromFirestore'

export const getProducts = (categoryId) => {
    const productsRef = categoryId
        ? query(collection(db, 'products'), where('category', '==', categoryId))
        : collection(db, 'products')

    return getDocs(productsRef)
        .then(snapshot => {
            console.log(snapshot)
            const productsAdapted = snapshot.docs.map(doc => {
                return createAdaptedProductFromFirestore(doc)
            })
            return productsAdapted
        })
        .catch(error => {
            return error
        })
}

export const getProductById = (productId) => {
    const productRef = doc(db, 'products', productId)

    return getDoc(productRef)
        .then(snapshot => {
            const productAdapted = createAdaptedProductFromFirestore(snapshot)
            return productAdapted
        })
        .catch(error => {
            return error
        })

}