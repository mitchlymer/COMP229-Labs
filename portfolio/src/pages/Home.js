import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="home-page">
            <div className="hero-section">
                <h1>Welcome to My Portfolio</h1>

                <p>
                    My name is Mitch Lymer. I am a Web Application Development student at Centennial College, building skills in React, Node.js, Express, MongoDB, and full-stack application development.
                </p>

                <p className="mission-statement">
                    I am a born leader and educator. With 15 years work experience in customer service, 6.5 years of that being in technology and application support roles. I have an intuition for recognizing patterns and passionate drive for solving problems.
                </p>

                <Link to="/about" className="primary-button">
                    Learn More
                </Link>
            </div>
        </section>
    );
}

export default Home;