import { useEffect, useState } from "react";
import { apiRequest } from "../api/api";
import ProjectCard from "../components/ProjectCard";

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const loadProjects = async () => {
            try {
                const result = await apiRequest("/projects", {
                    signal: controller.signal
                });

                setProjects(result.data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadProjects();

        return () => {
            controller.abort();
        };
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
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            title={project.title}
                            image={project.image}
                            description={project.description}
                            completionDate={project.completionDate}
                            loadImmediately={index === 0}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default Projects;