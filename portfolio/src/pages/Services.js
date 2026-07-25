import ServiceCard from "../components/ServiceCard";

function Services() {

    const services = [
        {
            title: "Web Development",
            description:
                "Creating responsive websites and web applications using React, Node.js, and JavaScript."
        },

        {
            title: "Database Services",
            description:
                "Designing and implementing SQL and MongoDB databases for storing and managing information."
        },

        {
            title: "Software Development",
            description:
                "Building applications and solving problems using Java, C#, and object-oriented programming concepts."
        }
    ];

    return (
        <section className="services-page">

            <h1>Services</h1>

            <p className="page-intro">
                Below are some of the skills and services that I am developing.
            </p>

            <div className="services-grid">

                {services.map((service, index) => (

                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                    />

                ))}

            </div>

        </section>
    );
}

export default Services;