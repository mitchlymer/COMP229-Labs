import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import ProjectCard from "../components/ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const result = await apiRequest("/projects");
                setProjects(result.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    return (
        <section className="projects-page">
            <h1>Projects</h1>

            <p className="page-intro">
                Here are a few academic projects that demonstrate my growing
                skills in Software and Application development.
            </p>

            {loading && <p>Loading projects...</p>}

            {error && (
                <p className="error-message">{error}</p>
            )}

            {!loading && !error && projects.length === 0 && (
                <p>No projects were found.</p>
            )}

            {!loading && !error && projects.length > 0 && (
                <div className="project-grid">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            image={project.image}
                            description={project.description}
                            completionDate={project.completionDate}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;