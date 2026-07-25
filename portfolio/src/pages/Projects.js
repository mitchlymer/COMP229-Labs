import ProjectCard from "../components/ProjectCard";

function Projects() {
    const projectList = [
        {
            title: "Gym Membership Management System",
            image: "",
            completionDate: "Ongoing",
            description:
                "A software design project for managing memberships, bookings, training sessions, payments, and client communication for a fitness studio. Utilizing AI predictive models to enhance services for trainers and clients."
        },
        {
            title: "Food Delivery Rider Application",
            image: "",
            completionDate: "May 2026",
            description:
                "A Java console application designed to manage food delivery rider information using classes, constructors, encapsulation, and object-oriented programming."
        },
        {
            title: "Calculator App",
            image: "",
            completionDate: "December 2025",
            description:
                "A calculator app using a visual UI, created in C#."
        }
    ];

    return (
        <section className="projects-page">
            <h1>Projects</h1>

            <p className="page-intro">
                Here are a few academic projects that demonstrate my growing skills in Software and Application development.
            </p>

            <div className="project-grid">
                {projectList.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.title}
                        image={project.image}
                        description={project.description}
                        completionDate={project.completionDate}
                    />
                ))}
            </div>
        </section>
    );
}

export default Projects;