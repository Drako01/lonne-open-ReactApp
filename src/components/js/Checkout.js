import CreditCardForm from './CreditCard';

const Checkout = () => {
    return (
        <div className='Checkout'>
            <h1 className='Mini'>
                Payment
            </h1>
            <section className='Checkout__'>
            <CreditCardForm />
            </section>            
        </div>
    )
}

export default Checkout