import Card from "./Card"

const CardList = ({ products }) => {    
    return (
            <div className='CardsPanel'>
                {products.map(product => <Card key={product.id} {...product}/>)}
            </div>
    )
}
export default CardList;