// importing components
import React from 'react';
import Card from './Card';


const Dashboard = ({ cardData, setValue, value }) => {
    return (
        <div>
            <header className="bg-dark py-5">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">One Piece</h1>
                        <p className="lead fw-normal text-white-50 mb-0">Set sail on a voyage to find Gold D. Roger' ultimate treasure "One Piece" with Luffy and his crew. Assemble your
                            own crew of Straw Hat Pirates in your One Piece Funko Pop! vinyl collection including Luffy, Roronoa Zoro, Brook and Jinbe.</p>
                    </div>
                </div>
            </header>
            <section className="py-5">
                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {cardData.map((card, index) => (
                            <Card key={index} {...card} setValue={setValue} value={value} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
