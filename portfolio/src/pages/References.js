import ReferenceCard from "../components/ReferenceCard";

function References() {
    const references = [
        {
            name: "Sharon Tirta",
            company: "City of Toronto",
            position: "Accountant",
            testimonial:
                "Mitch's calculator application is easy to use, and I was able to functionally perform my accounting duties with it."
        },
        {
            name: "Aaron Hammond",
            company: "Nexus Inc.",
            position: "Professional",
            testimonial:
                "Mitch has provided a gym management system that has given my ideas for my own studio gym business."
        },
        {
            name: "Joe Smitgh",
            company: "Software Development Project",
            position: "Project Reviewer",
            testimonial:
                "Mitch is objectively progressing towards a full-stack developer."
        }
    ];

    return (
        <section className="references-page">
            <h1>References</h1>

            <p className="page-intro">
                Below are sample testimonials that represent feedback from academic
                and project-based work.
            </p>

            <div className="references-grid">
                {references.map((reference, index) => (
                    <ReferenceCard
                        key={index}
                        name={reference.name}
                        company={reference.company}
                        position={reference.position}
                        testimonial={reference.testimonial}
                    />
                ))}
            </div>
        </section>
    );
}

export default References;