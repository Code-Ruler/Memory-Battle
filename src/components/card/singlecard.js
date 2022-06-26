import './singlecard.css'

function Singlecard({ card, choice, toFlip, todisable}) {

    const choiceUpdate = () => {
        if(!todisable)
            choice(card)
    }

    const flipped = toFlip(card)

    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ""}>
                <img className='front' src={card.src} alt="Front of Card" />
                <img className='back' src="/img/pexels-kseniya-lapteva-9176064.jpg" alt="Back  of card" onClick={choiceUpdate} />
            </div>

        </div>
    )
}

export default Singlecard